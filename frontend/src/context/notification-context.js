import React from 'react';

const NotificationContext = React.createContext({
    messages: [],
    push: (message, msgType) => { }
});

export default NotificationContext;