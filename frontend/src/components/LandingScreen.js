import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Layout from './Layout';
import NoteDetailScreen from './NoteDetailScreen';
import IdlingScreen from './IdlingScreen';
import CreateNote from './CreateNote';
import SplashScreen from './SplashScreen';
import { Fab, Modal } from './UI';
import { useStore } from '../store/store';
import gqlEndpoint from '../constants/gql-endpoint';

const CreateNoteCaption = styled.h1`
    margin-left: 1rem;
`;

const LandingScreen = (props) => {
    const [createNoteModalOpen, setCreateNoteModalOpen] = React.useState(false);

    const toggleCreateNoteModalHandler = () => {
        setCreateNoteModalOpen(prevState => !prevState);
    };

    if (props.loading) {
        return <SplashScreen />
    }

    return (
        <Layout>
            <Switch basename="/main">
                <Route exact path="/main/homePage" component={IdlingScreen} />
                <Route exact path="/main/note/:noteId" component={NoteDetailScreen} />

                <Redirect to="/main/homePage" />
            </Switch>

            <Fab onClick={toggleCreateNoteModalHandler}>+</Fab>
            <Modal
                show={createNoteModalOpen}
                modalClosed={toggleCreateNoteModalHandler}
            >
                <CreateNoteCaption>Create a Note</CreateNoteCaption>
                <CreateNote
                    closeModal={toggleCreateNoteModalHandler}
                    onCancel={toggleCreateNoteModalHandler}
                />
            </Modal>
        </Layout>
    )
};

const LandingScreenHook = (parentProps) => {
    const [state, dispatch] = useStore();

    React.useEffect(() => {
        (async () => {
            dispatch('SET_AUTH_LOADING', true);

            if (localStorage.getItem('authToken')) {
                const token = localStorage.getItem('authToken');

                const response = await fetch(gqlEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            query {
                                verifyLogin(token:"${token}") {
                                    newToken
                                    user {
                                        username
                                    }
                                }
                            }
                        `
                    })
                });
                const data = await response.json();

                if ('errors' in data) {
                    // ...
                } else {
                    dispatch('SET_AUTH_USER', {
                        userData: {
                            username: data.data.verifyLogin.user.username
                        },
                        token: data.data.verifyLogin.newToken
                    });
                }
            } else {
                parentProps.history.push('/auth');
            }

            dispatch('SET_AUTH_LOADING', false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LandingScreen
            loading={state.auth.isLoading}
            {...parentProps}
        />
    )
}

export default withRouter(LandingScreenHook);