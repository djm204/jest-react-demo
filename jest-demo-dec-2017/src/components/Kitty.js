import React from 'react';

export const Kitty = (props) => {
    const {kittyImg} = props;
    return (
        <div className="kitty">
            <img src={kittyImg} alt="Das Kitty"/>
        </div>
    );
}

export const AddKittyButton = (props) => {
    return (
        <button className={props.class} onClick={props.onClickCallback}>
            {props.children}
        </button>
    );
}

export const AddKittyActions = (props) => (
    <div>
        <AddKittyButton class="AddKitty" onClickCallback={props.AddKitty}> Add Kitty </AddKittyButton>
        <AddKittyButton class="RemoveKitty" onClickCallback={props.RemoveKitty}> Remove Kitty </AddKittyButton>
    </div>
)