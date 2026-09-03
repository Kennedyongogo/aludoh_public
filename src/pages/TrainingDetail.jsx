import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { apiGet, apiPost } from "../utils/api";
import { showError, showSuccess } from "../utils/swal";
import { fallbackCourses } from "../data/siteContent";

export default function TrainingDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    organization: "",
    session_id: "",
    preferred_date: "",
  });

  useEffect(() => {
    setLoading(true);
    apiGet(`/api/training-courses/${slug}`)
      .then((res) => {
        setCourse(res.data);
        const firstSession = res.data?.sessions?.[0];
        if (firstSession) {
          setForm((prev) => ({ ...prev, session_id: firstSession.id }));
        }
      })
      .catch(() => {
        const fallback = fallbackCourses.find((item) => item.slug === slug);
        setCourse(fallback || null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (form.session_id) {
        await apiPost("/api/training-registrations", {
          name: form.name,
          phone: form.phone,
          email: form.email,
          organization: form.organization,
          session_id: form.session_id,
        });
      } else {
        await apiPost("/api/contact-messages", {
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: `Training registration: ${course.name}`,
          message: [
            `Course: ${course.name}`,
            form.preferred_date && `Preferred date: ${form.preferred_date}`,
            form.organization && `Organization: ${form.organization}`,
          ]
            .filter(Boolean)
            .join("\n"),
        });
      }
      showSuccess("Registration received. We will contact you shortly.");
      setForm({
        name: "",
        phone: "",
        email: "",
        organization: "",
        session_id: form.session_id,
        preferred_date: "",
      });
    } catch (error) {
      showError(error.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography>Course not found.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <Helmet>
        <title>{course.name} | Training</title>
      </Helmet>
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          {course.name}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {[
            course.duration,
            course.mode,
            course.location,
            course.fee,
          ]
            .filter(Boolean)
            .join(" · ")}
        </Typography>
        <Typography sx={{ mb: 4, whiteSpace: "pre-wrap" }}>
          {course.description || course.short_description}
        </Typography>

        {(course.sessions || []).length > 0 && (
          <>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Upcoming sessions
            </Typography>
            <Grid container spacing={2} sx={{ mb: 5 }}>
              {course.sessions.map((session) => (
                <Grid item xs={12} md={4} key={session.id}>
                  <Card
                    sx={{
                      border:
                        form.session_id === session.id
                          ? "2px solid #2D6A4F"
                          : "1px solid #eee",
                      cursor: "pointer",
                    }}
                    onClick={() => setForm({ ...form, session_id: session.id })}
                  >
                    <CardContent>
                      <Typography fontWeight={700}>{session.location}</Typography>
                      <Typography color="text.secondary">
                        {new Date(session.start_date).toLocaleDateString()} –{" "}
                        {new Date(session.end_date).toLocaleDateString()}
                      </Typography>
                      {session.fee && <Typography>Fee: KES {session.fee}</Typography>}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Typography variant="h5" sx={{ mb: 2 }}>
          Register
        </Typography>
        <Box component="form" onSubmit={submit} sx={{ maxWidth: 560 }}>
          <TextField
            required
            fullWidth
            label="Full Name"
            sx={{ mb: 2 }}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            required
            fullWidth
            label="Phone"
            sx={{ mb: 2 }}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            sx={{ mb: 2 }}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            fullWidth
            label="Organization"
            sx={{ mb: 2 }}
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
          />
          {!form.session_id && (
            <TextField
              fullWidth
              label="Preferred Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
              value={form.preferred_date}
              onChange={(e) =>
                setForm({ ...form, preferred_date: e.target.value })
              }
            />
          )}
          <Button type="submit" variant="contained">
            Register
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
