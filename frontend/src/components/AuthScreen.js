import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from "styled-components";

import { Button, Icon, Spinner } from './UI';
import useForm from '../hooks/useForm';
import useErrorModal from '../hooks/useErrorModal';
import { useStore } from '../store/store';
import NotificationContext from '../context/notification-context';
import { loginForm, signupForm } from '../shared/forms';
import gqlEndpoint from '../constants/gql-endpoint';

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

    @media (max-width: 600px) {
        margin-left: 10px;
        width: 95% !important;
    }
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

const AuthScreen = (props) => {
    const [isSignup, setIsSignup] = React.useState(false);
    const [renderLoginFormInputs, isLoginFormValid, loginFormFields] = useForm(loginForm);
    const [renderSignupFormInputs, isSignupFormValid, signUpFormFields] = useForm(signupForm);
    const [renderErrorModal] = useErrorModal(props.error);

    const toggleAuthModeHandler = () => {
        setIsSignup(prevState => !prevState);
    };

    const handleOnAuth = (event) => {
        event.preventDefault();
        props.onAuth(
            isSignup,
            isSignup ? signUpFormFields : loginFormFields,
            () => setIsSignup(false)
        );
    }

    const authForm = isSignup ? renderSignupFormInputs() : renderLoginFormInputs();
    const authButtonDisable = !(isSignup ? isSignupFormValid : isLoginFormValid);

    return (
        <AuthWrapper>
            {renderErrorModal()}
            {props.isAuthenticated && (
                <Redirect to="/main/homePage" />
            )}
            <AuthCard>
                {props.loading ? (
                    <Spinner />
                ) : (
                        <React.Fragment>
                            <AuthCardLogo>
                                <Icon icon="import_contacts" />
                            </AuthCardLogo>

                            <AuthCardCaption>
                                {isSignup ? "Create your account" : "Login to your account"}
                            </AuthCardCaption>

                            <AuthCardForm onSubmit={handleOnAuth}>
                                {authForm}

                                <AuthCardAction>
                                    <Button varient="solid" btnType="submit" disabled={authButtonDisable}>
                                        {isSignup ? "Sign up" : "Login"}
                                    </Button>
                                    <Button varient="flat" onClick={toggleAuthModeHandler}>Switch to Signup</Button>
                                </AuthCardAction>
                            </AuthCardForm>
                        </React.Fragment>
                    )}
            </AuthCard>
        </AuthWrapper>
    );
};

const AuthScreenHook = (parentProps) => {
    const [state, dispatch] = useStore();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const notificationCtx = React.useContext(NotificationContext);

    const handleAuth = async (isSignup, formFields, goToLogin) => {
        setLoading(true);
        setError(null);

        let requestBody = `
            query {
                loginUser(email: "${formFields.email}", password: "${formFields.password}") {
                    token,
                    user {
                        username
                    }
                }
            }          
        `;

        if (isSignup) {
            requestBody = `
                mutation {
                    createUser(
                        username: "${formFields.username}"
                        email: "${formFields.email}"
                        password: "${formFields.password}"
                    ) {
                        username
                    }
                }                  
            `
        }

        const response = await fetch(gqlEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: requestBody
            })
        });
        const data = await response.json();
        const statusCode = await response.status;

        if ('errors' in data || statusCode === 500) {
            setError(data.errors[0]);
        } else {
            if (!isSignup) {
                dispatch('SET_AUTH_USER', {
                    userData: {
                        username: data.data.loginUser.user.username
                    },
                    token: data.data.loginUser.token
                });
                if (localStorage.getItem('userGuideCompleted')) {
                    notificationCtx.push('Logged in successfully!', 'success');
                }
            } else {
                notificationCtx.push('Account created successfully!', 'success');
                goToLogin();
            }
        }

        console.log({
            data,
            isAuthenticated: state.auth.isAuthenticated
        });

        setLoading(false);
    }

    return (
        <AuthScreen
            onAuth={handleAuth}
            loading={loading}
            error={error}
            isAuthenticated={state.auth.isAuthenticated}
            {...parentProps}
        />
    )
}

export default AuthScreenHook;