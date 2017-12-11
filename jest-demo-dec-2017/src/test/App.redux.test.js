import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import App from '../App';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { Kitty, AddKittyButton } from '../components/Kitty';
import { addKitty } from '../action-creators/kittyActions';

const store = configureStore();

// it.skip()('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     div
//   );
// });

// test('Add Kitty Button Renders with proper properties.', () => {
//   const kittenButton = renderer.create(<AddKittyButton onClickCallback={()=>{return 'fakeFunction'}}/>);
//   let tree = kittenButton.toJSON();

//   expect(tree).toMatchSnapshot();

//   //Manually trigger the callback function
//   console.log(tree.props)
// });
