import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../Firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { TextField, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import ImageIcon from "@mui/icons-material/Image";
import IconButton from "@mui/material/IconButton";

const EditBlog = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = React.useRef(null);

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
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;

        // Check if there's already an image in the content
        const hasImage = /<img[^>]*src="([^"]+)"[^>]*>/.test(post.content);

        let updatedContent;
        if (hasImage) {
          // If there's an image, replace the first one
          updatedContent = post.content.replace(
            /<img[^>]+src="([^"]+)"[^>]*>/, // Match the first image
            `<img src="${base64}" style="max-width: 120px; max-height: 120px; width: auto; height: auto; border-radius: 50%;" />` // Replace with new image base64
          );
        } else {
          // If no image exists, add the new image to the content at the beginning or wherever you prefer
          updatedContent =
            post.content +
            `<img src="${base64}" style="max-width: 120px; max-height: 120px; width: auto; height: auto; border-radius: 50%;" />`; // Append at the end
        }

        setPost((prevPost) => ({ ...prevPost, content: updatedContent }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = async () => {
    try {
      const docRef = doc(db, "blogs", postId);
      await updateDoc(docRef, {
        title: post.title,
        content: post.content,
      });
      toast.success("Post updated successfully!");
      navigate("/Posts");
    } catch (error) {
      console.error("Error updating post: ", error);
      toast.error("Error updating the post");
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
      <IconButton onClick={() => fileInputRef.current.click()}>
        <ImageIcon />
      </IconButton>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  );
};

export default EditBlog;
