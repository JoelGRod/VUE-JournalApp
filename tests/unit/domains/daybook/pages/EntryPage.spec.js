import { shallowMount, mount } from "@vue/test-utils";
import { createStore } from "vuex";

// Third party library mock
// import Swal from 'sweetalert2';
// module mock
import * as swal from '@/infrastructure/shared/services/alertService'

import EntryPage from "@/domains/daybook/pages/EntryPage";
import FabComponent from "../../../../../src/domains/daybook/components/FabComponent";

import daybookStore from "@/domains/daybook/store/daybook";
import { daybookState } from '../../../mock-data/test-daybook-store';

// module mock
jest.mock('@/infrastructure/shared/services/alertService', () => ({
    showLoader: jest.fn(),
    showSuccess: jest.fn(),
    showError: jest.fn(),
    showDecision: jest.fn(),
}));

// Third party libraries mocks
// jest.mock('sweetalert2', () => ({
//     fire: jest.fn(),
//     showLoading: jest.fn(),
//     close: jest.fn()
// }));


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
    // Mock store dispatch / actions
    store.dispatch = jest.fn();

    const routerMock = {
        push: jest.fn()
    };

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
            },

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

    test('should delete entry and exit', async () => {
        // Arrange
        // module mock
        swal.showDecision.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }) );
        // Third party libraries mocks
        // Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }) );
        await wrapper.find('.btn.btn-danger.mx-2').trigger('click');

        // Act
        // Assert
        expect( swal.showDecision )
            .toHaveBeenCalledWith(
                'Are you Sure?', 
                'Once deleted it cannot be recovered'
            );

        expect( store.dispatch ).toHaveBeenCalled();
        expect( store.dispatch )
            .toHaveBeenCalledWith(
                'daybook/deleteEntry', 
                daybookState.entries[0].id
            );

        expect( routerMock.push ).toHaveBeenCalled();
        expect( routerMock.push )
            .toHaveBeenCalledWith(
                { name: 'Daybook-No-Entry' }
            );
    });

    test('should update wrapper id entry without a new image', async () => {
        // Arrange
        const wrapper = shallowMount(EntryPage, {
            global: {
                mocks: {
                    $router: routerMock
                },
                plugins: [store],
                stubs: {
                    FabComponent
                }
            },
            props: {
                entryId: daybookState.entries[0].id
            }
        });

        const removeTempImgSpy = jest.spyOn( wrapper.vm, 'removeTempImg' );
        // Act
        await wrapper.find('.btn.btn-primary.fab-button').trigger('click');
        // Assert
        expect( swal.showLoader ).toHaveBeenCalled();
        expect( store.dispatch )
            .not.toHaveBeenCalledWith(
                'daybook/uploadImage', null
            );

        expect( store.dispatch )
            .toHaveBeenCalledWith(
                'daybook/updateEntry', 
                daybookState.entries[0]
            );

        expect( removeTempImgSpy ).toHaveBeenCalled();

        expect( swal.showSuccess )
            .toHaveBeenCalledWith(
                'Saved', 
                'The entry has been saved'
            );
    });

    
});