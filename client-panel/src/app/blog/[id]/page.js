import { Card, CardContent, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default async function BlogDetail({ params }) {
  const { id } = params;

  const docRef = doc(db, "blogs", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return <Typography>Blog not found</Typography>;
  }

  const blog = docSnap.data();

  return (
    <main style={{ maxWidth: "768px", margin: "0 auto", padding: "1rem" }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {blog.title}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </CardContent>
      </Card>
    </main>
  );
}
