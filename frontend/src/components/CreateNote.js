import styled from 'styled-components';

import { Button } from './UI'
import useForm from '../hooks/useForm.js';
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
    const [renderFormInputs, isFormValid, formFields] = useForm(createNotesForm);

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

export default CreateNote;