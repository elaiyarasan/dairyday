import React,{lazy} from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { store } from './reducers/store'
const LazyApp = lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <LazyApp />
   </Provider>
  );

