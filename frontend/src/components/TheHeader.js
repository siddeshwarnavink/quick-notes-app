import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from './UI';

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

const TheHeader = (props) => {
    return (
        <HeaderWrapper>
            <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
                <HeaderBrandName>QuickNotes</HeaderBrandName>
            </Link>

            <HeaderSpacer />

            <HeaderAction>
                <Button varient="solid" onClick={props.openUserProfile}>My Profile</Button>
            </HeaderAction>
        </HeaderWrapper>
    );
};

export default TheHeader;