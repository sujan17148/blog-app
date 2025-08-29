import config from "../conf/conf";
import { Client,ID,Databases,Storage,Permission,Role} from "appwrite";
import authService from "./auth"

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
  async createPost({title,content,tags,status,userId,date,author,id,isFeatured}){
      try{
        return await this.databases.createDocument(config.databaseId,config.articleCollectionId,id,{title,content,status,userId,tags,date,author,isFeatured},[
          Permission.read(Role.any()),
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
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
  async editPost(postId,{title,content,status,tags,userId,date,author,isFeatured}){
        try{
          const currentUser = await authService.getCurrentUser();
          if(currentUser.$id!==userId) throw new Error("Unauthorized: Only the author can edit this post")
            return await this.databases.updateDocument(config.databaseId,config.articleCollectionId,postId,{title,content,status,tags,userId,date,author,isFeatured})
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

  //post stats related services
  async createPostStats({id,views=0,likes=0}){
    try{
      return await this.databases.createDocument(config.databaseId,config.articleStatsCollectionId,id,{views,likes},[
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        
      ])
    }catch(error){
      console.log("appwrite database createDocument error",error)
    }
  }
  async getAllPostStats(){
    try {
      return this.databases.listDocuments(config.databaseId,config.articleStatsCollectionId)
  } catch (error) {
      console.log("appwrite database getAllDocument error",error)
      return false
  }
  }
  async deletePostStats(postId){
    try {
       this.databases.deleteDocument(config.databaseId,config.articleStatsCollectionId,postId)
       return true
    } catch (error) {
        console.log("appwrite database deletedocument error",error)
        return false
    }
  }
  async toggleLikes({$id,likes}){
    try{
      return await this.databases.updateDocument(config.databaseId,config.articleStatsCollectionId,$id,{likes})
    }catch(error){
      console.log("appwrite database updateDocument error",error)
    }
  }
  async increaseViews({$id,views}){
    try{
      return await this.databases.updateDocument(config.databaseId,config.articleStatsCollectionId,$id,{views})
    }catch(error){
      console.log("appwrite database updateDocument error",error)
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
        console.log("appwrite file delete error",error.message)
        return false
    }
  }

   getFileView(fileId){
    try {
        return  this.bucket.getFileView(config.bucketId,fileId)
    } catch (error) {
        console.log("appwrite file preview error",error.message)
    }
  }
}

const databaseService=new Service()
export default databaseService