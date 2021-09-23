import logo from './logo.svg';
import './App.css';
import HomePage from './components/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginPage from './components/auth/Login';
import RegisterPage from './components/auth/Register';
import NavbarHome from './components/NavbarHome';

import AddNote from "./components/notes/AddNote";
import Note from "./components/notes/Note";
import NotesList from "./components/notes/NotesList";
import { ValidForm } from './components/ValidForm';

function App() {
  return (

    <Router>
      <NavbarHome />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>

          <Route path="/valid">
            <ValidForm />
          </Route>

          <Route exact path={["/notes"]} component={NotesList} />
          <Route exact path="/add" component={AddNote} />
          <Route path="/notes/:id" component={Note} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
