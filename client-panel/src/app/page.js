"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogSnapshot = await getDocs(collection(db, "blogs"));
      const blogList = blogSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    };

    fetchBlogs();
  }, []);

  return (
    <main style={{ maxWidth: "768px", margin: "0 auto", padding: "1rem" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Blogs
      </Typography>
      {blogs.length === 0 ? (
        <Typography>Loading blogs...</Typography>
      ) : (
        blogs.map((blog) => (
          <Card
            key={blog.id}
            style={{ marginBottom: "1rem", cursor: "pointer" }}
            onClick={() => router.push(`/blog/${blog.id}`)}
            elevation={3}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                {blog.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                dangerouslySetInnerHTML={{
                  __html: blog.content.slice(0, 100) + "...",
                }}
              />
            </CardContent>
          </Card>
        ))
      )}
    </main>
  );
}
