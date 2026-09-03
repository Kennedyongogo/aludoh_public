import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { apiGet, mediaUrl } from "../utils/api";

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    apiGet("/api/projects?limit=24")
      .then((res) => setProjects(res.data || []))
      .catch(() => setProjects([]));
  }, []);

  return (
    <Box sx={{ py: 8 }}>
      <Helmet>
        <title>Projects | Mcaludoh Consultancy</title>
      </Helmet>
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Projects
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 5 }}>
          Completed and ongoing work across hydroponics, landscaping, training
          and farm development.
        </Typography>
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} md={4} key={project.id}>
              <Card
                sx={{ cursor: "pointer", height: "100%" }}
                onClick={() => navigate(`/projects/${project.slug}`)}
              >
                {project.images?.[0]?.image_url && (
                  <Box
                    component="img"
                    src={mediaUrl(project.images[0].image_url)}
                    alt={project.name}
                    sx={{ width: "100%", height: 200, objectFit: "cover" }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{project.name}</Typography>
                  <Typography color="text.secondary">
                    {project.location} · {project.service?.name || project.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {!projects.length && (
            <Typography>Projects will appear here once published.</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
