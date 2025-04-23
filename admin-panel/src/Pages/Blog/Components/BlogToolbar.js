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

const BlogToolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <Box  sx={{mb:2}}>
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
    </Box>
  )
}
export default BlogToolbar;