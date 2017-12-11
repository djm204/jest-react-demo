
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App.noRedux';
import {AddKittyButton, AddKittyActions} from '../components/Kitty'
import renderer from 'react-test-renderer';


Enzyme.configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  renderer.create(<App />);
});

it('Adds a kitty when button is clicked', () => {
    const addKittyBtn = renderer.create(<AddKittyButton onClickCallback={e => 1} />);
    const addKittyBtnResult = addKittyBtn.toJSON().props.onClick();
    expect(addKittyBtnResult).toEqual(1);

    //Enzyme to test children
    const kittyActionsWrapper = Enzyme.mount(<AddKittyActions AddKitty={e => 1} RemoveKitty={e => -1} />);
    expect(kittyActionsWrapper.find('.AddKitty').props().onClick()).toEqual(1);
    expect(kittyActionsWrapper.find('.RemoveKitty').props().onClick()).toEqual(-1);
  });

