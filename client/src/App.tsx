import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";

import { Context } from "./index";
import IUser from "./models/response/IUser";
import UserService from "./services/UserService";

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.chechAuth();
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (store.isLoading) {
    return <div>Loading</div>;
  }
  if (!store.isAuth) {
    return <LoginForm />;
  }
  return (
    <div className="App">
      <h1>{store.isAuth ? "Пользователь авторизован" : "Авторизуйтесь"}</h1>
      {store.user.isActivated ? "Account is activated" : "Activate account"}
      <button onClick={() => store.logout()}>Exit</button>
      <div>
        <button onClick={getUsers}>Get users</button>
      </div>
      {users.map(user => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
};

export default observer(App);
