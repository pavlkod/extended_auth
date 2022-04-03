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
  return (
    <div className="App">
      <h1>{store.isAuth ? "Пользователь авторизован" : "Авторизуйтесь"}</h1>
      <LoginForm />
    </div>
  );
};

export default App;
