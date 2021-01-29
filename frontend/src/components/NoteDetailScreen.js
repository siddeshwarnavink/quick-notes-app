import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";

import { Button, IconButton, Modal, ButtonGroup } from './UI';
import CreateNote from './CreateNote';
import { useStore } from '../store/store';

const NoteDetailScreenCard = styled.section`
    background-color: #fff;
    padding: 1rem 12px;
    width: 98%;
    margin-left: 1rem;
    border-radius: 10px;
    margin-top: 10px;
`;

const NoteDetailHeader = styled.header`
    display: flex;

    & > * {
        margin-left: 10px;
    }
`;

const NoteDetailHeaderCaption = styled.h1`
    font-size: 1.2rem;
`;

const NoteDetailHeaderSpacer = styled.div`
    flex: 1;
`;

const NoteContent = styled.p`
    padding: 0 1rem;
`;

const NoteDetailScreen = (props) => {
    const [showDeleteAlertModal, setShowDeleteAlertModal] = React.useState(false);
    const [isEditActive, setIsEditActive] = React.useState(false);

    const toggleShowDeleteAlertModalHandler = () => {
        setShowDeleteAlertModal(prevState => !prevState);
    }

    const goBackHandler = () => {
        if (isEditActive) {
            setIsEditActive(false);
        } else {
            // props.history.goBack();
            props.history.push('/main/homePage');
        }
    }

    const goToEditHandler = (event) => {
        event.preventDefault();
        setIsEditActive(true);
    };

    let pageContent = (
        <NoteContent>{props.currentNote.content}</NoteContent>
    );

    if (isEditActive) {
        pageContent = (
            <CreateNote
                editing
                onCancel={goBackHandler}
            />
        )
    }

    return (
        <React.Fragment>
            <NoteDetailScreenCard>
                <NoteDetailHeader>
                    <IconButton icon="arrow_back" onClick={goBackHandler} />
                    <NoteDetailHeaderCaption>{props.currentNote.title}</NoteDetailHeaderCaption>

                    <NoteDetailHeaderSpacer />

                    <IconButton icon="edit" theme={isEditActive ? 'primary' : 'default'} onClick={goToEditHandler} />
                    <IconButton icon="delete" onClick={toggleShowDeleteAlertModalHandler} />
                </NoteDetailHeader>
                {pageContent}
            </NoteDetailScreenCard>
            <Modal show={showDeleteAlertModal} modalClosed={toggleShowDeleteAlertModalHandler} size="small">
                <h1>Are you sure?</h1>
                <p>Are you sure that you want to delete this note? It can not be recovered.</p>

                <ButtonGroup>
                    <Button varient="solid">Yes</Button>
                    <Button varient="hollow">No</Button>
                </ButtonGroup>
            </Modal>
        </React.Fragment>

    );
}

const NoteDetailScreenHook = (parentProps) => {
    const [state, dispatch] = useStore();

    React.useEffect(() => {
        if (state.notes.selectedNote !== parentProps.match.params.noteId) {
            dispatch('TOGGLE_NOTE_SELECTION', parseInt(parentProps.match.params.noteId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleSelectNote = (noteId) => {
        dispatch('TOGGLE_NOTE_SELECTION', noteId);
    };

    const currentNote = state.notes.notes.find(note => note.id === parseInt(parentProps.match.params.noteId));

    return (
        <NoteDetailScreen
            currentNote={currentNote}
            toggleSelectNote={() => toggleSelectNote(currentNote.id)}
            {...parentProps}
        />
    )
}

export default withRouter(NoteDetailScreenHook);