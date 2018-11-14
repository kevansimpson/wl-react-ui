import React, { Component } from 'react';
import './App.css';
import WineTable from './components/WineTable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WineTable/>
      </div>
    );
  }
}

export default App;
