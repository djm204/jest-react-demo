import {combineReducers} from 'redux';

const initialState = {
    kitties: 0
}

function kitties(state = initialState.kitties, action) {
    switch (action.type) {
        case "ADD_A_KITTY":
            const newInfo = state++;
            return Object.assign(state, state, {kitties: newInfo});
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    kitties
});

export default rootReducer;