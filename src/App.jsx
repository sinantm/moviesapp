import React from 'react';
import { Provider } from 'react-redux';
import Nav from './components/Nav';
import Routes from './routes';
import Store from './store/store';
//import Nav from './components/Nav';

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Nav />
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
