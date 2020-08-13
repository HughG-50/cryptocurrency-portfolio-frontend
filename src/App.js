// import React from 'react';

// const App = () => {
//   return <div>App</div>;
// };

// export default App;

import React, { Component } from 'react';
import PortfolioContainer from './PortfolioContainer';
// import axios from 'axios';

import './App.css';

// const csrfToken = document.querySelector('[name="csrf-token"]').content;
// axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

class App extends Component {
  render() {
    return <PortfolioContainer />;
  }
}

export default App;
