/**
 * @author Synsoft Global
 * import top level dependencies
 * initialize the app component 
 * initialize css and initial modules like Router, css, Store and Providers
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement);

/**
 * Registering service worker
 * For creating a PWA
 */
registerServiceWorker();
