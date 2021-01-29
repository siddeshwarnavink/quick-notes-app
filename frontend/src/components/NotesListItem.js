import { Link } from 'react-router-dom';
import styled from "styled-components";

const NotesListItemWrapper = styled.article`
    padding: 1rem;
    margin: 1rem 10px;
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
    border-left: 10px solid transparent;
`;

const NotesListItemTitle = styled.span`
    display: block;
    font-size: 1.2rem;
    font-weight: bold;
`;

const NotesListItemContent = styled.span`
    color: #555;
`;

const SelectedListItem = styled.div`
    ${NotesListItemWrapper} {
        border-left-color: #9999ff;
    }
`;

const NotesListItem = (props) => {
    let WrapperComponent = 'div';

    if (props.selected) {
        WrapperComponent = SelectedListItem;
    }

    return (
        <WrapperComponent>
            <Link
                to={`/main/note/${props.id}`}
                onClick={props.onClick}
                style={{
                    textDecoration: 'none',
                    color: '#000'
                }}
            >
                <NotesListItemWrapper>
                    <NotesListItemTitle>{props.title}</NotesListItemTitle>
                    <NotesListItemContent>{props.content}</NotesListItemContent>
                </NotesListItemWrapper>
            </Link>
        </WrapperComponent>
    );
};

export default NotesListItem;