import { Redirect, Route, Switch } from 'react-router-dom';

import LandingScreen from './components/LandingScreen';
import AuthScreen from './components/AuthScreen';
import { useStore } from './store/store';
import initNotesStore from './store/notes-store';
import initAuthStore from './store/auth-store';

initNotesStore();
initAuthStore();

const App = (props) => {
    return (
        <Switch>
            <Route path="/main" component={LandingScreen} />
            <Route path="/auth" component={AuthScreen} />
            <Redirect to={props.isAuthenticated ? "/main/homePage" : "/auth"} />
        </Switch>
    );
};

const AppHook = () => {
    const state = useStore()[0];

    return (
        <App
            isAuthenticated={state.auth.isAuthenticated}
        />
    )
}

export default AppHook;