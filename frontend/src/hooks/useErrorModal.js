import React from 'react';

import { Modal, Button } from '../components/UI';

function useErrorModal(error) {
    const [showModal, setShowModal] = React.useState(false);
    React.useEffect(() => {
        if (error) {
            setShowModal(true);
            if (process.env.NODE_ENV === 'development') {
                console.error(error);
            }
        }
    }, [error]);

    function toggleModalHandler() {
        setShowModal(prvShowModal => !prvShowModal);
    }

    function renderErrorModal() {
        return (
            <Modal
                show={showModal}
                size="small"
                modalClosed={toggleModalHandler}
                noCloseButton
            >
                <h1>An error occured!</h1>
                <p>{error ? error.message : null}</p>

                <Button varient="solid" onClick={toggleModalHandler}>Dismiss</Button>
            </Modal>
        )
    }

    return [renderErrorModal];
}

export default useErrorModal;