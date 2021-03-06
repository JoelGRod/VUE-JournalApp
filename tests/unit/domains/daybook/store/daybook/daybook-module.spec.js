import { createStore } from 'vuex';
import daybookStore from "@/domains/daybook/store/daybook";
import { daybookState } from '../../../../mock-data/test-daybook-store';

import authApi from "@/infrastructure/shared/api/authApi";

/* 
* WATCH THIS: daybookState.entries is passed by reference!!
* Because of this deleteEntries depends of addEntry test.
* If you want to fix this, you need to create your own
* daybookState for addEntry like i did in setEntries --> Solved
* fixing the addEntry mutation (see that for more info)
*/

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
    })

describe('Vuex - Testing daybook store module', () => {

    beforeAll(async() => {
        const { data } = await authApi.post(
            ':signInWithPassword',
            { 
                email: 'testing@test.com', 
                password: '123456', 
                returnSecureToken: true 
            }
        );

        localStorage.setItem( 'idToken', data.idToken );
    });

    /* ---------------- State ---------------- */
    test('should have this initial state', () => {
        // Arrange
        const store = createVuexStore(daybookState);
        const { isLoading, lastMutation, entries } = store.state.daybook;
        // Assert
        expect(isLoading).toBeFalsy();
        expect(lastMutation).toBe('none');
        expect(entries).toEqual(daybookState.entries);
    });

    /* ---------------- Mutations ---------------- */
    test('Testing mutations: setEntries ', () => {
        // Arrange
        const daybookMutationState = {
            isLoading: true,
            lastMutation: 'none',
            entries: []
        };
        const store = createVuexStore(daybookMutationState);
        // Act
        store.commit('daybook/setEntries', daybookState.entries);
        const { isLoading, lastMutation, entries } = store.state.daybook;
        // Assert
        expect(isLoading).toBeFalsy();
        expect(lastMutation).toBe('setEntries');
        expect(entries).toEqual(daybookState.entries);
        expect(entries.length).toBe(2);
    });

    test('Testing mutations: updateEntry', () => {
        // Arrange
        const updatedEntry = {
            id: '-MiklDdpx9Q1PSkn008K',
            date: 1630758078386,
            picture: 'https://res.cloudinary.com/do7c3iy3j/image/upload/v1630758299/vue-tests/odv8p7rkeuiqrslqf6ff.jpg',
            text: 'Hello world from tests'
        };
        const store = createVuexStore(daybookState);
        // Act
        store.commit('daybook/updateEntry', updatedEntry);
        const { isLoading, lastMutation, entries } = store.state.daybook;
        const idx = entries.map(entry => entry.id).indexOf(updatedEntry.id);
        // Assert
        expect(isLoading).toBeFalsy();
        expect(lastMutation).toBe('updateEntry');
        expect(entries.length).toBe(2);
        expect(entries[idx]).toEqual(updatedEntry);
    });

    test('Testing mutations: addEntry', () => {
        // Arrange
        const newEntry = {
            id: 'ABC-123',
            date: 1630758078386,
            text: 'Hello world'
        };
        const store = createVuexStore(daybookState);
        // Act
        store.commit('daybook/addEntry', newEntry);
        const { lastMutation, entries } = store.state.daybook;
        // Assert
        expect(lastMutation).toBe('addEntry');
        expect(entries.length).toBe(3);
        expect(
            entries.find(entry => entry.id === 'ABC-123'))
            .toBeTruthy();
    });

    test('Testing mutations: deleteEntry', () => {
        // Arrange
        const store = createVuexStore(daybookState);
        const deleteId = '-MiklDdpx9Q1PSkn008K';
        // Act
        store.commit('daybook/deleteEntry', deleteId);
        const { lastMutation, entries } = store.state.daybook;
        // Assert
        expect(lastMutation).toBe('deleteEntry');
        expect(entries.length).toBe(1);
        expect(
            entries.find(entry => entry.id === deleteId))
            .toBeFalsy();
    });

    /* ---------------- Getters ---------------- */
    test('Testing Getters: getEntriesByTerm', () => {
        // Arrange
        const store = createVuexStore(daybookState);
        // Act
        const term = 'another';
        // const [ entry1, entry2 ] = store.state.daybook.entries;
        const [entry1, entry2] = daybookState.entries;
        // Assert
        expect(store.getters['daybook/getEntriesByTerm']('').length).toBe(2);
        expect(store.getters['daybook/getEntriesByTerm'](term).length).toBe(1);
        expect(store.getters['daybook/getEntriesByTerm'](term)).toEqual([entry2]);
    });

    test('Testing Getters: getEntryById', () => {
        // Arrange
        const store = createVuexStore(daybookState);
        // Act
        const entryId = '-MiklDdpx9Q1PSkn008K';
        // const [ entry1, entry2 ] = store.state.daybook.entries;
        const [entry1, entry2] = daybookState.entries;
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
        const store = createVuexStore(daybookMutationState);
        // Act
        await store.dispatch('daybook/loadEntries');
        // Assert
        expect(store.state.daybook.entries.length).toBeGreaterThanOrEqual(2);
    });

    test('Testing Actions: updateEntry', async () => {
        // Arrange
        const store = createVuexStore(daybookState);
        const updatedEntry = {
            id: '-MiklDdpx9Q1PSkn008K',
            date: 1630758078386,
            picture: 'https://res.cloudinary.com/do7c3iy3j/image/upload/v1631176217/vue-tests/xvjwymky1olyvqplokag.jpg',
            text: 'Hello world\n\nThis is an updated entry from test\n\nCheers Tests!!',
            anotherData: 'test',
            anotherOneData: 'test test'
        };
        // Act
        await store.dispatch('daybook/updateEntry', updatedEntry);
        // Assert
        expect(store.state.daybook.entries.length).toBe(2);
        expect(
            store.state.daybook.entries
                .find(entry => entry.id === updatedEntry.id)
        ).toEqual({
            id: '-MiklDdpx9Q1PSkn008K',
            date: 1630758078386,
            picture: 'https://res.cloudinary.com/do7c3iy3j/image/upload/v1631176217/vue-tests/xvjwymky1olyvqplokag.jpg',
            text: 'Hello world\n\nThis is an updated entry from test\n\nCheers Tests!!'
        });
    });

    test('Testing Actions: createEntry & deleteEntry', async () => {
        // Arrange
        const store = createVuexStore(daybookState);
        const newEntry = {
            date: 1630758078386,
            text: 'New entry from test'
        };
        // Act
        const entryId = await store.dispatch('daybook/createEntry', newEntry);
        // Assert
        expect(typeof entryId).toBe('string');
        expect(
            store.state.daybook.entries
                .find(entry => entry.id === entryId)
        ).toBeTruthy();
        
        // Act
        await store.dispatch('daybook/deleteEntry', entryId);
        // Assert
        expect(
            store.state.daybook.entries
                .find(entry => entry.id === entryId)
        ).toBeFalsy();
    });
});