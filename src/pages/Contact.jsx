import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import { apiPost } from "../utils/api";
import { showError, showSuccess } from "../utils/swal";

export default function Contact() {
  const { settings } = useOutletContext() || {};
  const phone = settings?.phone || "+254 700 000000";
  const email = settings?.email || "info@mcaludoh.co.ke";
  const whatsapp = settings?.whatsapp || phone;
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    preferred_contact: "Phone",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await apiPost("/api/contact-messages", {
        name: form.name,
        phone: form.phone,
        email: form.email,
        subject: form.subject,
        message: `${form.message}\n\nPreferred contact method: ${form.preferred_contact}`,
      });
      showSuccess("Message sent. We will get back to you shortly.");
      setForm({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
        preferred_contact: "Phone",
      });
    } catch (error) {
      showError(error.message);
    }
  };

  const change = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const digits = (value) => String(value || "").replace(/\D/g, "");

  return (
    <Box sx={{ py: 8 }}>
      <Helmet>
        <title>Contact | Mcaludoh Consultancy</title>
      </Helmet>
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Contact
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Call, email or send a message. You can also reach us on WhatsApp.
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={5}>
            <Typography fontWeight={700}>Phone</Typography>
            <Typography sx={{ mb: 2 }}>{phone}</Typography>
            <Typography fontWeight={700}>Email</Typography>
            <Typography sx={{ mb: 2 }}>{email}</Typography>
            <Typography fontWeight={700}>Address</Typography>
            <Typography sx={{ mb: 3 }}>
              {settings?.address || "Nairobi, Kenya"}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button href={`tel:${digits(phone)}`} variant="contained">
                Call Us
              </Button>
              <Button href={`mailto:${email}`} variant="outlined">
                Email Us
              </Button>
              <Button
                href={`https://wa.me/${digits(whatsapp)}`}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
              >
                WhatsApp Us
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box component="form" onSubmit={submit}>
              <TextField required fullWidth label="Name" sx={{ mb: 2 }} value={form.name} onChange={change("name")} />
              <TextField required fullWidth label="Phone" sx={{ mb: 2 }} value={form.phone} onChange={change("phone")} />
              <TextField required fullWidth type="email" label="Email" sx={{ mb: 2 }} value={form.email} onChange={change("email")} />
              <TextField fullWidth label="Subject" sx={{ mb: 2 }} value={form.subject} onChange={change("subject")} />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Preferred contact method</InputLabel>
                <Select
                  label="Preferred contact method"
                  value={form.preferred_contact}
                  onChange={change("preferred_contact")}
                >
                  <MenuItem value="Phone">Phone</MenuItem>
                  <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                </Select>
              </FormControl>
              <TextField
                required
                fullWidth
                multiline
                rows={5}
                label="Message"
                sx={{ mb: 2 }}
                value={form.message}
                onChange={change("message")}
              />
              <Button type="submit" variant="contained">
                Send Message
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
