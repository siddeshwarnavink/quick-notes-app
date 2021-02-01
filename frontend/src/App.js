import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import LandingScreen from './components/LandingScreen';
import AuthScreen from './components/AuthScreen';
import MobileUserNavigationGuide from './components/MobileUserNavigationGuide';
import ResolutionContext from './context/resolution-context';
import NotificationContent from './context/notification-context';
import HighlightEntityContext from './context/highlight-entity-context';
import initNotesStore from './store/notes-store';
import initAuthStore from './store/auth-store';
import FlashNotification from './components/FlashNotification';

initNotesStore();
initAuthStore();

const App = (props) => {
    const [notifications, setNotifications] = React.useState([]);
    const [currentResolution, setCurrentResolution] = React.useState('desktop');
    const [highlightEl, setHighlightEl] = React.useState(null);
    const [showUserGuide, setShowUserGuide] = React.useState(props.history.location.pathname === '/main/homePage' && !localStorage.getItem('userGuideCompleted'));

    React.useState(() => {
        const updateCurrentResolution = () => {
            if (window.innerWidth <= 600) {
                setCurrentResolution('mobile');
            } else {
                setCurrentResolution('desktop');
            }
        }

        updateCurrentResolution();

        window.addEventListener("resize", updateCurrentResolution);

        return () => window.removeEventListener("resize", updateCurrentResolution);
    }, []);

    const pushNotificationHandler = (message, msgType) => {
        const notificationId = notifications.length + 1;

        setNotifications(prevMessages => [
            { id: notificationId, message, msgType },
            ...prevMessages
        ]);

        setTimeout(() => {
            setNotifications(prevMessages => prevMessages.filter(notification => notification.id !== notificationId));
        }, 1000);
    }

    const completeUserGuideHandler = () => {
        localStorage.setItem('userGuideCompleted', true);
        setShowUserGuide(false);
    }

    return (
        <ResolutionContext.Provider value={currentResolution}>
            <HighlightEntityContext.Provider value={{ highlightEl, setHighlightEl }}>
                <NotificationContent.Provider value={{
                    messages: notifications,
                    push: pushNotificationHandler
                }}>
                    <React.Fragment>
                        {(showUserGuide && currentResolution === 'mobile') && (
                            <MobileUserNavigationGuide
                                closeGuide={completeUserGuideHandler}
                            />
                        )}
                        <Switch>
                            <Route path="/main" component={LandingScreen} />
                            <Route path="/auth" component={AuthScreen} />
                            <Redirect to="/main" />
                        </Switch>

                        {notifications.map(notification => (
                            <FlashNotification
                                key={notification.id}
                                type={notification.msgType}
                            >
                                {notification.message}
                            </FlashNotification>
                        ))}
                    </React.Fragment>
                </NotificationContent.Provider>
            </HighlightEntityContext.Provider>
        </ResolutionContext.Provider>
    );
};

export default withRouter(App);