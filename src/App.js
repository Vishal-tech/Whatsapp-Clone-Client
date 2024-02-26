import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import Login from "./pages/LoginSignup/Login";
import Signup from "./pages/LoginSignup/Signup";
import MainApp from "./pages/MainApp/MainApp";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
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
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
