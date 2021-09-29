import { shallowMount } from "@vue/test-utils";

import createVuexStore from "../../../mock-data/mock-store";
import RegisterPage from "@/domains/auth/pages/RegisterPage";

/* ----------- Alert Service Mock ----------- */
// Third party library mock
// import Swal from 'sweetalert2';
// module mock
import * as swal from "@/infrastructure/shared/services/alertService";
// module mock
jest.mock("@/infrastructure/shared/services/alertService", () => ({
  showLoader: jest.fn(),
  showSuccess: jest.fn(),
  showError: jest.fn(),
  showDecision: jest.fn(),
}));
/* ----------- Alert Service Mock ----------- */

/* ----------- Router Mock Composition API ----------- */
import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from "vue-router-mock";

import { config } from "@vue/test-utils";

// create one router per test file
const router = createRouterMock();
// eslint-disable-next-line no-undef
beforeEach(() => {
  injectRouterMock(router);
});

// Add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock);
/* ----------- Router Mock Composition API ----------- */

describe("Testing: RegisterPage.vue", () => {
  const store = createVuexStore({
    status: "not-authenticated",
    user: null,
    idToken: null,
    refreshToken: null,
  });

  store.dispatch = jest.fn();

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RegisterPage, {
      global: {
        plugins: [store],
      },
    });
  });

  test("should match with the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Should show error if email exists", async () => {
    // Arrange
    store.dispatch.mockReturnValueOnce({ ok: false, msg: "EMAIL_EXISTS" });
    // Act
    await wrapper.find("form.p-t-5").trigger("submit");
    // Assert
    expect(store.dispatch).toHaveBeenCalledWith("auth/createUser", {
      name: "",
      email: "",
      password: "",
    });
    expect(swal.showError).toHaveBeenCalledWith(
      "Something has not gone well",
      "EMAIL_EXISTS"
    );
  });

  test("should register user and redirect to daybook module", async () => {
    // Arrange
    store.dispatch.mockReturnValueOnce({ ok: true });
    const [name, email, password] = wrapper.findAll("input");
    // Act
    await name.setValue("test");
    await email.setValue("test@email.com");
    await password.setValue("123456");
    await wrapper.find("form").trigger("submit");
    // Assert
    expect(store.dispatch).toHaveBeenCalledWith("auth/createUser", {
      name: "test",
      email: "test@email.com",
      password: "123456",
    });
    expect(swal.showSuccess).toHaveBeenCalledWith(
      "Congratulations!",
      "The user has been created"
    );
    expect(wrapper.router.push).toHaveBeenCalledWith({
      name: "Daybook-No-Entry",
    });
  });
});
