import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import App from '../App';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { AddKittyButton } from '../components/Kitty';
import { addKitty, removeKitty, fetchIP } from '../action-creators/kittyActions';
import kittyReducer from '../reducers/kittyReducer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const store = configureStore();

it('renders without crashing - ReactDOM.render', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        div
    );
});

it('renders without crashing react-test-renderer', () => {
    const div = document.createElement('div');
    renderer.create(
        <Provider store={store}>
            <App />
        </Provider>,
        div
    );
});

//Component rendering
it('Add Kitty Button Renders with proper properties.', () => {
    const kittenButton = renderer.create(<AddKittyButton onClickCallback={e => 1} />);
    let tree = kittenButton.toJSON();

    expect(tree).toMatchSnapshot();
});

//AddKitty Action Creators
it('Add Kitty and Remove Kitty Action creators', () => {
    expect(addKitty()).toEqual({ type: 'ADD_A_KITTY' });
    expect(removeKitty()).toEqual({ type: 'REMOVE_A_KITTY' });
});

//Kitty Reducers
describe('kitty reducers', () => {
    let initialState = { kitties: 0 };
    
    it('Add a kitty', () => {
        expect(kittyReducer(initialState, { type: 'ADD_A_KITTY' }).kitties).toEqual(1);
    });
    it('Do not go below 0 when removing a kitty', () => {
        expect(kittyReducer(initialState, { type: 'REMOVE_A_KITTY' }).kitties).toEqual(0);
    });
    it('Remove a kitty', () => {
        initialState.kitties = 2;
        expect(kittyReducer(initialState, { type: 'REMOVE_A_KITTY' }).kitties).toEqual(1);
    });
})


///get our I.P address
describe('async action creators', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    });

    it('Creates FETCH_IP_SUCCESS after fetching IP - Thunk style', () => {
        fetchMock.getOnce('http://ip.jsontest.com/', { body: { ip: '127.0.99.99' } });

        const expectedActions = [
            { type: "FETCH_IP_REQUEST" },
            { type: "FETCH_IP_SUCCESS", body: { ip: '127.0.99.99' } }
        ];

        const store = mockStore({ ip: '' });

        return store.dispatch(fetchIP()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
          })
    });
});

describe('connected component', () => {

});


