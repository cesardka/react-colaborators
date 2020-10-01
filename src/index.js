import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import ColaboratorDetails from './pages/ColaboratorDetails';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/colaborator/:id" component={ColaboratorDetails} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
