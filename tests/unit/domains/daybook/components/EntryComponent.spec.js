import { shallowMount } from "@vue/test-utils";
import EntryComponent from "../../../../../src/domains/daybook/components/EntryComponent";

describe('Testing EntryComponent.vue', () => {

    const mockRouter = {
        push: jest.fn()
    };

    let wrapper;

    beforeEach(() => {
        wrapper.shallowMount(EntryComponent, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            },
            props: {
                entry: {
                    id: '-MiklDdpx9Q1PSkn008K',
                    date: 1630758078386,
                    picture: 'https://res.cloudinary.com/do7c3iy3j/image/upload/v1630758299/vue-tests/odv8p7rkeuiqrslqf6ff.jpg',
                    text: 'Hello world\n\nThis is a test entry\n\nCheers'
                }
            }
        });
    });

    test('should match with the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

});