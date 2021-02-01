import styled from 'styled-components';
import { Icon } from './UI';

const FlashNotificationWrapper = styled.div`
    background: rgba(0, 0, 0, 0.7);
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #ffffff;
    cursor: default;
    display: flex;
    max-width: 400px;
    pointer-events: auto;
    font-weight: 400;
    line-height: 1.25;
    margin-bottom: .75rem;
    position: absolute;
    bottom: 10%;
    left: 45%;
    -webkit-animation: animatebottom 0.4s;
    animation: animatebottom 0.4s;
    border-left: 10px solid ${p => p.color};

    @media (max-width: 600px) {
        bottom: 0 !important;
        left: 0 !important;
        width: 100%;
    }
`;

const NotificationContent = styled.div`
    margin: 0;
    padding: 0 1.5rem;
    padding-top: 1.2rem;
    font-size: 1.15rem;
`;

const NotificationIcon = styled.span`
    color: ${p => p.color};
    padding: 1rem 0;
    padding-left: 1rem;
`;

const FlashNotification = (props) => {
    let notificationColor;
    let iconName;

    switch (props.type) {
        case 'success':
            notificationColor = '#4caf50';
            iconName = 'done';
            break;
        case 'error':
            notificationColor = '#f44336';
            iconName = 'error';
            break;
        default:
            notificationColor = 'transparent'
            break;
    }


    return (
        <FlashNotificationWrapper color={notificationColor}>
            <NotificationIcon color={notificationColor}>
                {iconName && <Icon icon={iconName} />}
            </NotificationIcon>

            <NotificationContent>
                {props.children}
            </NotificationContent>
        </FlashNotificationWrapper>
    )
}

export default FlashNotification;