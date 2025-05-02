
import Image from "@tiptap/extension-image";
import { createRoot } from "react-dom/client";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const CustomImage = Image.extend({
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement("div");
      container.style.position = "relative";
      container.style.display = "inline-block";

      const img = document.createElement("img");
      img.src = node.attrs.src;
      img.style.maxWidth = "100%";
      img.style.borderRadius = "8px";

      const deleteButtonContainer = document.createElement("div");
      deleteButtonContainer.style.position = "absolute";
      deleteButtonContainer.style.top = "0px";
      deleteButtonContainer.style.right = "0px";
      
      const root = createRoot(deleteButtonContainer);
      root.render(
        <IconButton
          size="small"
          sx={{
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
            width: 24,
            height: 24,
          }}
          onClick={() => {
            editor.chain().focus().deleteRange({ from: getPos(), to: getPos() + node.nodeSize }).run();
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      );

      container.appendChild(img);
      container.appendChild(deleteButtonContainer);

      return {
        dom: container,
      };
    };
  },
});

export default CustomImage;
