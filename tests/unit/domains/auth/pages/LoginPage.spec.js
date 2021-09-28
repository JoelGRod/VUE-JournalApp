import { shallowMount } from "@vue/test-utils";

import LoginPage from "@/domains/auth/pages/LoginPage";
import createVuexStore from "../../../mock-data/mock-store";

// Third party library mock
// import Swal from 'sweetalert2';
// module mock
import * as swal from "@/infrastructure/shared/services/alertService";
// // module mock
jest.mock("@/infrastructure/shared/services/alertService", () => ({
  showLoader: jest.fn(),
  showSuccess: jest.fn(),
  showError: jest.fn(),
  showDecision: jest.fn(),
}));

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

describe("Testing: LoginPage.vue", () => {
  const store = createVuexStore({
    status: "not-authenticated",
    user: null,
    idToken: null,
    refreshToken: null,
  });

  store.dispatch = jest.fn();

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(LoginPage, {
      global: {
        plugins: [store],
      },
    });
  });

  test("should match with the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should show error with incorrect credentials", async () => {
    // Arrange
    store.dispatch.mockReturnValueOnce({ ok: false, msg: "Error" });
    // Act
    await wrapper.find("form").trigger("submit");
    // Assert
    expect(store.dispatch).toHaveBeenCalledWith("auth/loginUser", {
      email: "",
      password: "",
    });
    expect(swal.showError).toHaveBeenCalledWith(
      "Something has not gone well",
      "Error"
    );
  });

  test("should redirect with correct credentials", async () => {
    // Arrange
    store.dispatch.mockReturnValueOnce({ ok: true });
    // Act
    const [email, password] = wrapper.findAll("input");
    await email.setValue("test@test.com");
    await password.setValue("123456");
    await wrapper.find("form").trigger("submit");
    // Assert
    expect(store.dispatch).toHaveBeenCalledWith("auth/loginUser", {
      email: "test@test.com",
      password: "123456",
    });
    expect(wrapper.router.push).toHaveBeenCalledWith({
      name: "Daybook-No-Entry",
    });

    // console.log( wrapper.vm.loginForm );
  });

});
