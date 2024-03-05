/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from 'redux-promise'; //promise를 사용하기 위한 미들웨어
import {thunk} from 'redux-thunk'; //비동기 사용 위한 미들웨어
import Reducer from './reducers/login';

import 'bootstrap/dist/css/bootstrap.min.css';

//원래 store는 객체밖에 못받기 때문에 promise와 function을 사용하기 위해 미들웨어를 사용
const createStoreWithMiddleware = applyMiddleware(
    promiseMiddleware,
    thunk
)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider
          store={createStoreWithMiddleware(
          Reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
      >
          <App />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import promiseMiddleware from 'redux-promise';
import { thunk } from 'redux-thunk';
import Reducer from './reducers/login';
import App from "./App";

import 'bootstrap/dist/css/bootstrap.min.css';
import {PersistGate} from "redux-persist/integration/react";

// redux-persist 구성
const persistConfig = {
    key: 'root',    // 저장소 키
    storage,    // 저장소 유형 (이 경우 localStorage)
};

const persistedReducer = persistReducer(persistConfig, Reducer);
const store = createStore(
    persistedReducer,
    applyMiddleware(promiseMiddleware, thunk)
);
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div /*style={{ background: '#000000' }}*/ >
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </React.StrictMode>
    </div>

);