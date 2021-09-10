import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";

import EntryPage from "@/domains/daybook/pages/EntryPage";

import daybookStore from "@/domains/daybook/store/daybook";
import { daybookState } from '../../../mock-data/test-daybook-store';

describe('Testing: EntryPage.vue', () => {

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
    const store = createVuexStore(daybookState);

    const routerMock = {
        push: jest.fn()
    }

    let wrapper;
    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = shallowMount(EntryPage, {
            global: {
                mocks: {
                    $router: routerMock
                },
                plugins: [store]
            },
            props: {
                entryId: daybookState.entries[0].id
            }
        });
    })

    test('should match with the snapshot', () => {
        // Assert
        expect( wrapper.html() ).toMatchSnapshot();
    });

    test('should redirect user if id is not found in state', () => {
        // Arrange
        const wrapper = shallowMount(EntryPage, {
            global: {
                mocks: {
                    $router: routerMock
                },
                plugins: [store]
            },
            props: {
                entryId: 'Not a valid id'
            }
        });
        // Act
        // Assert
        expect(routerMock.push).toHaveBeenCalled();
        expect(routerMock.push)
            .toHaveBeenCalledWith(
                { name: "Daybook-No-Entry" }
            );
    });

    test('should show the entry defined in props correctly', () => {
        // Assert
        expect( routerMock.push ).not.toHaveBeenCalled();
    });
});