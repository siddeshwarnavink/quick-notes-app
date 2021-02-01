import { initStore } from './store';

export const actions = {
    SET_NOTES_LOADING: (curState, isLoading) => {
        return {
            notes: {
                ...curState.notes,
                isLoading
            }
        }
    },
    SET_NOTES: (curState, loadedNotes) => {
        return {
            notes: {
                ...curState.notes,
                notes: loadedNotes,
                fetched: true
            }
        }
    },
    TOGGLE_NOTE_SELECTION: (curState, currentNoteId) => {
        const currentNote = curState.notes.notes.find(note => note.id === currentNoteId);

        let updatedSelectedNote = currentNote.id;

        // if (curState.notes.selectedNote === currentNote.id) {
        //     updatedSelectedNote = null
        // }

        return {
            notes: {
                ...curState.notes,
                selectedNote: updatedSelectedNote
            }
        }
    },
    CLEAR_NOTE_SELECTION: (curState) => {
        return {
            notes: {
                ...curState.notes,
                selectedNote: null
            }
        }
    }
}

const configreStore = () => {
    initStore(actions, {
        notes: {
            notes: [],
            selectedNote: null,
            isLoading: false,
            fetched: false
        }
    });
}

export default configreStore;