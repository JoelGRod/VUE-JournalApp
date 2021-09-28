import { shallowMount } from "@vue/test-utils";
import EntryComponent from "../../../../../src/domains/daybook/components/EntryComponent";
import { daybookState } from "../../../mock-data/test-daybook-store";

describe("Testing: EntryComponent.vue", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(EntryComponent, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
      props: {
        entry: { ...daybookState.entries[0] },
      },
    });
  });

  test("should match with the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should redirect when click entry-container", () => {
    // Arrange
    const container = wrapper.find(".entry-container");
    // Act
    container.trigger("click");
    // Assert
    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "Daybook-Entry",
      params: { id: daybookState.entries[0].id },
    });
  });

  test("Testing computed properties", () => {
    // Arrange
    // Act
    // Assert
    expect(wrapper.vm.getEntryText).toBe(
      "Hello world\n\nThis is a test entry\n\nCheers"
    );
    expect(wrapper.vm.getDay).toBe(4);
    expect(wrapper.vm.getMonth).toBe("Septiembre");
    expect(wrapper.vm.getYearDay).toBe("2021, Sábado");
  });
});
