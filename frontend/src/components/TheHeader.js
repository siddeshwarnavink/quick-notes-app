import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button, IconButton } from './UI';
import TheDrawerToggle from './TheDrawerToggle';

const HeaderWrapper = styled.header`
    background-color: #fff;
    padding: 10px 12px;
    width: 100%;
    display: flex;
    box-shadow:0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
`;

const HeaderBrandName = styled.h1`
    margin: 0;
    padding: 5px 10px;
    color: #555;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const HeaderSpacer = styled.div`
    flex: 1;
`;

const HeaderAction = styled.section`
    padding: 0 1rem;
`;

const MobileButton = styled.span`
    display: none;
    @media (max-width: 600px) {
        display: unset;
    }
`;

const DesktopButton = styled.span`
    display: unset;
    @media (max-width: 600px) {
        display: none;
    }
`;

const TheHeader = (props) => {
    return (
        <HeaderWrapper>
            {!props.noDrawerToggle && (
                <TheDrawerToggle
                    isSideDrawOpen={props.isSideDrawOpen}
                    toggleSideDrawer={props.toggleSideDrawer}
                />
            )}

            <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
                <HeaderBrandName>QuickNotes</HeaderBrandName>
            </Link>

            <HeaderSpacer />

            <HeaderAction>
                <DesktopButton>
                    <Button varient="solid" onClick={props.openUserProfile}>My Profile</Button>
                </DesktopButton>
                <MobileButton>
                    <IconButton icon="face" onClick={props.openUserProfile} />
                </MobileButton>
            </HeaderAction>
        </HeaderWrapper>
    );
};

TheHeader.defaultProps = {
    noDrawerToggle: false
};

export default TheHeader;