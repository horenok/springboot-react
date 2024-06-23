
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import promiseMiddleware from 'redux-promise';
import { thunk } from 'redux-thunk';
import Reducer from './reducers/reducers';
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
    <div >
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </React.StrictMode>
    </div>

);