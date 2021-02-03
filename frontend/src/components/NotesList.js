import React from 'react';

import NotesListItem from './NotesListItem';
import { Spinner } from './UI';
import { useStore } from '../store/store'
import useErrorModal from '../hooks/useErrorModal';
import gqlEndpoint from '../constants/gql-endpoint';

const NotesList = (props) => {
    const [renderErrorModal] = useErrorModal(props.error);

    const toggleSelectNoteHandler = (noteId) => {
        props.toggleSelectNote(noteId);
    }

    const notesList = props.loadedNotes.map(note => (
        <NotesListItem
            key={note.id}
            id={note.id}
            title={note.title}
            content={`${note.content.substring(0, 15)}...`}
            selected={props.selectedNote === note.id}
            onClick={() => toggleSelectNoteHandler(note.id)}
        />
    ))

    return (
        <React.Fragment>
            {renderErrorModal()}
            {props.loading ? <Spinner /> : notesList}
        </React.Fragment>
    );
};

const NotesListHook = () => {
    const [state, dispatch] = useStore();
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            dispatch('SET_NOTES_LOADING', true);

            const response = await fetch(`${gqlEndpoint}?Authorization=Bearer ${state.auth.token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query {
                            userNotes {
                                id,
                                title,
                                content,
                                created_at,
                                updated_at
                            }
                        }
                    `
                })
            });
            const data = await response.json();

            if ('errors' in data) {
                setError(data.errors[0]);
            } else {
                dispatch('SET_NOTES', data.data.userNotes);
            }

            dispatch('SET_NOTES_LOADING', false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleSelectNote = (noteId) => {
        dispatch('TOGGLE_NOTE_SELECTION', noteId);
    }

    return (
        <NotesList
            loading={state.notes.isLoading}
            loadedNotes={state.notes.notes}
            selectedNote={state.notes.selectedNote}
            error={error}
            toggleSelectNote={toggleSelectNote}
        />
    );
}

export default NotesListHook;