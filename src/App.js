import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navigation from './Components/Navigation/Navigation';
import { Container } from 'react-bootstrap';
import Home from './Components/Home/Home';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Destination from './Components/Destination/Destination';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { useState, createContext } from 'react';
export const UserContext = createContext();



function App() {
  const [loggedinuser, setLoggedinuser] = useState({});
  return (
    <UserContext.Provider value={[loggedinuser, setLoggedinuser]}>

      <Container >
        <Router>

          <Navigation />

          <Switch >

            <PrivateRoute path="/destination">
              <Destination></Destination>
            </PrivateRoute>
            <Route path="/blog">

            </Route>
            <Route path="/contact">

            </Route>


            <Route path="/login">
              <Login></Login>
            </Route>

            <Route path="/register">
              <Register></Register>
            </Route>



            <PrivateRoute path="/vehicle/:vehiclekey">
              <Destination></Destination>
            </PrivateRoute>

            
            <div className="homeclass">
              <Route path="/home" >

                <Home ></Home>

              </Route>

              <Route exact path="/" >

                <Home ></Home>

              </Route>


            </div>


          </Switch>

        </Router>


      </Container>

    </UserContext.Provider>


  );
}

export default App;
