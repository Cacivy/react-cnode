import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Head from './components/Head'
import List from './components/List'
import Float from './components/Float'
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Head></Head>
          <List></List>
          <Float></Float>
        </div>
      </MuiThemeProvider>
       
    );
  }
}

export default App;
