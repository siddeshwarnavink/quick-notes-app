import styled, { keyframes } from "styled-components"

const wave = keyframes`
  0% {
    box-shadow: 0 0 0px 0px rgba(0, 0, 0, 0.5);
  }

  100% {
    box-shadow: 0 0 0px 15px rgba(0, 0, 0, 0);
  }
`;


const SplashScreenWrapper = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SplashScreenIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    width: 55px;
    margin: 0 20px;
    color: #333;
    background: rgba(0, 0, 0, .4);
    box-shadow: 0 0 0px 0px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    transition: 250ms color;
    -webkit-transition: 250ms color;
    -moz-transition: 250ms color;
    -ms-transition: 250ms color;
    -o-transition: 250ms color;
    animation-name: ${wave};
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
`

const SplashScreen = () => {
    return (
        <SplashScreenWrapper>
            <SplashScreenIconWrapper>
            </SplashScreenIconWrapper>
        </SplashScreenWrapper>
    )
};

export default SplashScreen;