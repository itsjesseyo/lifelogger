import React, { useState, useEffect } from 'react';

import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter
} from 'framework7-react';


import routes from '../js/routes';
import store from '../js/store';

const MyApp = () => {
  // Login screen demo data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Framework7 Parameters
  const f7params = {
    name: 'Life Logger', // App name
      theme: 'auto', // Automatic theme detection

      darkMode: false,


      // App store
      store: store,
      // App routes
      routes: routes,

      // Register service worker (only on production build)
      serviceWorker: process.env.NODE_ENV ==='production' ? {
        path: '/service-worker.js',
      } : {},
  };

  f7ready(() => {
    // Call F7 APIs here
  });

  return (
    <App { ...f7params }>


      {/* Your main view, should have "view-main" class */}
      <View main className="safe-areas" url="/" />

      {/* Popup */}
      <Popup id="my-popup">
        <View>
          <Page>
            <Navbar title="Popup">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              <p>Popup content goes here.</p>
            </Block>
          </Page>
        </View>
      </Popup>


    </App>
  )
}
export default MyApp;