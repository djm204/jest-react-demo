import 'whatwg-fetch'

export function addKitty(name) {
    return {
        type: "ADD_A_KITTY",
        name,
    }
}

export function removeKitty() {
    return {
        type: "REMOVE_A_KITTY"
    }
}

function fetchIPRequest() {
  return {
    type: "FETCH_IP_REQUEST"
  }
}

function fetchIPSuccess(body) {
  return {
    type: "FETCH_IP_SUCCESS",
    body
  }
}

function fetchIPFailure(ex) {
  return {
    type: "FETCH_IP_FAILURE",
    ex
  }
}

export function fetchIP() {
  return dispatch => {
    dispatch(fetchIPRequest())
    return fetch('http://ip.jsontest.com/')
      .then(res => res.json())
      .then(body => dispatch(fetchIPSuccess(body)))
      .catch(ex => dispatch(fetchIPFailure(ex)))
  }
}

