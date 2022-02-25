import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import reportWebVitals from './reportWebVitals';

import { store } from 'util/store';
import { Game } from 'feature/game';
import { RootStoreProvider } from 'util/rootStore';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RootStoreProvider>
        <DndProvider backend={HTML5Backend}>
          <Game />
        </DndProvider>
      </RootStoreProvider>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
