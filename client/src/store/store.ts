import { makeAutoObservable } from "mobx";
import IUser from "../models/response/IUser";
import AuthService from "../services/AuthService";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  constructor() {
    makeAutoObservable(this);
  }
  setIsAuth(bool: boolean) {
    this.isAuth = bool;
  }
  getIsAuth() {
    return this.isAuth;
  }
  setUser(user: IUser) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }
  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setIsAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setIsAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
}
