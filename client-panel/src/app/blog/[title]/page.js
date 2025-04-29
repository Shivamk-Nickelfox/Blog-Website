import { Card, CardContent, TextField, Typography } from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import CommentSection from "./commentSection";
export default async function BlogDetail({ params }) {
  const { title } = params; // Fetch title from URL params

  // Query Firestore based on the title
  const blogQuery = query(
    collection(db, "blogs"),
    where("title", "==", decodeURIComponent(title))
  );

  const querySnapshot = await getDocs(blogQuery);

  if (querySnapshot.empty) {
    return <Typography>Blog not found</Typography>;
  }

  const blog = querySnapshot.docs[0].data(); // Get the first matching blog

  return (
    <main style={{ maxWidth: "768px", margin: "0 auto", padding: "1rem" }}>
      <div elevation={3}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {blog.title}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </CardContent>
      </div>
      <CommentSection blogTitle={blog.title} />
    </main>
  );
}
