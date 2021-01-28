import React from 'react';
import styled from 'styled-components';

import TheHeader from './TheHeader';
import NotesList from './NotesList';
import UserProfile from './UserProfile';
import { Modal } from './UI';

const LayoutWrapper = styled.main`
    display: flex;
    margin-top: 1rem;
`;

const LayoutMainContent = styled.section`
  width: 100%;
`;

const LayouSideDrawer = styled.section`
    width: 30%;
    overflow-y: scroll;
    height: 90vh;
`;

const Layout = (props) => {
    const [showUserProfileModal, setShowUserProfileModal] = React.useState(false);

    const toggleUserProfileModal = () => {
        setShowUserProfileModal(prevState => !prevState);
    }

    return (
        <React.Fragment>
            <TheHeader openUserProfile={toggleUserProfileModal} />
            <LayoutWrapper>
                <LayouSideDrawer>
                    <NotesList />
                </LayouSideDrawer>
                <LayoutMainContent>
                    {props.children}
                </LayoutMainContent>
            </LayoutWrapper>

            <Modal size="small" show={showUserProfileModal} modalClosed={toggleUserProfileModal}>
                <UserProfile />
            </Modal>
        </React.Fragment >
    );
};

export default Layout;