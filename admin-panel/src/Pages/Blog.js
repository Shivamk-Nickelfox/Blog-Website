import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { db, auth } from "../Firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "<p>Start writing your blog...</p>",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handlePublish = async () => {
    if (!title || !editor?.getHTML()) {
      alert("Title and content are required!");
      return;
    }

    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content: editor.getHTML(),
        createdAt: Timestamp.now(),
        authorId: user.uid,
        authorEmail: user.email,
      });
      alert("Blog published!");
      setTitle("");
      editor.commands.clearContent();
    } catch (error) {
      console.error("Error publishing blog: ", error);
      alert("Something went wrong!");
    }
  };

  if (!user) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 10, textAlign: "center" }}>
        <Typography variant="h5">Please login to publish blogs</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Create Blog
      </Typography>

      <TextField
        label="Blog Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      {editor && (
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <IconButton onClick={() => editor.chain().focus().toggleBold().run()}>
            <FormatBoldIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <FormatItalicIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <FormatUnderlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <FormatAlignLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <FormatAlignCenterIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <FormatAlignRightIcon />
          </IconButton>
        </Box>
      )}

      <EditorContent
        editor={editor}
        style={{
          border: "1px solid #ccc",
          borderRadius: 4,
          minHeight: "300px",
          padding: 16,
          marginBottom: 20,
        }}
      />

      <Button variant="contained" color="primary" onClick={handlePublish}>
        Publish
      </Button>
    </Box>
  );
};

export default BlogEditor;
