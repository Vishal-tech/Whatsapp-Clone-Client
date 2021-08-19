import React from 'react';
import { AuthProvider } from '../src/Auth/AuthContext'
import Login from '../src/Auth/Login'
import Signup from '../src/Auth/Signup'
import MainApp from './Mainapp/MainApp';

import{
  BrowserRouter as Router,Switch,Route
  } from"react-router-dom";

function App() {

  return (
    <Router>
      <AuthProvider>
      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Signup">
          <Signup />
        </Route>
        <Route path="/">
          <MainApp />
        </Route>
      </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
