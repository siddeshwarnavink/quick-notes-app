import React from 'react';
import styled from 'styled-components';

import { Icon } from './UI';
import { useStore } from '../store/store';

const IdlingScreenWrapper = styled.main`
    text-align: center;
    position: absolute;
    top: 40%;
    left: 53%;

    @media (max-width: 600px) {
        left: 16%;
        top: 30%;
    }

    * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        color: #999;
    }
`;

const IdlingScreenIcon = styled.section`
    & > * {
        font-size: 5rem;
    }
`;

const IdlingScreenCaption = styled.h1`
    font-size: 2rem;
    padding-bottom: 0;
`;

const IdlingScreenSubCaption = styled.p`
    margin: 0;
    padding: 0;
`;

const IdlingScreen = () => {
    return (
        <IdlingScreenWrapper>
            <IdlingScreenIcon>
                <Icon icon="import_contacts" />
            </IdlingScreenIcon>
            <IdlingScreenCaption>Click a note to view</IdlingScreenCaption>
            <IdlingScreenSubCaption>Or, create one by clicking the '+' button</IdlingScreenSubCaption>
        </IdlingScreenWrapper>
    )
};

const IdlingScreenHook = () => {
    const dispatch = useStore()[1];

    React.useEffect(() => {
        dispatch('CLEAR_NOTE_SELECTION');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <IdlingScreen />;
}

export default IdlingScreenHook;