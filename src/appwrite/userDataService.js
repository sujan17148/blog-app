import config from "../conf/conf";
import { Client, Databases,Permission,Role } from "appwrite";

export class UserData {
  client = new Client();
  databases;
  constructor() {
    this.client
      .setEndpoint(config.appWriteEndPoint)
      .setProject(config.projectId);

      this.databases=new Databases(this.client)
  }
  async createUser({userId,email,likedPost}){
   try {
    return await this.databases.createDocument(config.databaseId,config.userCollectionId,userId,{userId,email,likedPost},[
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        Permission.update(Role.user(userId)),  // the creator
        Permission.delete(Role.user(userId)),
      ])
   } catch (error) {
    console.log("appwrite error user creation",error.message)
   }
 }
 async getUser(userId){
    try{
    return await this.databases.getDocument(config.databaseId,config.userCollectionId,userId)
    }catch(error){
        console.log("appwrite error getting error",error.message)
    }
 }
 async updateUser({userId,likedPost}){
    try {
        return await this.databases.updateDocument(config.databaseId,config.userCollectionId,userId,{likedPost})
    } catch (error) {
        console.log("appwrite error updating user",error.message)
    }
 }
 async deleteUser(userId){
    try {
         this.databases.deleteDocument(config.databaseId,config.userCollectionId,userId)
         return true;
    } catch (error) {
        console.log("appwrite error deleting user",error.message)
        return false
    }
 }
}

const userDataService = new UserData();
export default userDataService;
