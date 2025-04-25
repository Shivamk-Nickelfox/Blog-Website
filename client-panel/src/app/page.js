"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase/config";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { stripHtml } from "string-strip-html";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(2);
  const router = useRouter();
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogquery = query(
        collection(db, "blogs"),
        orderBy("createdAt", "desc")
      );
      const blogSnapshot = await getDocs(blogquery);
      if (blogSnapshot.empty) {
        console.log("No blogs found");
        return;
      }
      const blogList = blogSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    };

    fetchBlogs();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 2);
  };
  const visibleBlogs = blogs.slice(0, visibleCount);

  return (
    <main style={{ maxWidth: "1024px", margin: "0 auto", padding: "1rem" }}>
      <motion.div
        animate={{
          x: [0, 10, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          align="center"
          sx={{
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Blogs
        </Typography>
      </motion.div>
      {blogs.length === 0 ? (
        <Typography>Loading blogs...</Typography>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center",
            borderRadius: "12px",
          }}
        >
          {visibleBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Card
                key={blog.id}
                onClick={() => router.push(`/blog/${blog.id}`)}
                elevation={3}
                style={{
                  width: "300px",
                  cursor: "pointer",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                {blog.thumbnailURL && (
                  <img
                    src={blog.thumbnailURL}
                    alt="Blog Thumbnail"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    gutterBottom
                    style={{ color: "#333" }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stripHtml(blog?.content || "").result.slice(0, 100) +
                      "..."}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {visibleCount < blogs.length && (
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button
            onClick={handleLoadMore}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "6px",
              backgroundColor: "#654321",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}
