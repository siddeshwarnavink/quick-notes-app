import React from 'react';
import styled from 'styled-components';

import TheHeader from './TheHeader';
import NotesList from './NotesList';
import UserProfile from './UserProfile';
import ResolutionContext from '../context/resolution-context';
import { Modal } from './UI';
import { withRouter } from 'react-router-dom';

const LayoutWrapper = styled.main`
    display: flex;
    margin-top: 1rem;

    @media (max-width: 600px) {
        display: block;
    }
`;

const LayoutMainContent = styled.section`
  width: 100%;
`;

const LayouSideDrawer = styled.section`
    width: 30%;
    overflow-y: scroll;
    height: 90vh;

    @media (max-width: 600px) {
        width: 100%;
    }
`;

const Layout = (props) => {
    const [isSideDrawOpen, setIsSideDrawOpen] = React.useState(false);
    const [showUserProfileModal, setShowUserProfileModal] = React.useState(false);
    const currentResolution = React.useContext(ResolutionContext);

    const toggleUserProfileModal = () => {
        setShowUserProfileModal(prevState => !prevState);
    }

    const toggleSideDrawerHandler = () => {
        setIsSideDrawOpen(prevState => !prevState);
    }

    props.history.listen((location, action) => {
        if (location.pathname === '/main/homePage') {
            setIsSideDrawOpen(true);
        } else {
            setIsSideDrawOpen(false);
        }
    });

    let layoutContent = props.children;

    return (
        <React.Fragment>
            <TheHeader
                noDrawerToggle={currentResolution === 'desktop'}
                isSideDrawOpen={isSideDrawOpen}
                openUserProfile={toggleUserProfileModal}
                toggleSideDrawer={toggleSideDrawerHandler}
            />
            <LayoutWrapper>
                <LayouSideDrawer style={{ display: currentResolution === 'mobile' ? isSideDrawOpen ? 'unset' : 'none' : 'unset' }}>
                    <NotesList />
                </LayouSideDrawer>
                <LayoutMainContent style={{ display: currentResolution === 'mobile' ? isSideDrawOpen ? 'none' : 'unset' : 'unset' }}>
                    {layoutContent}
                </LayoutMainContent>
            </LayoutWrapper>

            <Modal size="small" show={showUserProfileModal} modalClosed={toggleUserProfileModal}>
                <UserProfile />
            </Modal>
        </React.Fragment >
    );
};

export default withRouter(Layout);