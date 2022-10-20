import React, { useEffect } from "react";
import './App.css';
import HomePage from "./containers/HomePage/index";
import ProductListPage from "./containers/ProductListPage/index";
import ProductDetailsPage from "./containers/ProductDetailsPage"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions/auth-action";

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {

    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }

  }, [auth.authenticate])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />
          <Route path="/:slug" component={ProductListPage} />

        </Switch>

      </Router>


    </div>
  );
}

export default App;
