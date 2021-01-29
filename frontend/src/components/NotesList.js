import React from 'react';

import NotesListItem from './NotesListItem';
import { useStore } from '../store/store';

const NotesList = (props) => {
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
            {notesList}
        </React.Fragment>
    );
};

const NotesListHook = () => {
    const [state, dispatch] = useStore();

    const toggleSelectNote = (noteId) => {
        dispatch('TOGGLE_NOTE_SELECTION', noteId);
    }

    return (
        <NotesList
            isLoading={state.notes.isLoading}
            loadedNotes={state.notes.notes}
            selectedNote={state.notes.selectedNote}
            error={state.notes.error}
            toggleSelectNote={toggleSelectNote}
        />
    );
}

export default NotesListHook;