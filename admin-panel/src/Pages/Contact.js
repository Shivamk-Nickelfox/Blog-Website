import React from "react";
import { Box, Typography, Paper, Avatar, Stack, Divider } from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

const Contact = () => {
  return (
    <Box p={3}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: 600,
          mx: "auto",
          borderRadius: 4,
          bgcolor: "background.default",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <ContactPhoneIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            Contact Information
          </Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            Address:
          </Typography>
          <Typography variant="body1">
            123, Shiv Vihar Colony,
            <br />
            Kanpur, Uttar Pradesh - 208001
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            Contact Number:
          </Typography>
          <Typography variant="body1">+91 9876543210</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            About Shivam Rajput:
          </Typography>
          <Typography variant="body1">
            Shivam Rajput is a passionate developer with a love for building
            creative web apps. He enjoys exploring new technologies and solving
            real-world problems through code. His focus is on writing clean,
            maintainable code and continuously learning.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Contact;
