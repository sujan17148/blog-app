import config from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appWriteEndPoint)
      .setProject(config.projectId);
        this.account=new Account(this.client)
  }
  async createAccount({email,password,username}){
    try {
          const userAccount= await this.account.create(ID.unique(),email,password,username)
          if(userAccount){
             //if account created directly login not going to login page after creating account
             return this.login({email,password})
          }
    } catch (error) {
        console.log("appwrite error: creating account",error)
        throw error;
    }
  }
  async login({email,password}){
     try {
        return await this.account.createEmailPasswordSession(email,password)
     } catch (error) {
        console.log("appwrite error: login error",error)
        throw error;
     }
  }
  async getCurrentUser(){
     try {
         return await this.account.get()
     } catch (error) {
        console.log("appwrite error: currentuser",error)
     }
     return null;
  }
  async loginWithOAuth2(){
 try{
   this.account.createOAuth2Session('google', 'http://localhost:5173/', 'http://localhost:5173/login');
   const session = await this.account.getSession('current');
   return session
 }catch(error){
     console.log(error.message || "appwrite error oauth login")
 }
  }
  async logOut(){
    try{
         return await this.account.deleteSession("current") //use current to delete current session on logout to delete or logout from all devices use deletesessions() sessions not session
    }catch(error){
        console.log("appwrite erroe:logout",error)
    }
  }

}

const authService = new AuthService();
export default authService;
