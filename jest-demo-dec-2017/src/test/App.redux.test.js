import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import App from '../App';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { AddKittyButton } from '../components/Kitty';
import { addKitty, removeKitty } from '../action-creators/kittyActions';
import kittyReducer from '../reducers/kittyReducer';


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

it('Add Kitty Button Renders with proper properties.', () => {
    const kittenButton = renderer.create(<AddKittyButton onClickCallback={e => 1} />);
    let tree = kittenButton.toJSON();

    expect(tree).toMatchSnapshot();
});

it('Add Kitty and Remove Kitty Action creators', () => {
    expect(addKitty()).toEqual({type: 'ADD_A_KITTY'});
    expect(removeKitty()).toEqual({type: 'REMOVE_A_KITTY'});
});

it('kitty reducer test', () => {
    let initialState = {kitties: 0};
    expect(kittyReducer(initialState, {type:'ADD_A_KITTY'}).kitties).toEqual(1);
    expect(kittyReducer(initialState, {type:'REMOVE_A_KITTY'}).kitties).toEqual(0);
    initialState.kitties = 2;
    expect(kittyReducer(initialState, {type:'REMOVE_A_KITTY'}).kitties).toEqual(1);
})


