import React, { useEffect, useState } from "react";
import {
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Components/Pagination.css";
import AddIcon from "@mui/icons-material/Add";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/config";
import { RootBox, HeaderBox, AddButton, StyledTableHead } from "./PostsStyles";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [count, setCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user || !user.uid) return;
      try {
        const postsRef = collection(db, "blogs");
        const q = query(postsRef, where("authorId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        setCount(querySnapshot.docs.length);
        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          slug: generateSlug(doc.data().title),
        }));
        setPosts(blogs);

        console.log("Fetched posts: ", blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchPosts();
  }, []);
  console.log("Posts: ", posts);
  console.log("Count: ", count);
  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleAddClick = () => navigate("/Blog");

  const handleMenuOpen = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPostId(postId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPostId(null);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % count;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );

    setItemOffset(newOffset);
  };
  const currentItems = posts.slice(itemOffset, itemOffset + itemsPerPage);
  console.log("Current items: ", currentItems);
  const pageCount = Math.ceil(count / itemsPerPage);

  const handleEdit = () => {
    if (selectedPostId) {
      navigate(`/Posts/Edit/${selectedPostId}`);
    }
    handleMenuClose();
  };
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      setPosts(posts.filter((post) => post.id !== id));
      setCount((prev) => prev - 1);
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
    handleMenuClose();
  };

  return (
    <RootBox>
      <HeaderBox>
        <Typography variant="h6" fontWeight="bold">
          Posts
        </Typography>
        <AddButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add
        </AddButton>
      </HeaderBox>

      <TableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>Sr.</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {currentItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No posts available.
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((post, index) => (
                <TableRow key={post.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.slug}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuOpen(e, post.id)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedPostId === post.id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleEdit()}>Edit</MenuItem>
                      <MenuItem onClick={() => handleDelete(post.id)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ReactPaginate
        breakLabel={"..."}
        nextLabel={"next >"}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={"< previous"}
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        activeClassName={"active"}
        disabledClassName={"disabled"}
      />
    </RootBox>
  );
};

export default Posts;
