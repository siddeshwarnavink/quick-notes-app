import styled from 'styled-components';

import { Button } from './UI';
import profilePic from '../images/user-profile-picture.jpg';

const UserProfileWrapper = styled.div`
    text-align: center;
    padding-bottom: 1rem;
`;

const UserProfileDP = styled.img`
    border-radius: 100%;
    width: 125px;
    height: 125px;
`;

const UserProfile = () => {
    return (
        <UserProfileWrapper>
            <UserProfileDP src={profilePic} alt="Default" />
            <h1>John doe</h1>

            <p>5 Notes</p>
            <Button varient="solid">Logout</Button>
        </UserProfileWrapper>
    );
};

export default UserProfile;