import { shallowMount } from "@vue/test-utils";
import About from "@/views/About";

describe('Testing About.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount( About );
    });

    test('should match with snapshot', () => {
        // Arrange
        // Act
        // Assert
        expect( wrapper.html() ).toMatchSnapshot();
    });
})