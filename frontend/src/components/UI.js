import React from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * Button
 */

const ButtonWrapper = styled.span`
    button {
        border: 2px solid #9999ff;
        padding: 10px 1rem;
        font-size: 1rem;
        color: #9999ff;
        background-color: transparent;
        border-radius: 10px;
        cursor: pointer;
        outline: none;
        transition-property: all;
        transition-duration: .3s;

        &:disabled {
            cursor: not-allowed;
        }
    }
`;

const SolidButton = styled.button`
    background-color: #9999ff !important;
    color: #fff !important;

    &:disabled {
        background-color: #999 !important;
        border-color: #999 !important;
    }
`;

const FlatButton = styled.button`
    border: 0 !important;
    color: #9999ff !important;
    font-weight: bold;
`;

const Button = (props) => {
    let ButtonComponent = 'button'

    switch (props.varient) {
        case 'hollow':
            ButtonComponent = 'button'
            break;
        case 'solid':
            ButtonComponent = SolidButton;
            break;
        case 'flat':
            ButtonComponent = FlatButton;
            break;
        default:
            ButtonComponent = 'button';
            break;
    }

    if (props.varient === 'solid') {
        ButtonComponent = SolidButton;
    }

    return (
        <ButtonWrapper>
            <ButtonComponent
                disabled={props.disabled}
                type={props.btnType}
                onClick={props.onClick}
            >
                {props.children}
            </ButtonComponent>
        </ButtonWrapper>
    );
};

Button.defaultProps = {
    varient: 'hollow',
    btnType: 'button',
    disabled: false,
    onClick: () => { }
};


/**
 * IconButton
 */

const IconButtonWrapper = styled.button`
    background-color: transparent;
`;

const IconPrimaryButtonWrapper = styled.button`
    background-color: #9999ff !important;
    color: #fff;
`;

const IconButtonParent = styled.section`
    ${IconButtonWrapper},
    ${IconPrimaryButtonWrapper} {
        border: 0;
        border-radius: 100%;
        padding: 12px 14px;
        outline: none;
        cursor: pointer;
        transition-property: background-color;
        transition-duration: .2s;
        
        &:hover {
            background-color: rgba(0, 0, 0, .2);
        }
    }
 `;

const IconButton = (props) => {
    let WrapperComponent = IconButtonWrapper;

    if (props.theme === 'primary') {
        WrapperComponent = IconPrimaryButtonWrapper
    }

    return (
        <IconButtonParent>
            <WrapperComponent onClick={props.onClick}>
                <i className="material-icons">
                    {props.icon}
                </i>
            </WrapperComponent>
        </IconButtonParent>
    );
};


IconButton.defaultProps = {
    icon: 'face',
    onClick: () => { }
};

/**
 * Fab
 */

const FabButton = styled.button`
    border: 1px solid #9999ff;
    box-shadow: 0px 5px 11px -2px rgba(0, 0, 0, 0.18), 0px 4px 12px -7px rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    display: block;
    width: 56px;
    height: 56px;
    position: fixed;
    outline: none;
    -webkit-transition: all .1s ease-out;
    transition: all .1s ease-out;
    font-size: 20px;
    background-color: #9999ff;
    color: #ffffff;
    bottom: 1rem;
    right: 1rem;
    cursor: pointer;

    &:hover,
    &:focus {
        box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
    }
`;

const Fab = (props) => {
    return (
        <FabButton onClick={props.onClick}>
            {props.children}
        </FabButton>
    )
}


/**
 * Button group
 */


const ButtonGroup = styled.div`
    & > * {
        margin-right: 12px;   
    }
`;


/**
 * Input
 */

const InputInputBox = styled.input`
    display: block;
    padding: 8px 16px;
    outline: none;
    width: 100%;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    transition-duration: .2s;

    &:focus {
        border-color: $primary !important;
    }
`;

const Input = (props) => {
    const onChangeHandler = (event) => {
        if (props.setInputValue) {
            props.setInputValue(event.target.value);
        }
    }

    return (
        <InputInputBox
            type={props.inputType}
            placeholder={props.inputPlaceholder}
            value={props.inputValue}
            name={props.inputName}
            onChange={props.onChange ? props.onChange : onChangeHandler}
        />
    )
}

/**
 * Textarea
 */

const TextareaBox = styled.textarea`
    display: block;
    padding: 8px 16px;
    outline: none;
    width: 100%;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    transition-duration: .2s;
    height: 225px;


    &:focus {
        border-color: $primary !important;
    }
`;

const Textarea = (props) => {
    const onChangeHandler = (event) => {
        if (props.setInputValue) {
            props.setInputValue(event.target.value);
        }
    }

    return (
        <TextareaBox
            placeholder={props.inputPlaceholder}
            name={props.inputName}
            onChange={props.onChange ? props.onChange : onChangeHandler}
            value={props.inputValue}
        ></TextareaBox>
    )
}

/**
 * FormInput
 */

const FormInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0 15px;

    .FormInput__error {
        color: $danger;
    }
`;

const FormInputError = styled.span`
    color: red;
`;

const FormInput = React.memo((props) => {
    let displayInput = (
        <Input
            inputType={props.type}
            inputValue={props.value}
            inputName={props.name}
            onChange={props.handleChange}
        />
    );

    if (props.type === 'textarea') {
        displayInput = (
            <Textarea
                inputType={props.type}
                inputValue={props.value}
                inputName={props.name}
                onChange={props.handleChange}
            />
        );
    }

    return (
        <FormInputWrapper>
            <label>{props.label}</label>
            {displayInput}
            {props.errorMessage && !props.isValid && (
                <FormInputError>{props.errorMessage}</FormInputError>
            )}
        </FormInputWrapper>
    );
});

/**
 * Backdrop
 */

const BackdropShadow = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99999999999;
`;

const Backdrop = (props) => {
    return props.show ? <BackdropShadow onClick={props.onClick} /> : null
}

/**
 * Modal
 */

const ModalBox = styled.div`
    position: fixed;
    z-index: 999999999999;
    background-color: white;
    width: 70%;
    border: 1px solid #ccc;
    padding: 16px;
    left: 15%;
    border-radius: 10px;
    top: 10%;
    overflow-y: scroll;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
`;

const ModalClose = styled.span`
    float: right;
`;

const ModalContent = styled.main`
    margin-top: 3rem;
`;

const Modal = (props) => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} onClick={props.modalClosed} />
            <ModalBox
                style={{
                    transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: props.show ? "1" : "0",
                    overflowY: props.scroll ? "scroll" : "hidden",
                    width: props.size === 'small' ? '30%' : '70%',
                    left: props.size === 'small' ? '35%' : '15%'
                }}
            >
                {!props.noCloseButton ? (
                    <ModalClose>
                        <Button onClick={props.modalClosed}>Close</Button>
                    </ModalClose>
                ) : null}

                <ModalContent>
                    {props.children}
                </ModalContent>
            </ModalBox>
        </React.Fragment>
    )
};

Modal.defaultProps = {
    noCloseButton: false
}

/**
 * Icon 
 */

const Icon = (props) => {
    return (
        <i className="material-icons">{props.icon}</i>
    );
}

/**
 * Spinner
 */

const motion = props => keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const SpinnerWrapper = styled.div`
    text-align: center;
`;

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
`

const RingSpinner = styled.div`
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${p => `${p.size}${p.sizeUnit}`};
    height: ${p => `${p.size}${p.sizeUnit}`};
    margin: 6px;
    border: 6px solid ${p => p.color};
    border-radius: 50%;
    animation: ${p => motion(p)} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${p => p.color} transparent transparent transparent;
    :nth-child(1) {
        animation-delay: -0.45s;
    }
    :nth-child(2) {
        animation-delay: -0.3s;
    }
    :nth-child(3) {
        animation-delay: -0.15s;
    }
`

const Spinner = ({ color, size, sizeUnit }) => (
    <SpinnerWrapper>
        <Wrapper>
            <RingSpinner color={color} size={size} sizeUnit={sizeUnit} />
        </Wrapper>
    </SpinnerWrapper>
)

Spinner.defaultProps = {
    size: 50,
    color: '#9999ff',
    sizeUnit: 'px'
}

export {
    Button,
    IconButton,
    Fab,
    ButtonGroup,
    Input,
    FormInput,
    Backdrop,
    Modal,
    Icon,
    Spinner
};