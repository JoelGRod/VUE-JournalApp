import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";

import EntryListComponent from "@/domains/daybook/components/EntryListComponent";
import daybookStore from "@/domains/daybook/store/daybook";

import { daybookState } from "../../../mock-data/test-daybook-store";
// import getters from "@/domains/daybook/store/daybook/getters";

describe('Testing: EntryListComponent.vue', () => {

    /*
    * 1º Alternative way to create a store for testing-> this gives more 
    * control BUT it's better to maintain simple like 
    * in daybook-module.spec.js.
    * Basically you are creating a mock of the daybookStore 
    * and creating a store with that mock and not with 
    * the daybookStore module directly
    */
    /*
    const daybookStoreMock = {
        namespaced: true,
        state() {
            return {
                ...daybookState
            }
        },
        getters
    };
    const store = createStore({
        modules: {
            daybook: { ...daybookStoreMock }
        }
    });
    */

    // 2º Better Approach, simple is better
    const createVuexStore = (initialState) =>
    createStore({
        modules: {
            daybook: {
                ...daybookStore,
                state() {
                    return { ...initialState }
                }
            }
        }
    });
    const store = createVuexStore( daybookState );

    const routerMock = {
        push: jest.fn()
    };

    let wrapper;
    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = shallowMount(EntryListComponent, {
            global: {
                mocks: {
                    $router: routerMock
                },
                plugins: [store]
            }
        });
    });

    test('should match the snapshot', () => {
        // Assert
        expect( wrapper.html() ).toMatchSnapshot();
    });

    test('should call getEntriesByTerm without term and show 2 entries', () => {
        // Arrange
        // console.log( wrapper.html() );
        // Act
        const renderedEntries = wrapper.findAll('entry-component-stub');
        // Assert
        expect( renderedEntries.length ).toBe(2);
    });

    test('should call getEntriesByTerm and filter entries', async () => {
        // Arrange
        const searchInput = wrapper.find('.form-control');
        // Act
        await searchInput.setValue('this is');
        const renderedEntries = wrapper.findAll('entry-component-stub');
        // Assert
        expect( renderedEntries.length ).toBe(1);
    });

    test('should redirect to /new when new entry button is clicked', async () => {
        // Arrange
        const searchButton = wrapper.find('.btn.btn-primary.mx-3');
        // Act
        await searchButton.trigger('click');
        // Assert
        expect( routerMock.push ).toHaveBeenCalled();
        expect( routerMock.push )
            .toHaveBeenCalledWith(
                { name: 'Daybook-Entry', params: { id: 'new' } }
            );
    });
});