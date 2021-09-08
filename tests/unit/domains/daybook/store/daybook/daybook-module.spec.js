import { createStore } from 'vuex';
import daybookStore from "@/domains/daybook/store/daybook";
import { daybookState } from '../../../../mock-data/test-daybook-store';

/* 
* WATCH THIS: daybookState.entries is passed by reference!!
* Because of this deleteEntries depends of addEntry test.
* If you want to fix this, you need to create your own
* daybookState for addEntry like i did in setEntries --> Solved
* fixing the addEntry mutation (see that for more info)
*/

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

    // /* ---------------- State ---------------- */
    test('should have this initial state', () => {
        // Arrange
        const store = createVuexStore( daybookState );
        const { isLoading, lastMutation, entries } = store.state.daybook;
        // Assert
        expect( isLoading ).toBeFalsy();
        expect( lastMutation ).toBe('none');
        expect( entries ).toEqual( daybookState.entries ); 
    });

    // /* ---------------- Mutations ---------------- */
    test('Testing mutations: setEntries ', () => {
        // Arrange
        const daybookMutationState = { 
            isLoading: true, 
            lastMutation: 'none', 
            entries: [] 
        };
        const store = createVuexStore( daybookMutationState );
        // Act
        store.commit('daybook/setEntries', daybookState.entries);
        const { isLoading, lastMutation, entries } = store.state.daybook;
        // Assert
        expect( isLoading ).toBeFalsy();
        expect( lastMutation ).toBe('setEntries');
        expect( entries ).toEqual( daybookState.entries );
        expect( entries.length ).toBe(2);
    });

    test('Testing mutations: updateEntry', () => {
        // Arrange
        const updatedEntry = {
            id: '-MiklDdpx9Q1PSkn008K',
            date: 1630758078386,
            picture: 'https://res.cloudinary.com/do7c3iy3j/image/upload/v1630758299/vue-tests/odv8p7rkeuiqrslqf6ff.jpg',
            text: 'Hello world from tests'
        };
        const store = createVuexStore( daybookState );
        // Act
        store.commit('daybook/updateEntry', updatedEntry);
        const { isLoading, lastMutation, entries } = store.state.daybook;
        const idx = entries.map( entry => entry.id ).indexOf(updatedEntry.id);
        // Assert
        expect( isLoading ).toBeFalsy();
        expect( lastMutation ).toBe('updateEntry');
        expect( entries.length ).toBe(2);
        expect( entries[idx] ).toEqual( updatedEntry );
    });

    test('Testing mutations: addEntry', () => {
        // Arrange
        const newEntry = {
            id: 'ABC-123',
            date: 1630758078386,
            text: 'Hello world' 
        };
        const store = createVuexStore( daybookState );
        // Act
        store.commit('daybook/addEntry', newEntry);
        const { lastMutation, entries } = store.state.daybook;
        // Assert
        expect( lastMutation ).toBe('addEntry');
        expect( entries.length ).toBe(3);
        expect( 
            entries.find( entry => entry.id === 'ABC-123' ) )
            .toBeTruthy();
    });

    test('Testing mutations: deleteEntry', () => {
        // Arrange
        const store = createVuexStore( daybookState );
        const deleteId = '-MiklDdpx9Q1PSkn008K';
        // Act
        store.commit('daybook/deleteEntry', deleteId);
        const { lastMutation, entries } = store.state.daybook;
        // Assert
        expect( lastMutation ).toBe('deleteEntry');
        expect( entries.length ).toBe(1);
        expect( 
            entries.find( entry => entry.id === deleteId) )
            .toBeFalsy();
    });

    /* ---------------- Getters ---------------- */
    test('Testing Getters: getEntriesByTerm', () => {
        // Arrange
        const store = createVuexStore( daybookState );
        // Act
        const term = 'another';
        // const [ entry1, entry2 ] = store.state.daybook.entries;
        const [ entry1, entry2 ] = daybookState.entries;
        // Assert
        expect(store.getters['daybook/getEntriesByTerm']('').length).toBe(2);
        expect(store.getters['daybook/getEntriesByTerm'](term).length).toBe(1);
        expect(store.getters['daybook/getEntriesByTerm'](term)).toEqual([ entry2 ]);
    });

    test('Testing Getters: getEntryById', () => {
        // Arrange
        const store = createVuexStore( daybookState );
        // Act
        const entryId = '-MiklDdpx9Q1PSkn008K';
        // const [ entry1, entry2 ] = store.state.daybook.entries;
        const [ entry1, entry2 ] = daybookState.entries;
        // Assert
        expect(store.getters['daybook/getEntryById'](entryId)).toEqual(entry1);
    });

    /* ---------------- Actions ---------------- */
    test('Testing Actions: loadEntries', async () => {
        // Arrange
        const daybookMutationState = { 
            isLoading: true, 
            lastMutation: 'none', 
            entries: [] 
        };
        const store = createVuexStore( daybookMutationState );
        // Act
        await store.dispatch('daybook/loadEntries');
        // Assert
        expect( store.state.daybook.entries.length ).toBeGreaterThanOrEqual(2);
    });

    test('Testing Actions: updateEntry', () => {
        
    });

    test('Testing Actions: createEntry', () => {
        
    });

    test('Testing Actions: deleteEntry', () => {
        
    });

});