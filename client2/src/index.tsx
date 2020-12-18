import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AuthChecker from "./Screens/Auth/AuthChecker";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";

const render = () => {
  const App = require("./App").default;

  ReactDOM.render(
    <Provider store={store}>
      <AuthChecker>
        <App />
      </AuthChecker>
    </Provider>,
    document.getElementById("root")
  );
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App", render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
