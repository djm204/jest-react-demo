import { combineReducers } from 'redux';

const initialState = {
    kitties: 0,
    kittiesWithNames: []
}

function kitties(state = initialState.kitties, action) {
    switch (action.type) {
        case "ADD_A_KITTY":
            state++;
            return state;
        case "REMOVE_A_KITTY":
            return state > 0 ? state -1 : state;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    kitties
});

export default rootReducer;