import { shallowMount } from "@vue/test-utils";

import DayBookLayout from "@/domains/daybook/layouts/DayBookLayout";
import createVuexStore from "../../../mock-data/mock-store";

describe("Testing: DayBookLayout.vue", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const store = createVuexStore({
    user: {
      name: "Testing Store",
      email: "testing@store.com",
    },
    status: "authenticated",
    idToken: "abc",
    refreshToken: "xyz",
  });

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(DayBookLayout, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  test("should match with the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  // test("onLogout should close session and redirect", async () => {
  //   // Act
  //   const spyLogout = await jest.spyOn(wrapper.vm, "logout");
  //   await wrapper.vm.onLogout();
  //   // Assert
  //   // expect(store.state.auth).toEqual({
  //   //   user: null,
  //   //   status: "not-authenticated",
  //   //   idToken: null,
  //   //   refreshToken: null,
  //   // });
  //   expect(spyLogout).toHaveBeenCalled();
  //   expect(mockRouter.push).toHaveBeenCalledWith({ name: "Login" });
  // });
});
