import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

import { Typography, TextField, Button, Box } from "@mui/material";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../Firebase/config";
import { publishBlog } from "../Controller/BlogController";
import BlogToolbar from "./BlogToolbar";

const Blog = () => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState(null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: " ",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  const handlePublish = async () => {
    if (!user) {
      console.error("User not authenticated");
      return <Typography>please login to add a blog</Typography>;
    }

    const content = editor.getHTML();

    try {
      await publishBlog(title, content, user, thumbnailURL);
      console.log("Blog published successfully");
      alert("Blog published successfully");
      setTitle("");
      editor.commands.clearContent();
      setThumbnailURL(null);
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <Box
      p={3}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add Blog
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          borderRadius: 2,
        }}
      />
      <TextField
        label="Thumbnail URL"
        variant="outlined"
        fullWidth
        margin="normal"
        value={thumbnailURL}
        onChange={(e) => setThumbnailURL(e.target.value)}
        sx={{
          borderRadius: 2,
          marginBottom: 3,
        }}
      />
      {thumbnailURL && (
        <Box mt={1}>
          <img
            src={thumbnailURL}
            alt="Thumbnail Preview"
            style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
          />
        </Box>
      )}

      <Box
        border={1}
        p={2}
        sx={{ minHeight: 200, mb: 2, borderRadius: 2, alignItems: "center" }}
      >
        <BlogToolbar editor={editor} />
        <EditorContent editor={editor} />
      </Box>
      <Button variant="contained" color="primary" onClick={handlePublish}>
        PublishDocs
      </Button>
    </Box>
  );
};
export default Blog;
