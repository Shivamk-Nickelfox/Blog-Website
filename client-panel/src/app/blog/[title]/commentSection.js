"use client";

import { TextField, Typography, Button, Card } from "@mui/material";
import emailjs from "@emailjs/browser";
import { useState, useEffect } from "react";
import { db } from "@/app/firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

export default function CommentSection({ blogTitle }) {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !name.trim()) return;

    await addDoc(collection(db, "comments"), {
      blogTitle,
      name,
      email,

      comment,
      createdAt: serverTimestamp(),
    });
    emailjs
      .send(
        "service_bswy0ge",
        "template_57r0e7g",
        {
          name: name,
          email: email,
        },
        "umJf_IjYrmXk2dBXI"
      )
      .then((err) => console.error("EmailJS Error:", err));
    setComment("");
    setName("");
    setEmail("");
    fetchComments();
  };

  const fetchComments = async () => {
    const q = query(
      collection(db, "comments"),
      where("blogTitle", "==", blogTitle),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((doc) => doc.data());
    setComments(results);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      {comments.length > 0 && (
        <Typography variant="h6" marginBottom={2} fontWeight={600}>
          Comments
        </Typography>
      )}
      {comments.map((c, i) => (
        <Card
          key={i}
          style={{
            marginBottom: "1rem",
            borderBottom: "1px solid #ccc",
            paddingBottom: "1rem",
          }}
        >
          <Typography variant="subtitle2" marginLeft={2}>
            {c.name} on {c.createdAt?.toDate().toLocaleString()}
          </Typography>
          <Typography marginLeft={2}>{c.comment}</Typography>
        </Card>
      ))}
      <Typography variant="h6" style={{ marginTop: "2rem", fontWeight: 600 }}>
        Leave a Comment
      </Typography>
      <TextField
        label="Your Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Your Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Add a Comment"
        fullWidth
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{ color: "white", marginTop: "1rem", backgroundColor: "black" }}
      >
        Submit
      </Button>
    </div>
  );
}
