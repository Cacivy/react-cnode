import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Head from './components/Head'
import List from './components/List'
import Float from './components/Float'
import './App.css';

const App = ({tab, float, actions}) => (
    <MuiThemeProvider>
      <div>
        <Head tab={tab} actions={actions}></Head>
        <List tab={tab} float={float} actions={actions}></List>
        <Float float={float}></Float>
      </div>
    </MuiThemeProvider>
)

App.propTypes = {
  tab: PropTypes.object.isRequired,
  float: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    tab: state.tab,
    float: state.float
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
