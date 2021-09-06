import { shallowMount } from "@vue/test-utils";
import FabComponent from "@/domains/daybook/components/FabComponent";

describe('Testing FabComponent.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount( FabComponent );
    });

    test('should match with the snapshot', () => {
        expect( wrapper.html() ).toMatchSnapshot();
    });

    test('should show the default icon (fa-plus)', () => {
        // Arrange
        const icon = wrapper.find('i');
        // Act
        // Assert
        expect( icon.classes('fa-plus') ).toBeTruthy();    
    });

    test('should show the fa-circle icon', () => {
        // Arrange
        const wrapper = shallowMount( FabComponent, {
            props: {
                icon: 'fa-circle'
            }
        });
        const icon = wrapper.find('i');
        // Act
        // Assert
        expect( icon.classes('fa-circle') ).toBeTruthy();
    });

    test('should emit on:click event when click', async () => {
        // Arrange
        const button = wrapper.find('button');
        // Act
        button.trigger('click');
        // console.log(wrapper.emitted());
        // Assert
        expect( wrapper.emitted('on:click') ).toBeTruthy();
        expect( wrapper.emitted('on:click') ).toHaveLength(1);  
    });
})