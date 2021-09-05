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
        
    });

    test('should show the fa-circle icon', () => {
        
    });

    test('should emit on:click event when click', () => {
        
    });
})