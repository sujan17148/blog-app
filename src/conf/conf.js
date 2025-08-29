const config={
    appWriteEndPoint:String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    projectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId:String(import.meta.env.VITE_DATABASE_ID),
    articleCollectionId:String(import.meta.env.VITE_ARTICLE_COLLECTION_ID),
    articleStatsCollectionId:String(import.meta.env.VITE_APPWRITE_ARTICLESTATS_COLLECTION_ID),
    userCollectionId:String(import.meta.env.VITE_USERS_COLLECTION_ID),
    bucketId:String(import.meta.env.VITE_BUCKET_ID),
    tinymceEditorApiKey:String(import.meta.env.VITE_TINYMCE_API_KEY)
}
export default config