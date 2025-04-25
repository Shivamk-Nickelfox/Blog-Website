import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../Firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { TextField, Button, Typography } from "@mui/material";

const EditBlog = () => {
  const { postId } = useParams(); 
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "blogs", postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          setError("Post not found");
        }
      } catch (error) {
        setError("Error fetching the post.");
      }
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, "blogs", postId);
      await updateDoc(docRef, {
        title: post.title,
        content: post.content,
      });
      alert("Post updated successfully!");
      navigate("/Posts");
    } catch (error) {
      console.error("Error updating post: ", error);
      alert("Error updating the post");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h3" alignItems={"center"}>
        Edit Post
      </Typography>
      <TextField
        label="Title"
        name="title"
        value={post.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
        name="content"
        value={post.content}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={6}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  );
};

export default EditBlog;
