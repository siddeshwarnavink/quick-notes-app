import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Layout from './Layout';
import NoteDetailScreen from './NoteDetailScreen';
import IdlingScreen from './IdlingScreen';
import CreateNote from './CreateNote';
import { Fab, Modal } from './UI';

const CreateNoteCaption = styled.h1`
    margin-left: 1rem;
`;

const LandingScreen = () => {
    const [createNoteModalOpen, setCreateNoteModalOpen] = React.useState(false);

    const toggleCreateNoteModalHandler = () => {
        setCreateNoteModalOpen(prevState => !prevState);
    };

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
                <CreateNote />
            </Modal>
        </Layout>
    )
};

export default LandingScreen;