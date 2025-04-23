// File: src/Pages/Blog/Model/BlogModel.js
import { db } from "../../../Firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const createBlog = async (title,content,user) => {
    return await addDoc(collection(db, "blogs"), {  
        title,
        content,
        authorId: user.uid,
        createdAt: Timestamp.now(),
        authorEmail: user.email,
    });     
}