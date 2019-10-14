import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";

import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const store = createStore(rootReducer);

const virtualComponent = (
	<Provider store={store}>
		<App />
	</Provider>
);

const nativeComponent = document.getElementById("root");
ReactDOM.render(virtualComponent, nativeComponent);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
