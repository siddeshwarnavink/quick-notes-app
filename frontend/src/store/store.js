import { useState, useEffect } from 'react';

let globalState = {};
let listners = [];
let actions = {};

export const removeListner = (listnersList, currentListner) => {
    return listnersList.filter(li => li !== currentListner);
}

export const addListner = (listnersList, newListner) => {
    const updatedListners = [...listnersList]
    updatedListners.push(newListner)
    return updatedListners;
}

export const notifyAllListners = (listnersList, currentState) => {
    for (const listner of listnersList) {
        listner(currentState);
    }
}

export const useStore = (shouldListen = true) => {
    const setState = useState(globalState)[1];

    const dispatch = (actionIdent, payload) => {
        const newState = actions[actionIdent](globalState, payload);
        globalState = { ...globalState, ...newState };

        notifyAllListners(listners, globalState);
    }

    useEffect(() => {
        if (shouldListen) {
            listners = addListner(listners, setState)
        }
        return () => {
            listners = removeListner(listners, setState);
        }

    }, [setState, shouldListen]);

    return [globalState, dispatch];
}

export const initStore = (userActions, initalState) => {
    if (initalState) {
        globalState = { ...globalState, ...initalState };
    }
    actions = { ...actions, ...userActions };
};