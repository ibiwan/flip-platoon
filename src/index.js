import React from 'react';
import ReactDOM from 'react-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import reportWebVitals from './reportWebVitals';

import { Game } from 'feature/game';
import { RootStoreProvider } from 'util/rootStore';

ReactDOM.render(
  <React.StrictMode>
    <RootStoreProvider>
      <DndProvider backend={HTML5Backend}>
        <Game />
      </DndProvider>
    </RootStoreProvider>
  </React.StrictMode >,
  document.getElementById('root')
);

reportWebVitals();
