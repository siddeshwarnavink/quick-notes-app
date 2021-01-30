import React from 'react';
import styled from 'styled-components';

import { Button } from './UI';
import HighlightEntityContext from '../context/highlight-entity-context';

const CustomBackdrop = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99999999999;
`;

const FoucsCircle = styled.div`
    z-index: 9999999999;
    width: 200px;
    height: 200px;
    background-color: transparent;
    border-radius: 100%;
`;

const MobileUserNavigationGuideMessageBox = styled.div`
    z-index: 999999999999;
    position: absolute;
    bottom: 20%;
    right: 0;
    width: 350px;
    text-align: right;
    margin-right: .8rem;
`;

const MobileUserNavigationGuideMessage = styled.span`
    color: #fff;
    font-size: 1.5rem;
    display: block;
`;

const MobileUserNavigationGuide1 = (props) => {
    const highlightEntity = React.useContext(HighlightEntityContext);

    React.useEffect(() => {
        highlightEntity.setHighlightEl('CreateNote');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <CustomBackdrop>
                <FoucsCircle />
            </CustomBackdrop>

            <MobileUserNavigationGuideMessageBox>
                <MobileUserNavigationGuideMessage>Click '+' to create new note</MobileUserNavigationGuideMessage>
                <Button varient="flat" size="medium" onClick={props.onNext}>Next</Button>
            </MobileUserNavigationGuideMessageBox>
        </React.Fragment>
    );
};

const MobileUserNavigationGuide2 = (props) => {
    const highlightEntity = React.useContext(HighlightEntityContext);

    React.useEffect(() => {
        highlightEntity.setHighlightEl('DrawerToggler');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <CustomBackdrop>
                <FoucsCircle />
            </CustomBackdrop>

            <MobileUserNavigationGuideMessageBox>
                <MobileUserNavigationGuideMessage>Click menu to see all your notes</MobileUserNavigationGuideMessage>
                <Button varient="flat" size="medium" onClick={props.onClose}>Got it</Button>
            </MobileUserNavigationGuideMessageBox>
        </React.Fragment>
    );
};

const MobileUserNavigationGuide = (props) => {
    const [page, setPage] = React.useState(1);

    if (page === 1) {
        return <MobileUserNavigationGuide1 onNext={() => setPage(2)} />
    } else {
        return <MobileUserNavigationGuide2 onClose={props.closeGuide} />
    }
}

export default MobileUserNavigationGuide;