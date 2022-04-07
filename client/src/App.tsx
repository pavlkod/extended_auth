import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";

import { Context } from "./index";

const App: FC = () => {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.chechAuth();
    }
  }, []);
  if (store.isLoading) {
    return <div>Loading</div>;
  }
  if (!store.isAuth) {
    return <LoginForm />;
  }
  return (
    <div className="App">
      <h1>{store.isAuth ? "Пользователь авторизован" : "Авторизуйтесь"}</h1>
      <button onClick={() => store.logout()}>Exit</button>
    </div>
  );
};

export default observer(App);
