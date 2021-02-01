import { initStore } from './store';

export const actions = {
    SET_AUTH_LOADING: (curState, isLoading) => {
        return {
            auth: {
                ...curState.auth,
                isLoading
            }
        };
    },
    SET_AUTH_USER: (curState, { userData, token }) => {
        localStorage.setItem('authToken', token);

        return {
            auth: {
                ...curState.auth,
                userData,
                token,
                isAuthenticated: true,
            }
        };
    },
    SET_AUTH_ERROR: (curState, error) => {
        return {
            auth: {
                ...curState.auth,
                error
            }
        }
    },
    AUTH_LOGOUT: (curState) => {
        localStorage.removeItem('authToken');

        return {
            auth: {
                ...curState.auth,
                isAuthenticated: false,
                token: null,
                userData: {}
            }
        }
    },
}

const configreStore = () => {
    initStore(actions, {
        auth: {
            isLoading: false,
            isAuthenticated: false,
            token: null,
            error: null,
            userData: {}
        }
    });
}

export default configreStore;