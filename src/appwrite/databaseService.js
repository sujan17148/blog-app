import config from "../conf/conf";
import { Client,ID,Databases,Storage,Permission,Role} from "appwrite";

export class Service{
client=new Client()
databases;
bucket;

constructor() {
    this.client
      .setEndpoint(config.appWriteEndPoint)
      .setProject(config.projectId);
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
  }
      //post related services
  async createPost({title,content,image,tags,status,userId,date,author,id,isFeatured,views,likes}){
      try{
        return await this.databases.createDocument(config.databaseId,config.articleCollectionId,id,{title,content,image,status,userId,tags,date,author,isFeatured,views,likes},[
          Permission.read(Role.any()),
          Permission.update(Role.any()),
          Permission.update(Role.user(userId)),  // the creator
          Permission.delete(Role.user(userId)),
        ])
      }catch(error){
        console.log("appwrite database createDocument error",error)
      }
  }
  async getPost(postId){
    try {
        return this.databases.getDocument(config.databaseId,config.articleCollectionId,postId)
    } catch (error) {
        console.log("appwrite database get document error",error)
        return false
    }
  }
  async getAllPost(){
    try {
        return this.databases.listDocuments(config.databaseId,config.articleCollectionId)
    } catch (error) {
        console.log("appwrite database getAllDocument error",error)
        return false
    }
  }
  async editPost(postId,{title,content,image,status,tags,userId,date,author,isFeatured,views,likes}){
        try{
            return await this.databases.updateDocument(config.databaseId,config.articleCollectionId,postId,{title,content,image,status,tags,userId,date,author,isFeatured,views,likes})
          }catch(error){
            console.log("appwrite database updateDocument error",error)
          }
     }

  async deletePost(postId){
    try {
       this.databases.deleteDocument(config.databaseId,config.articleCollectionId,postId)
       return true
    } catch (error) {
        console.log("appwrite database deletedocument error",error)
        return false
    }
  }



  //file related service
  async uploadFile(fileId){
    try {
         return this.bucket.createFile(config.bucketId,ID.unique(),fileId)
    } catch (error) {
        console.log("appwrite upload file error",error)
    }
  }

  async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(config.bucketId,fileId)
        return true
    } catch (error) {
        console.log("appwrite file delete error")
        return false
    }
  }

   getFileView(fileId){
    try {
        return  this.bucket.getFileView(config.bucketId,fileId)
    } catch (error) {
        console.log("appwrite file preview error")
    }
  }
}

const databaseService=new Service()
export default databaseService