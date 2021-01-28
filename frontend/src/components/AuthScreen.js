import React from 'react';
import styled from "styled-components";

import { Button, Icon } from './UI';
import useForm from '../hooks/useForm';
import { loginForm, signupForm } from '../shared/forms';

const AuthWrapper = styled.main`
    max-width: 450px;
    margin: auto;
`;

const AuthCard = styled.section`
    background-color: #fff;
    width: 100%;
    padding: 2rem;
    border-radius: 10px;
    margin-top: 22vh;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
`;

const AuthCardLogo = styled.section`
    width: 100%;
    text-align: center;

    & > * {
        font-size: 3rem;
    }
`;

const AuthCardCaption = styled.h1`
    width: 100%;
    text-align: center;
`;

const AuthCardForm = styled.form``;

const AuthCardAction = styled.div`
    margin-top: 2rem;
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const AuthScreen = () => {
    const [isSignup, setIsSignup] = React.useState(false);
    const [renderLoginFormInputs, isLoginFormValid, loginFormFields] = useForm(loginForm);
    const [renderSignupFormInputs, isSignupFormValid, signUpFormFields] = useForm(signupForm);

    const toggleAuthModeHandler = () => {
        setIsSignup(prevState => !prevState);
    }

    const authForm = isSignup ? renderSignupFormInputs() : renderLoginFormInputs();
    const authButtonDisable = !(isSignup ? isSignupFormValid : isLoginFormValid);

    return (
        <AuthWrapper>
            <AuthCard>
                <AuthCardLogo>
                    <Icon icon="import_contacts" />
                </AuthCardLogo>

                <AuthCardCaption>
                    {isSignup ? "Create your account" : "Login to your account"}
                </AuthCardCaption>

                <AuthCardForm>
                    {authForm}

                    <AuthCardAction>
                        <Button varient="solid" disabled={authButtonDisable}>
                            {isSignup ? "Sign up" : "Login"}
                        </Button>
                        <Button varient="flat" onClick={toggleAuthModeHandler}>Switch to Signup</Button>
                    </AuthCardAction>
                </AuthCardForm>
            </AuthCard>
        </AuthWrapper>
    );
};

export default AuthScreen;