import { shallowMount } from "@vue/test-utils";

import NavbarComponent from "@/domains/daybook/components/NavbarComponent";
import createVuexStore from "../../../mock-data/mock-store";

describe("Testing: NavbarComponent.vue", () => {
  // Not necessary but put it here for demonstrative purposes
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
    wrapper = shallowMount(NavbarComponent, {
      global: {
        plugins: [store],
      },
      props: {
        userName: "testing",
      },
    });
  });

  test("should match with the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should show testing in username prop', () => {
      // Arrange
      const nameElement = wrapper.find('.d-flex .navbar-brand.text-white').text();
      const nameProp = wrapper.props('userName');
      // Assert
      expect( nameElement ).toBe( nameProp );
  });

  test('logout button should emit on:logout custom event', async () => {
      // Arrange
      const button = wrapper.find('button.btn.btn-outline-info');
      // Act
      await button.trigger('click');
      // Assert
      expect( wrapper.emitted('on:logout') ).toBeTruthy();
  });
});
