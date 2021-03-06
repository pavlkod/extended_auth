import axios from "axios";
import { makeAutoObservable } from "mobx";
import { AuthResponse } from "../models/response/AuthResponse";
import IUser from "../models/response/IUser";
import AuthService from "../services/AuthService";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  constructor() {
    makeAutoObservable(this);
  }
  setIsLoading(bool: boolean) {
    this.isLoading = bool;
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
  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setIsAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
  async chechAuth() {
    try {
      this.setIsLoading(true);
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });

      localStorage.setItem("token", response.data.accessToken);
      this.setIsAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
}
