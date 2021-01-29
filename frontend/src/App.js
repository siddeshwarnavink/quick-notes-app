import { Redirect, Route, Switch } from 'react-router-dom';

import LandingScreen from './components/LandingScreen';
import AuthScreen from './components/AuthScreen';
import initNotesStore from './store/notes-store';
import initAuthStore from './store/auth-store';

initNotesStore();
initAuthStore();

const App = (props) => {
    return (
        <Switch>
            <Route path="/main" component={LandingScreen} />
            <Route path="/auth" component={AuthScreen} />
            <Redirect to="/main" />
        </Switch>
    );
};

export default App;