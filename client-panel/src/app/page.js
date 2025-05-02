"use client";
import { useEffect, useState } from "react";
import { useThemeMode } from "./providers";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase/config";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { stripHtml } from "string-strip-html";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Footer from "./Footer";
import { width } from "@mui/system";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
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
    setVisibleCount((prevCount) => prevCount + 4);
  };
  const { darkMode, setDarkMode } = useThemeMode();

  const visibleBlogs = blogs.slice(0, visibleCount);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div
        style={{ cursor: "pointer", width: "20px", marginRight: "10px", padding: "10px 10px" }}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
      </div>
      <main style={{ maxWidth: "100%", margin: "0 auto", padding: "2rem" }}>
        <Typography
          variant="h3"
          fontWeight="500"
          fontFamily={"birthstone"}
          gutterBottom
          align="center"
          sx={{ fontFamily: "Poppins, sans-serif" }}
        >
          Blogs
        </Typography>

        {blogs.length === 0 ? (
          <Typography>Loading blogs...</Typography>
        ) : (
          <>
            {Array.from({ length: Math.ceil(visibleBlogs.length / 4) }).map(
              (_, rowIndex) => {
                const rowBlogs = visibleBlogs.slice(
                  rowIndex * 4,
                  rowIndex * 4 + 4
                );
                return (
                  <div
                    key={rowIndex}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: "24px",
                      marginBottom: "24px",
                    }}
                  >
                    {rowBlogs.map((blog) => (
                      <motion.div
                        key={blog.id}
                        style={{
                          flex: "1 1 calc(25% - 24px)",
                          minWidth: "250px",
                          maxWidth: "300px",
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card
                          onClick={() =>
                            router.push(
                              `/blog/${encodeURIComponent(blog.title)}`
                            )
                          }
                          elevation={3}
                          style={{
                            width: "100%",
                            minHeight: "100%",
                            cursor: "pointer",
                            borderRadius: "12px",
                            overflow: "hidden",
                            padding: "0.5rem",
                            display: "flex",
                            flexDirection: "column",
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
                                borderRadius: "8px",
                              }}
                            />
                          )}
                          <CardContent style={{ flexGrow: 1 }}>
                            <Typography
                              variant="subtitle1"
                              fontWeight="600"
                              gutterBottom
                              style={{ color: "#333" }}
                            >
                              {blog.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {stripHtml(blog?.content || "").result.slice(
                                0,
                                100
                              ) + "..."}
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                );
              }
            )}
          </>
        )}

        {visibleCount < blogs.length && (
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <button
              onClick={handleLoadMore}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "6px",
                backgroundColor: "darkred",
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

        {/* Inline responsive styles */}
        <style jsx>{`
          @media (max-width: 1024px) {
            div[style*="display: flex"] > div {
              flex: 1 1 calc(50% - 24px) !important;
            }
          }
          @media (max-width: 600px) {
            div[style*="display: flex"] > div {
              flex: 1 1 100% !important;
            }
          }
        `}</style>
      </main>
      <footer className="footer" style={{ marginTop: "auto" }}>
        <Footer />
      </footer>
    </div>
  );
}
