import daybookRouter from "@/domains/daybook/router";

describe('Testing Daybook Router', () => {
    
    test('should have this config', async () => {
        // Arrange
        // Act
        // Assert
        expect( daybookRouter ).toMatchObject([
            {
                path: '',
                redirect: { name: 'Daybook-No-Entry' }
            },
            {
                path: 'entry/:id',
                name: 'Daybook-Entry',
                component: expect.any( Function ),
                props: expect.any( Function )
            },
            {
                path: 'no-entry',
                name: 'Daybook-No-Entry',
                component: expect.any( Function )
            }
        ]);
    });

    test('Every route should return expected pages', async () => {
        // Assert
        // Very rigid
        // expect( (await daybookRouter[1].component()).default.name )
        //     .toBe('entry-page');
        // expect( (await daybookRouter[2].component()).default.name )
        //     .toBe('no-entry-selected-page');

        // Better approach
        // Arrange
        const promiseRoutes = [];
        daybookRouter.forEach( child => {
            if( child.component ) promiseRoutes.push( child.component() );
        });
        const compNames = (await Promise.all(promiseRoutes)).map( resp => resp.default.name );
        // Assert
        expect( compNames ).toContain( 'entry-page' );
        expect( compNames ).toContain( 'no-entry-selected-page' );
    });

    test('Routes with added props should return what is expected', () => {
        // Arrange
        const route = {
            params: {
                id: 'ABC-123'
            }
        };

        // Act
        // Assert
        // Very rigid
        // expect( daybookRouter[1].props( route ) )
        //     .toEqual({ entryId: 'ABC-123' });

        // Better approach
        // Arrange
        const entryRoute = daybookRouter.find( route => route.name === 'Daybook-Entry' );
        expect( entryRoute.props( route ) ).toEqual( { entryId: 'ABC-123' } );
    });
});