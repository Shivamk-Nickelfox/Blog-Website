import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { db, auth } from "../../Firebase/config";

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import {
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon,
  FormatUnderlined as FormatUnderlinedIcon,
  FormatAlignLeft as FormatAlignLeftIcon,
  FormatAlignCenter as FormatAlignCenterIcon,
  FormatAlignRight as FormatAlignRightIcon,
} from "@mui/icons-material";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
  IconButton,
} from "@mui/material";

import {
  EditorContainer,
  TitleText,
  BlogTitleInput,
  ToolbarBox,
  EditorContentBox,
  PublishButton,
} from "./BlogStyles";

const Blog = () => {
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
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
      <EditorContainer>
        <Typography variant="h5">Please login to publish blogs</Typography>
      </EditorContainer>
    );
  }

  return (
    <EditorContainer>
      <TitleText variant="h4" gutterBottom>
        Add Blog
      </TitleText>

      <BlogTitleInput
        label="Blog Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {editor && (
        <ToolbarBox>
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
        </ToolbarBox>
      )}

      <EditorContentBox>
        <EditorContent editor={editor} />
      </EditorContentBox>

      <PublishButton
        variant="contained"
        color="primary"
        onClick={handlePublish}
      >
        Publish
      </PublishButton>
    </EditorContainer>
  );
};

export default Blog;
