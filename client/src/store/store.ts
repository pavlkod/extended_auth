import { makeAutoObservable } from "mobx";
import IUser from "../models/response/IUser";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  constructor() {
    makeAutoObservable(this);
  }
}
