
import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import App from '../App.noRedux';
import { AddKittyButton, AddKittyActions } from '../components/Kitty'


Enzyme.configure({ adapter: new Adapter() });

describe('react component without redux', () => {
  test('renders without crashing - ReactDOM.render', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <App />,
      div
    );
    // console.log(connectedComponent.toJSON().toMatchSnapshot())
  });

  test('renders without crashing react-test-renderer and matches snapshot.', () => {
    const div = document.createElement('div');
    const connectedComponent = renderer.create(
      <App />,
      div
    );
    let tree = connectedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Call back functions are firing properly.', () => {
    const addKittyBtn = renderer.create(<AddKittyButton onClickCallback={e => 1} />);
    const addKittyBtnResult = addKittyBtn.toJSON().props.onClick();
    expect(addKittyBtnResult).toEqual(1);

    //Enzyme to test callback functions
    const kittyActionsWrapper = Enzyme.mount(<AddKittyActions AddKitty={e => 1} RemoveKitty={e => -1} />);
    expect(kittyActionsWrapper.find('.AddKitty').props().onClick()).toEqual(1);
    expect(kittyActionsWrapper.find('.RemoveKitty').props().onClick()).toEqual(-1);
  });
})




