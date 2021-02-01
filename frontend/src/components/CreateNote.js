import React from 'react';
import styled from 'styled-components';

import { Button, Spinner } from './UI'
import useForm from '../hooks/useForm.js';
import { useStore } from '../store/store';
import NotificationContext from '../context/notification-context';
import { createNotesForm } from '../shared/forms';
import gqlEndpoint from '../constants/gql-endpoint';

const CreateNoteForm = styled.form`
    padding: 1rem;

    button {
        margin-right: .5rem;
    }
`;

const CreateNoteFormActions = styled.section`
    margin-top: 1rem;
`;

const CreateNote = (props) => {
    const [renderFormInputs, isFormValid, formFields] = useForm(props.createNotesForm);

    const createNoteHandler = (event) => {
        event.preventDefault();

        if (!isFormValid()) return;

        props.onUpdateNote(formFields, () => props.closeModal());
    };

    return (
        <CreateNoteForm onSubmit={createNoteHandler}>
            <React.Fragment>
                {props.loading ? <Spinner /> : (
                    <React.Fragment>
                        {renderFormInputs()}

                        <CreateNoteFormActions>
                            <Button
                                varient="solid"
                                btnType="submit"
                                disabled={!isFormValid()}
                            >
                                Submit
                            </Button>

                            <Button varient="flat" onClick={props.onCancel}>
                                Cancel
                            </Button>
                        </CreateNoteFormActions>
                    </React.Fragment>
                )}
            </React.Fragment>

        </CreateNoteForm>
    );
};

const CreateNoteHook = (parentProps) => {
    const [state, dispatch] = useStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const notificationCtx = React.useContext(NotificationContext)

    const currentNote = state.notes.notes.find(note => note.id === state.notes.selectedNote);

    let displayForm = createNotesForm

    if (parentProps.editing) {
        displayForm['title'].value = currentNote.title;
        displayForm['title'].valid = true;
        displayForm['title'].touched = true;

        displayForm['content'].value = currentNote.content;
        displayForm['content'].valid = true;
        displayForm['content'].touched = true;
    } else {
        displayForm['title'].value = '';
        displayForm['title'].valid = false;
        displayForm['title'].touched = false;

        displayForm['content'].value = '';
        displayForm['content'].valid = false;
        displayForm['content'].touched = false;
    }

    const updateNoteHandler = async (formFields, callback) => {
        setIsLoading(true);

        if (!parentProps.editing) {
            const response = await fetch(gqlEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.auth.token}`
                },
                body: JSON.stringify({
                    query: `
                    mutation {
                        createNote(title:"${formFields.title}", content:"${formFields.content}") {
                            id,
                            title,
                            content
                        }
                    }
                `
                })
            });
            const data = await response.json();

            if ('errors' in data) {
                setError(data.errors[0]);

                notificationCtx.push('Failed to create the note', 'error');
            } else {
                dispatch('SET_NOTES', [
                    {
                        id: data.data.createNote.id,
                        title: data.data.createNote.title,
                        content: data.data.createNote.content,
                        created_at: new Date().toISOString()
                    },
                    ...state.notes.notes
                ]);
                notificationCtx.push('Note created successfully!', 'success');
                callback();
            }
        } else {
            const response = await fetch(gqlEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.auth.token}`
                },
                body: JSON.stringify({
                    query: `
                    mutation {
                        updateNote(id: ${currentNote.id},title:"${formFields.title}", content:"${formFields.content}") {
                            id,
                            title,
                            content
                        }
                    }
                `
                })
            });
            const data = await response.json();

            if ('errors' in data) {
                setError(data.errors[0]);

                notificationCtx.push('Failed to update the note', 'error');
            } else {
                dispatch('SET_NOTES', [
                    {
                        id: data.data.updateNote.id,
                        title: data.data.updateNote.title,
                        content: data.data.updateNote.content,
                        ...state.notes.notes.find(note => note.id === currentNote.id)
                    },
                    ...state.notes.notes.filter(note => note.id !== currentNote.id)
                ]);
                notificationCtx.push('Note updated successfully!', 'success');
                callback();
            }
        }
        setIsLoading(false);
    }

    return (
        <CreateNote
            loading={isLoading}
            error={error}
            currentNote={currentNote}
            createNotesForm={displayForm}
            onUpdateNote={updateNoteHandler}
            {...parentProps}
        />
    )
}


CreateNoteHook.defaultProps = {
    editing: false,
    closeModal: () => { }
};

export default CreateNoteHook;