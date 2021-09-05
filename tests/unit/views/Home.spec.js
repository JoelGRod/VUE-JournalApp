import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home";

describe('Testing Home.vue', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount( Home );
    });

    test('should match with the snapshot', () => {
        //Arrange
        // Act
        // Assert
        expect( wrapper.html() ).toMatchSnapshot();
    });

    test('Do click on Go-To-Daybook button must redirect to no-entry path', () => {
        // arrange
        const mockRouter = {
            push: jest.fn()
        };
        const wrapper = shallowMount( Home, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        });
        // Act
        wrapper.find('[test-id="daybook-home-button"]')
            .trigger('click');
        // Assert
        expect( mockRouter.push ).toHaveBeenCalled();
        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'Daybook-No-Entry' });
    });

})