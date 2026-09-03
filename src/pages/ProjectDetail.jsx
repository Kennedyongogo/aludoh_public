import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { apiGet, mediaUrl } from "../utils/api";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet(`/api/projects/${slug}`)
      .then((res) => setProject(res.data))
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!project) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography>Project not found.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <Helmet>
        <title>{project.name} | Projects</title>
      </Helmet>
      <Container>
        <Typography variant="h3" sx={{ mb: 1 }}>
          {project.name}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          {[
            project.service?.name,
            project.client?.name,
            project.location,
            project.completed_at
              ? new Date(project.completed_at).toLocaleDateString()
              : project.createdAt
                ? new Date(project.createdAt).toLocaleDateString()
                : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </Typography>
        <Typography sx={{ mb: 4, whiteSpace: "pre-wrap" }}>
          {project.description}
        </Typography>
        {project.challenges && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">Challenges</Typography>
            <Typography sx={{ whiteSpace: "pre-wrap" }}>{project.challenges}</Typography>
          </Box>
        )}
        {project.solution && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">Solution</Typography>
            <Typography sx={{ whiteSpace: "pre-wrap" }}>{project.solution}</Typography>
          </Box>
        )}
        {project.results && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">Results</Typography>
            <Typography sx={{ whiteSpace: "pre-wrap" }}>{project.results}</Typography>
          </Box>
        )}
        <Grid container spacing={2}>
          {(project.images || []).map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <Box
                component="img"
                src={mediaUrl(image.image_url)}
                alt={image.caption || project.name}
                sx={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
