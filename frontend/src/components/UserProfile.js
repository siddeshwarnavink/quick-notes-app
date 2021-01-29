import styled from 'styled-components';

import { Button } from './UI';
import { useStore } from '../store/store';
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

const UserProfile = (props) => {
    return (
        <UserProfileWrapper>
            <UserProfileDP src={profilePic} alt="Default" />
            <h1>{props.userData.username}</h1>

            <p>{props.notesCount} Notes</p>
            <Button varient="solid">Logout</Button>
        </UserProfileWrapper>
    );
};

const UserProfileHook = () => {
    const state = useStore()[0];

    return (
        <UserProfile
            userData={state.auth.userData}
            notesCount={state.notes.notes.length}
        />
    )
}

export default UserProfileHook;