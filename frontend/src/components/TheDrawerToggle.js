import React from 'react';
import styled from 'styled-components';

import HighlightEntityContext from '../context/highlight-entity-context';

const ToOpenWrapper = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    padding: 10px 0;
    box-sizing: border-box;
    cursor: pointer;
    padding: 10px;
    border-radius: 100%;
    background-color: ${p => p.isHighlighted ? '#fff' : 'transparent'};
    z-index: ${p => p.isHighlighted ? 999999999999 : 'unset'};

    div {
        width: 90%;
        height: 3px;
        background-color: #000;
    }

    div:nth-child(3) {
        width: 50%;
    }
`;

const ToCloseWrapper = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    padding: 10px 0;
    box-sizing: border-box;
    cursor: pointer;
    padding: 10px;
    border-radius: 100%;
    background-color: ${p => p.isHighlighted ? '#fff' : 'transparent'};
    z-index: ${p => p.isHighlighted ? 999999999999 : 'unset'};

    div {
        width: 90%;
        height: 3px;
        background-color: #000;
    }

    div:nth-child(1) {
        transform: translateY(10px) rotate(45deg);
    }

    div:nth-child(2) {
        transform: translateY(-5px) rotate(-45deg);
    }
`;


const ToOpenIcon = (props) => {
    return (
        <ToOpenWrapper onClick={props.toggleSideDrawer} isHighlighted={props.isHighlighted}>
            <div></div>
            <div></div>
            <div></div>
        </ToOpenWrapper>
    );
}

const ToCloseIcon = (props) => {
    return (
        <ToCloseWrapper onClick={props.toggleSideDrawer} isHighlighted={props.isHighlighted}>
            <div></div>
            <div></div>
        </ToCloseWrapper>
    );
}


const TheDrawerToggle = (props) => {
    const highlightEntity = React.useContext(HighlightEntityContext);

    const isHighlighted = highlightEntity.highlightEl === 'DrawerToggler';

    if (!props.isSideDrawOpen) {
        return (
            <ToOpenIcon
                isHighlighted={isHighlighted}
                toggleSideDrawer={props.toggleSideDrawer}
            />
        );
    } else {
        return (
            <ToCloseIcon
                isHighlighted={isHighlighted}
                toggleSideDrawer={props.toggleSideDrawer}
            />
        )
    }
};

export default TheDrawerToggle;