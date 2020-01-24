import React from 'react';
import './App.css';
import Tabs from './components/tabs'
import Mills from './components/mills'
import Harvests from './components/harvests'
import Farms from './components/farms'
import Fields from './components/fields'
import Home from './components/home'
import { BrowserRouter, Route, Switch } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Tabs />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/mills" component={Mills} />
        <Route path="/harvests" component={Harvests} />
        <Route path="/farms" component={Farms} />
        <Route path="/fields" component={Fields} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
