import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'
import Enzyme from 'enzyme';
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import App from '../App';
import AppInternalMapStateToProps from '../App.part2';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { AddKittyButton } from '../components/Kitty';
import { addKitty, removeKitty, fetchIP } from '../action-creators/kittyActions';
import kittyReducer from '../reducers/kittyReducer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const store = configureStore();

describe('component renders properly.', () => {
    test('renders without crashing - ReactDOM.render', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            div
        );
        // console.log(connectedComponent.toJSON().toMatchSnapshot())
    });

    test('renders without crashing react-test-renderer and matches snapshot.', () => {
        const div = document.createElement('div');
        const connectedComponent = renderer.create(
            <Provider store={store}>
                <App />
            </Provider>,
            div
        );
        let tree = connectedComponent.toJSON();
        expect(tree).toMatchSnapshot();
    });

    //Component rendering
    test('Add Kitty Button Renders with proper properties.', () => {
        const kittenButton = renderer.create(<AddKittyButton onClickCallback={e => 1} />);
        let tree = kittenButton.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

//AddKitty Action Creators
describe('Action Creators', () => {
    test('Add Kitty Action', () => {
        expect(addKitty()).toEqual({ type: 'ADD_A_KITTY' });
    });

    test('Remove Kitty', () => {
        expect(removeKitty()).toEqual({ type: 'REMOVE_A_KITTY' });
    })
});

//Kitty Reducers
describe('kitty reducers', () => {
    let initialState = { kitties: 0 };

    test('Add a kitty', () => {
        expect(kittyReducer(initialState, { type: 'ADD_A_KITTY' }).kitties).toEqual(1);
    });
    test('Do not go below 0 when removing a kitty', () => {
        expect(kittyReducer(initialState, { type: 'REMOVE_A_KITTY' }).kitties).toEqual(0);
    });
    test('Remove a kitty', () => {
        initialState.kitties = 2;
        expect(kittyReducer(initialState, { type: 'REMOVE_A_KITTY' }).kitties).toEqual(1);
    });
});

///get our I.P address
describe('async action creators', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    });

    test('Creates FETCH_IP_SUCCESS after fetching IP - Thunk style', () => {
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
    test('Test mapStateToProps returns what we want', () => {
        const div = document.createElement('div');
        const expectedProps = {
            kittiesWithNames: [
                {name:'Pablo'}, 
                {name:'MoMo'}, 
                {name:'Mathew'}, 
                {name:'Peaches'}, 
                {name: ''}
            ],
            kitties: 5
        }
        let renderedComponent = renderer.create(
            <Provider store={store}>
                <AppInternalMapStateToProps />
            </Provider>,
            div
        );

        const renderedProps = AppInternalMapStateToProps.mapStateToProps({
            kittiesWithNames: 
            [
                {name:'Pablo'}, 
                {name:'MoMo'}, 
                {name:'Mathew'}, 
                {name:'Peaches'}, 
                {name: ''}
            ], 
                kitties: 5
            });
        expect(renderedProps).toEqual(expectedProps);
        expect(renderedComponent.getInstance().props.store.getState()).toEqual({kitties: 0});
    });
});


