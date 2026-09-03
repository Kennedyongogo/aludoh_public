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
import { useNavigate, useOutletContext } from "react-router-dom";
import { apiGet, mediaUrl } from "../utils/api";
import { fallbackServices } from "../data/siteContent";

const heroImages = [
  "/images/bi1.jpg",
  "/images/bi 2.jpg",
  "/images/bi 3.jpg",
];

export default function Home() {
  const navigate = useNavigate();
  const { services = [] } = useOutletContext() || {};
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const displayServices = services.length ? services : fallbackServices;

  useEffect(() => {
    heroImages.forEach((src) => {
      const image = new Image();
      image.src = encodeURI(src);
    });
    const timer = setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroImages.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    apiGet("/api/projects?featured=true&limit=3")
      .then((res) => setProjects(res.data || []))
      .catch(() => setProjects([]));
    apiGet("/api/testimonials?status=approved&limit=3")
      .then((res) => setTestimonials(res.data || []))
      .catch(() => setTestimonials([]));
  }, []);

  return (
    <Box>
      <Helmet>
        <title>Mcaludoh Consultancy | Growing Smarter</title>
      </Helmet>
      <Box
        sx={{
          position: "relative",
          height: "100dvh",
          maxHeight: "100dvh",
          overflow: "hidden",
          color: "white",
        }}
      >
        {heroImages.map((src, index) => (
          <Box
            key={src}
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${encodeURI(src)})`,
              backgroundSize: "cover",
              backgroundPosition: { xs: "center 20%", md: "center center" },
              backgroundRepeat: "no-repeat",
              opacity: heroIndex === index ? 1 : 0,
              transition: "opacity 1.2s ease-in-out",
              zIndex: 0,
            }}
          />
        ))}

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            backgroundColor: "#C4A35A",
            clipPath: {
              xs: "polygon(0 calc(40% + 100vw), 100% 40%, 100% 100%, 0 100%)",
              md: "polygon(0 0, calc(38% + 50dvh + 7px) 0, calc(38% - 50dvh + 7px) 100%, 0 100%)",
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background:
              "linear-gradient(160deg, #1B4332 0%, #2D6A4F 58%, #245C43 100%)",
            clipPath: {
              xs: "polygon(0 calc(40% + 100vw + 8px), 100% calc(40% + 8px), 100% 100%, 0 100%)",
              md: "polygon(0 0, calc(38% + 50dvh) 0, calc(38% - 50dvh) 100%, 0 100%)",
            },
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 3,
            height: "100%",
            display: "flex",
            alignItems: { xs: "flex-end", md: "center" },
            pl: { xs: 1.5, md: 2, xl: 3 },
            pr: { xs: 2, md: 0 },
            pb: { xs: 2.5, md: 0 },
            pt: { xs: 0, md: 7 },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "46%", lg: "42%" },
              maxWidth: { md: 560 },
            }}
          >
            <Typography
              component="h1"
              sx={{
                mb: { xs: 1.1, sm: 1.75 },
                fontWeight: 700,
                lineHeight: 1.15,
                fontSize: {
                  xs: "1.45rem",
                  sm: "1.9rem",
                  md: "2.35rem",
                  lg: "2.85rem",
                },
              }}
            >
              Growing Smarter. Farming Sustainably. Building Better.
            </Typography>
            <Typography
              sx={{
                mb: { xs: 2, sm: 2.5, md: 3.5 },
                opacity: 0.92,
                lineHeight: 1.5,
                fontSize: {
                  xs: "0.88rem",
                  sm: "1rem",
                  md: "1.08rem",
                },
              }}
            >
              Professional solutions in hydroponics, vertical farming, organic
              agriculture, agronomy, landscaping, training and environmental
              services.
            </Typography>
            <Box sx={{ display: "flex", gap: { xs: 1.25, sm: 2 }, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                onClick={() => navigate("/request-service")}
                sx={{
                  backgroundColor: "#C4A35A",
                  color: "#1B2A22",
                  px: { xs: 2, sm: 3 },
                  py: { xs: 0.9, sm: 1.2 },
                  fontSize: { xs: "0.85rem", sm: "0.95rem" },
                }}
              >
                Request a Service
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/services")}
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: { xs: 2, sm: 3 },
                  py: { xs: 0.9, sm: 1.2 },
                  fontSize: { xs: "0.85rem", sm: "0.95rem" },
                }}
              >
                Explore Our Services
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Container sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          What we do
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Practical agricultural and environmental expertise for farms,
          businesses and institutions.
        </Typography>
        <Grid container spacing={3}>
          {displayServices.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.slug || service.name}>
              <Card
                sx={{ height: "100%", cursor: "pointer" }}
                onClick={() => navigate(`/services/${service.slug}`)}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {service.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {service.short_description || service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {projects.length > 0 && (
        <Box sx={{ py: 8, backgroundColor: "white" }}>
          <Container>
            <Typography variant="h4" sx={{ mb: 4 }}>
              Featured projects
            </Typography>
            <Grid container spacing={3}>
              {projects.map((project) => (
                <Grid item xs={12} md={4} key={project.id}>
                  <Card
                    sx={{ cursor: "pointer" }}
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
                        {project.location}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      <Box sx={{ py: 8, backgroundColor: "white" }}>
        <Container>
          <Grid container spacing={3}>
            {[
              ["Training catalogue", "See upcoming courses and register.", "/training"],
              ["Knowledge Centre", "Practical farming articles and guides.", "/blog"],
              ["Gallery", "Photos from farms, landscapes and training.", "/gallery"],
              ["Testimonials", "What clients say about our work.", "/testimonials"],
            ].map(([title, text, path]) => (
              <Grid item xs={12} sm={6} md={3} key={path}>
                <Card sx={{ height: "100%", cursor: "pointer" }} onClick={() => navigate(path)}>
                  <CardContent>
                    <Typography variant="h6">{title}</Typography>
                    <Typography color="text.secondary">{text}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {testimonials.length > 0 && (
        <Container sx={{ py: 8 }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            What clients say
          </Typography>
          <Grid container spacing={3}>
            {testimonials.map((item) => (
              <Grid item xs={12} md={4} key={item.id}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography sx={{ mb: 2 }}>"{item.content}"</Typography>
                    <Typography fontWeight={700}>{item.client_name}</Typography>
                    <Typography color="text.secondary">
                      {item.organization}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </Box>
  );
}
