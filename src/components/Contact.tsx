import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import PageTitle from "./utils/PageTitle";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <PageTitle title="Kontakta" icon={<MailOutlineIcon />} />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
            style={{ backgroundColor: "white" }}
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            type="email"
            style={{ backgroundColor: "white" }}
          />
          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
            style={{ backgroundColor: "white" }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            style={{ backgroundColor: "white" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}
