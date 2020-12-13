import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import AuthChecker from "./Screens/Auth/AuthChecker";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <AuthChecker>
      <App />
    </AuthChecker>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
