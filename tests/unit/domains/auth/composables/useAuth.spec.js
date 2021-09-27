import useAuth from "@/domains/auth/composables/useAuth";

const mockStore = {
    dispatch: jest.fn(),
    // commit
    // getters
}

jest.mock('vuex', () => ({
    useStore: () => mockStore
}))

describe('Testing useAuth Composable', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('createUser successful', async() => {
        // Arrange
        const { createUser } = useAuth();

        const newUser = {
            name: 'test',
            email: 'test@test.com',
            password: '123456'
        };

        mockStore.dispatch.mockReturnValue( { ok: true } );

        // Act
        const resp = await createUser( newUser );

        // Assert
        expect(mockStore.dispatch)
            .toHaveBeenCalledWith('auth/createUser', newUser);
        expect( resp ).toMatchObject( { ok: true } )
    });

    test('createUser unsuccessful - email exists', async() => {
        // Arrange
        const { createUser } = useAuth();

        const newUser = {
            name: 'test',
            email: 'test@test.com',
            password: '123456'
        };

        mockStore.dispatch.mockReturnValue(
            { ok: false, msg: 'EMAIL_EXISTS' }
        );

        // Act
        const resp = await createUser( newUser );

        // Assert
        expect( mockStore.dispatch )
            .toHaveBeenCalledWith('auth/createUser', newUser);
        expect( resp ).toEqual( { ok: false, msg: 'EMAIL_EXISTS' } );
    });

    test('loginUser successful', async() => {
        // Arrange
        const { loginUser } = useAuth();

        const user = {
            email: 'test@test.com',
            password: '123456'
        };

        mockStore.dispatch.mockReturnValue( { ok: true } );

        // Act
        const resp = await loginUser( user );

        // Assert
        expect( mockStore.dispatch )
            .toHaveBeenCalledWith('auth/loginUser', user);
        expect( resp ).toEqual( { ok: true } );
    });

    test('loginUser unsuccessful', async() => {
        // Arrange
        const { loginUser } = useAuth();

        const user = {
            email: 'test@bad.com',
            password: '123456'
        };

        mockStore.dispatch.mockReturnValue( 
            { ok: false, msg: 'INVALID_USER' } 
        );

        // Act
        const resp = await loginUser( user );

        // Assert
        expect( mockStore.dispatch )
            .toHaveBeenCalledWith('auth/loginUser', user);
        expect( resp ).toEqual( 
            { ok: false, msg: 'INVALID_USER' } 
        );
    });

    test('checkAuthStatus successful', async() => {
        // Arrange
        const { checkAuthStatus } = useAuth();
        mockStore.dispatch.mockReturnValue( { ok: true } );
        // Act
        const resp = await checkAuthStatus();
        // Assert
        expect( mockStore.dispatch )
            .toHaveBeenCalledWith('auth/checkAuth');
        expect(resp).toEqual( { ok: true } );
    });

    test('checkAuthStatus unsuccessful', async() => {
        // Arrange
        const { checkAuthStatus } = useAuth();
        mockStore.dispatch.mockReturnValue( 
            { ok: false, msg: 'WRONG_ID_TOKEN' } 
        );
        // Act
        const resp = await checkAuthStatus();
        // Assert
        expect( mockStore.dispatch )
            .toHaveBeenCalledWith('auth/checkAuth');
        expect(resp).toEqual( 
            { ok: false, msg: 'WRONG_ID_TOKEN' } 
        );
    });

});