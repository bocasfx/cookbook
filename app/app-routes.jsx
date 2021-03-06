import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './routes.jsx';


class AppRoutes extends React.Component {

  onUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Router history={browserHistory} routes={routes} onUpdate={this.onUpdate}/>
    );
  }
}

module.exports = AppRoutes;
