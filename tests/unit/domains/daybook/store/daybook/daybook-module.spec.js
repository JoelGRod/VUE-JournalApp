import { createStore } from 'vuex';
import daybookStore from "@/domains/daybook/store/daybook";
import { daybookState } from '../../../../mock-data/test-daybook-store';

const createVuexStore = ( initialState ) => 
    createStore({
       modules: {
           daybook: {
               ...daybookStore,
               state() {
                   return { ...initialState }
               }
           }
       } 
    })

describe('Vuex - Testing daybook store module', () => {

    // State
    test('should have this initial state', () => {
        
        const store = createVuexStore( daybookState );
        const { isLoading, lastMutation, entries } = store.state.daybook;

        expect( isLoading ).toBeFalsy();
        expect( lastMutation ).toBe('none');
        expect( entries ).toEqual( daybookState.entries ); 
    });

    // Mutations
    test('should ', () => {
        
    });

    
});