import cloudinary from "cloudinary";
import uploadImage from "@/infrastructure/shared/services/uploadImage";
import axios from "axios";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

describe('Testing uploadImage', () => {
    
    test('should load a file and returns url', async ( done ) => {
        // Arrange
        const { data } = await axios.get('https://res.cloudinary.com/do7c3iy3j/image/upload/v1630675094/samples/cloudinary-group.jpg', {
            responseType: 'arraybuffer'
        });
        const file = new File( [ data ], 'photo.jpg' );
        // Act
        const url = await uploadImage( file );
        // Assert
        expect( typeof url ).toBe('string');

        // Delete upload image from cloudinary
        // Get Id
        const segments = url.split('/');
        const imgId = segments[ segments.length - 1 ].replace('.jpg', '');
        // cloudinary.v2.api.delete_resources( [ `vue-tests/${imgId}` ], {}, () => {
        //     done(); // Demonstrative purposes, you can use this and not the async/await
        // });
        cloudinary.v2.uploader.destroy( `vue-tests/${imgId}`, {}, () => {
            done();
        });
    });
});