import React from "react";
import { IconButton, Box } from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
} from "@mui/icons-material";
import ImageIcon from "@mui/icons-material/Image";
import { useRef } from "react";

const BlogToolbar = ({ editor }) => {
  const fileInputRef = useRef(null);
  if (!editor) {
    return null;
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        editor.chain().focus().setImage({ src: base64 }).run();
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <IconButton onClick={() => editor.chain().focus().toggleBold().run()}>
        <FormatBold />
      </IconButton>
      <IconButton onClick={() => editor.chain().focus().toggleItalic().run()}>
        <FormatItalic />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <FormatUnderlined />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <FormatAlignLeft />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <FormatAlignCenter />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <FormatAlignRight />
      </IconButton>
      <IconButton onClick={handleImageButtonClick}>
        <ImageIcon />
      </IconButton>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
    </Box>
  );
};
export default BlogToolbar;
