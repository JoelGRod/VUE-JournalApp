import cloudinary from "cloudinary";
import * as cloudinaryConfig from '../../../cloudinaryConfig';
import uploadImage from "@/infrastructure/shared/services/uploadImage";
import axios from "axios";

cloudinary.config({
    cloud_name: cloudinaryConfig.cloud_name,
    api_key: cloudinaryConfig.api_key,
    api_secret: cloudinaryConfig.api_secret
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
        cloudinary.v2.api.delete_resources( imgId, {}, () => {
            done(); // Demonstrative purposes, you can use this and not the async/await
        });
    });
});