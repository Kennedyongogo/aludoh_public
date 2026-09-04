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
  "/images/b1.jpg",
  "/images/b2.jpg",
  "/images/b3.jpg",
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
              backgroundPosition: { xs: "center 70%", md: "center center" },
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
              xs: "polygon(0 0, 100% 0, 100% 54%, 0 66%)",
              md: "polygon(0 0, 66% 0, 36% 100%, 0 100%)",
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
              xs: "polygon(0 0, 100% 0, 100% 52%, 0 64%)",
              md: "polygon(0 0, 65% 0, 35% 100%, 0 100%)",
            },
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 3,
            height: "100%",
            display: "flex",
            alignItems: { xs: "flex-start", md: "center" },
            pl: { xs: 0, md: 2, xl: 3 },
            pr: { xs: 0, md: 0 },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "40%", lg: "38%" },
              maxWidth: { md: 520 },
              height: { xs: "58%", md: "auto" },
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", md: "flex-start" },
              boxSizing: "border-box",
              pt: { xs: "52px", md: 7 },
              px: { xs: 2, md: 0 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                component="h1"
                sx={{
                  mb: { xs: 1, sm: 1.5, md: 1.75 },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.7rem",
                    md: "2.15rem",
                    lg: "2.6rem",
                  },
                }}
              >
                <Box component="span" sx={{ display: "block", whiteSpace: "nowrap" }}>
                  Growing Smarter.
                </Box>
                <Box component="span" sx={{ display: "block", whiteSpace: "nowrap" }}>
                  Farming Sustainably.
                </Box>
                <Box component="span" sx={{ display: "block", whiteSpace: "nowrap" }}>
                  Building Better.
                </Box>
              </Typography>
              <Typography
                sx={{
                  mb: { xs: 1.75, sm: 2.25, md: 3.5 },
                  opacity: 0.92,
                  lineHeight: 1.45,
                  mx: { xs: "auto", md: 0 },
                  maxWidth: { xs: 420, md: "none" },
                  fontSize: {
                    xs: "0.84rem",
                    sm: "0.98rem",
                    md: "1.08rem",
                  },
                }}
              >
                Professional solutions in hydroponics, vertical farming, organic
                agriculture, agronomy, landscaping, training and environmental
                services.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 1.25, sm: 2 },
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Button
                  disableRipple
                  disableFocusRipple
                  onClick={() => navigate("/request-service")}
                  sx={{
                    backgroundColor: "#C4A35A",
                    color: "#1B2A22",
                    px: { xs: 2.25, sm: 3.25 },
                    py: { xs: 1, sm: 1.15 },
                    fontSize: { xs: "0.82rem", sm: "0.92rem" },
                    fontWeight: 700,
                    borderRadius: "999px",
                    boxShadow: "0 8px 20px rgba(196, 163, 90, 0.28)",
                    WebkitTapHighlightColor: "transparent",
                    "&:hover": {
                      backgroundColor: "#D4B56C",
                      boxShadow: "0 10px 24px rgba(196, 163, 90, 0.4)",
                    },
                    "&:active": {
                      backgroundColor: "#B39148",
                      boxShadow: "none",
                      transform: "translateY(1px)",
                    },
                    "&:focus, &:focus-visible": {
                      backgroundColor: "#C4A35A",
                      outline: "none",
                      boxShadow: "0 8px 20px rgba(196, 163, 90, 0.28)",
                    },
                  }}
                >
                  Request a Service
                </Button>
                <Button
                  disableRipple
                  disableFocusRipple
                  onClick={() => navigate("/services")}
                  sx={{
                    border: "1.5px solid rgba(255,255,255,0.85)",
                    color: "#FFFFFF",
                    backgroundColor: "transparent",
                    px: { xs: 2.25, sm: 3.25 },
                    py: { xs: 1, sm: 1.15 },
                    fontSize: { xs: "0.82rem", sm: "0.92rem" },
                    fontWeight: 700,
                    borderRadius: "999px",
                    WebkitTapHighlightColor: "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.14)",
                      borderColor: "#FFFFFF",
                      color: "#FFFFFF",
                    },
                    "&:active": {
                      backgroundColor: "rgba(255,255,255,0.22)",
                      transform: "translateY(1px)",
                    },
                    "&:focus, &:focus-visible": {
                      backgroundColor: "transparent",
                      outline: "none",
                      boxShadow: "none",
                    },
                  }}
                >
                  Explore Our Services
                </Button>
              </Box>
          </Box>
        </Box>
      </Box>
      </Box>

      <Box sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 6, md: 8 }, backgroundColor: "#F7F4EC" }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: { xs: 2.5, md: 3.5 }, maxWidth: 640, mx: "auto" }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              What we do
            </Typography>
            <Typography color="text.secondary">
              Practical agricultural and environmental expertise for farms,
              businesses and institutions.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(4, minmax(0, 1fr))",
              },
              gap: 2.5,
            }}
          >
            {displayServices.map((service, index) => (
              <Card
                key={service.slug || service.name}
                onClick={() => navigate(`/services/${service.slug}`)}
                sx={{
                  height: "100%",
                  minHeight: { md: 260 },
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  border: "1px solid rgba(45, 106, 79, 0.12)",
                  boxShadow: "none",
                  borderRadius: "18px",
                  transition:
                    "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: "#C4A35A",
                    boxShadow: "0 14px 32px rgba(27, 67, 50, 0.12)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 2.5,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#C4A35A",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                      letterSpacing: "0.12em",
                      mb: 1,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1.25,
                      minHeight: { xs: "auto", md: 56 },
                      lineHeight: 1.3,
                      fontSize: "1.05rem",
                    }}
                  >
                    {service.name}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      flex: 1,
                      fontSize: "0.9rem",
                      lineHeight: 1.55,
                      minHeight: { xs: "auto", md: 88 },
                    }}
                  >
                    {service.short_description || service.description}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2,
                      color: "primary.main",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                    }}
                  >
                    Learn more
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

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
