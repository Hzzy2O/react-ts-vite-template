import "virtual:windi.css";
import "@/styles/index.less";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import store from "@/store";
import { useRoutes } from "react-router-dom";
import routes from "@/router";
import "@/hooks/rem"

const RouteView = () => useRoutes(routes);

setTimeout(() => {
  ReactDOM.render(
    <React.StrictMode>
      {/* <Provider stores={store}> */}
        <BrowserRouter>
          <RouteView />
        </BrowserRouter>
      {/* </Provider> */}
    </React.StrictMode>,
    document.getElementById("root")
  );
}, 1200);
