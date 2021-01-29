import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";

import { Button, IconButton, Modal, ButtonGroup, Spinner } from './UI';
import CreateNote from './CreateNote';
import { useStore } from '../store/store';
import gqlEndpoint from '../constants/gql-endpoint';

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

    let pageContent;

    if (!props.loading) {
        pageContent = (
            <NoteContent>{props.currentNote.content}</NoteContent>
        );

        if (isEditActive) {
            pageContent = (
                <CreateNote
                    editing
                    onCancel={goBackHandler}
                    closeModal={() => setIsEditActive(false)}
                />
            )
        }
    }

    return (
        <React.Fragment>
            {props.loading ? <Spinner /> : (
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
                        {props.deleteLoading ? <Spinner /> : (
                            <React.Fragment>
                                <h1>Are you sure?</h1>
                                <p>Are you sure that you want to delete this note? It can not be recovered.</p>

                                <ButtonGroup>
                                    <Button varient="solid" onClick={props.onDeleteNote}>Yes</Button>
                                    <Button varient="hollow" onClick={toggleShowDeleteAlertModalHandler}>No</Button>
                                </ButtonGroup>
                            </React.Fragment>
                        )}
                    </Modal>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

const NoteDetailScreenHook = (parentProps) => {
    const [state, dispatch] = useStore();
    const [deleteLoading, setDeleteLoading] = React.useState(false);
    const [waitTillFetch, setWaitTillFetch] = React.useState(false);

    React.useEffect(() => {
        if (state.notes.selectedNote !== parentProps.match.params.noteId) {
            if (!(state.notes.isLoading || !state.notes.fetched)) {
                dispatch('TOGGLE_NOTE_SELECTION', parseInt(parentProps.match.params.noteId));
            } else {
                setWaitTillFetch(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (waitTillFetch) {
            dispatch('TOGGLE_NOTE_SELECTION', parseInt(parentProps.match.params.noteId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.notes.fetched])

    const toggleSelectNote = (noteId) => {
        if (!(state.notes.isLoading || !state.notes.fetched)) {
            dispatch('TOGGLE_NOTE_SELECTION', noteId);
        }
    };

    const currentNote = state.notes.notes.find(note => note.id === parseInt(parentProps.match.params.noteId));

    const deleteNoteHandler = async () => {
        setDeleteLoading(true);

        const response = await fetch(gqlEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.auth.token}`
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        deleteNote(id: ${currentNote.id}) {
                            id
                        }
                    }
                `
            })
        });
        const data = await response.json();

        if ('errors' in data) {
            // ...
        } else {
            parentProps.history.push('/main/homePage');
            dispatch('SET_NOTES', state.notes.notes.filter(note => note.id !== data.data.deleteNote.id));
        }

        setDeleteLoading(false);
    }

    return (
        <NoteDetailScreen
            currentNote={currentNote}
            toggleSelectNote={() => toggleSelectNote(currentNote.id)}
            deleteLoading={deleteLoading}
            loading={state.notes.isLoading || !state.notes.fetched}
            onDeleteNote={deleteNoteHandler}
            {...parentProps}
        />
    )
}

export default withRouter(NoteDetailScreenHook);