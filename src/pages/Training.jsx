import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { apiGet, mediaUrl } from "../utils/api";
import { fallbackCourses } from "../data/siteContent";

const sessionMeta = (course) => {
  const session = course.sessions?.[0];
  if (!session) {
    return {
      duration: course.duration,
      mode: course.mode,
      location: course.location,
      fee: course.fee,
    };
  }
  const start = session.start_date ? new Date(session.start_date) : null;
  const end = session.end_date ? new Date(session.end_date) : null;
  const days =
    start && end
      ? Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1)
      : null;
  return {
    duration: days ? `${days} Day${days > 1 ? "s" : ""}` : course.duration,
    mode: session.location?.toLowerCase().includes("online")
      ? "Online"
      : session.location
        ? "Physical"
        : course.mode,
    location: session.location || course.location,
    fee: session.fee ? `KES ${session.fee}` : course.fee,
  };
};

export default function Training() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    apiGet("/api/training-courses?status=active&limit=24")
      .then((res) => setCourses(res.data?.length ? res.data : fallbackCourses))
      .catch(() => setCourses(fallbackCourses));
  }, []);

  return (
    <Box sx={{ py: 8 }}>
      <Helmet>
        <title>Training | Mcaludoh Consultancy</title>
      </Helmet>
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Training
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 5 }}>
          Browse the catalogue and register for upcoming courses. Practical
          training for farmers, students, institutions and organizations.
        </Typography>
        <Grid container spacing={3}>
          {courses.map((course) => {
            const meta = sessionMeta(course);
            return (
              <Grid item xs={12} md={4} key={course.id || course.slug}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  {course.image && (
                    <Box
                      component="img"
                      src={mediaUrl(course.image)}
                      alt={course.name}
                      sx={{ width: "100%", height: 180, objectFit: "cover" }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {course.name}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      {course.short_description}
                    </Typography>
                    {meta.duration && (
                      <Typography variant="body2">Duration: {meta.duration}</Typography>
                    )}
                    {meta.mode && (
                      <Typography variant="body2">Mode: {meta.mode}</Typography>
                    )}
                    {meta.location && (
                      <Typography variant="body2">Location: {meta.location}</Typography>
                    )}
                    {meta.fee && (
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Fee: {meta.fee}
                      </Typography>
                    )}
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={() => navigate(`/training/${course.slug}`)}
                      >
                        View Course
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/training/${course.slug}`)}
                      >
                        Register
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
