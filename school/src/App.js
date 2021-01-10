import React,{useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SplashScreen from './modules/SplashScreen';
import Films from './modules/Films';
import People from './modules/People';
import Locations from './modules/Locations';
import Species from './modules/Species';
import Vehicle from './modules/Vehicles';
import Home from './modules/Home'
function App() {

  const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => { setIsLoading(false) }, 1000)
    }, [])

  return (
    <>
    {
      isLoading ? <SplashScreen/> :
      <Router>
      <Switch>
        <Route exact path="/" >
          <Home/>
        </Route>
        <Route exact path="/films" >
          <Films/>
        </Route>
        <Route exact path="/people" >
          <People/>
        </Route>
        <Route exact path="/ubications" >
          <Locations/>
        </Route>
        <Route exact path="/species" >
          <Species/>
        </Route>
        <Route exact path="/vehicle" >
          <Vehicle/>
        </Route>
      </Switch>
    </Router>
    }
    </>
  );
}

export default App;
