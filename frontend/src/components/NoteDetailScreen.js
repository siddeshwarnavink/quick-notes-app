import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";

import { Button, IconButton, Modal, ButtonGroup } from './UI';
import CreateNote from './CreateNote';

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
        if(isEditActive) {
            setIsEditActive(false);
        } else {
            props.history.goBack();
        }
    }

    const goToEditHandler = (event) => {
        event.preventDefault();
        setIsEditActive(true);
    };

    let pageContent = (
        <NoteContent>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</NoteContent>
    );

    if(isEditActive) {
        pageContent = (
            <CreateNote
                onCancel={goBackHandler}
            />
        )
    }

    return (
        <React.Fragment>
            <NoteDetailScreenCard>
                <NoteDetailHeader>
                    <IconButton icon="arrow_back" onClick={goBackHandler} />
                    <NoteDetailHeaderCaption>Note title</NoteDetailHeaderCaption>

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

export default withRouter(NoteDetailScreen);