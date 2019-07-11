/**
 * @author Synsoft Global
 * import top level dependencies
 * initialize the app component 
 * initialize css and initial modules like Router, css, Store and Providers
 */

 import * as React from 'react';
import './App.css';
import AppNavBar from './navigation/App.Bar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
/**
 * Create theme using material UI
 */
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  }
})

/**
 * Define main app component which will bootstrap the whole application
 */
class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <AppNavBar />
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}
/**
 * Export `App` as the default constant
 */
export default App;
