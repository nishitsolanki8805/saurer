import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from './store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
            <ToastContainer />
    </Provider>
);

serviceWorker.unregister();