import styled from 'styled-components';

import { Button } from './UI'
import useForm from '../hooks/useForm.js';
import { useStore } from '../store/store';
import { createNotesForm } from '../shared/forms';

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

        console.log('Valid!', formFields);
    };

    return (
        <CreateNoteForm onSubmit={createNoteHandler}>
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
        </CreateNoteForm>
    );
};

const CreateNoteHook = (parentProps) => {
    const [state, dispatch] = useStore();

    const currentNote = state.notes.notes.find(note => note.id === state.notes.selectedNote);

    let displayForm = createNotesForm

    if (parentProps.editing) {
        displayForm['title'].value = currentNote.title;
        displayForm['title'].valid = true;
        displayForm['title'].touched = true;

        displayForm['content'].value = currentNote.content;
        displayForm['content'].valid = true;
        displayForm['content'].touched = true;
    }

    return (
        <CreateNote
            currentNote={currentNote}
            createNotesForm={displayForm}
            {...parentProps}
        />
    )
}


CreateNoteHook.defaultProps = {
    editing: false
};

export default CreateNoteHook;