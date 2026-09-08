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
import {
  SchoolOutlined,
  MenuBookOutlined,
  PhotoLibraryOutlined,
  FormatQuoteOutlined,
  ArrowForwardRounded,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import { apiGet, mediaUrl } from "../utils/api";
import { fallbackServices } from "../data/siteContent";
import HeroServiceAnimations from "../components/HeroServiceAnimations";
import HeroTreeDivider from "../components/HeroTreeDivider";

const heroImages = [
  "/images/b1.jpg",
  "/images/b2.jpg",
  "/images/b3.jpg",
];

const heroBtnBase = {
  px: { xs: 1.2, sm: 3.4 },
  py: 0,
  minHeight: { xs: 38, sm: 48 },
  fontSize: { xs: "0.7rem", sm: "0.94rem" },
  fontWeight: 700,
  letterSpacing: { xs: 0, sm: "0.01em" },
  lineHeight: 1,
  borderRadius: "999px",
  outline: "none",
  position: "relative",
  overflow: "hidden",
  flex: { xs: "1 1 0", md: "0 0 auto" },
  minWidth: 0,
  whiteSpace: "nowrap",
  backdropFilter: "blur(16px) saturate(1.35)",
  WebkitBackdropFilter: "blur(16px) saturate(1.35)",
  WebkitTapHighlightColor: "transparent",
  transition:
    "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), background 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, color 0.22s ease",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    background:
      "linear-gradient(180deg, rgba(216, 243, 220, 0.2) 0%, rgba(216, 243, 220, 0) 48%)",
    pointerEvents: "none",
  },
  "& .MuiButton-endIcon": {
    ml: { xs: 0.25, sm: 0.75 },
    transition: "transform 0.22s ease",
  },
};

const heroPrimaryBtn = {
  ...heroBtnBase,
  color: "#F7F4EC",
  border: "1px solid rgba(82, 183, 136, 0.55)",
  background:
    "linear-gradient(180deg, rgba(64, 145, 108, 0.78) 0%, rgba(27, 67, 50, 0.68) 100%)",
  boxShadow:
    "inset 0 1px 0 rgba(216, 243, 220, 0.3), 0 10px 24px rgba(27, 67, 50, 0.24)",
  "&:hover": {
    color: "#FFFFFF",
    transform: "translateY(-2px)",
    border: "1px solid rgba(82, 183, 136, 0.9)",
    background:
      "linear-gradient(180deg, rgba(82, 183, 136, 0.92) 0%, rgba(45, 106, 79, 0.82) 100%)",
    boxShadow:
      "inset 0 1px 0 rgba(216, 243, 220, 0.42), 0 14px 30px rgba(27, 67, 50, 0.3)",
    "& .MuiButton-endIcon": {
      transform: "translateX(3px)",
    },
  },
  "&:active": {
    color: "#FFFFFF",
    transform: "translateY(1px)",
    background: "linear-gradient(180deg, #2D6A4F 0%, #1B4332 100%)",
    boxShadow: "inset 0 1px 0 rgba(183, 228, 199, 0.2)",
  },
  "&:focus, &:focus-visible": {
    color: "#FFFFFF",
    outline: "none",
    border: "1px solid rgba(82, 183, 136, 0.9)",
    boxShadow:
      "inset 0 1px 0 rgba(216, 243, 220, 0.3), 0 0 0 3px rgba(64, 145, 108, 0.35)",
  },
};

const heroSecondaryBtn = {
  ...heroBtnBase,
  color: "#D8F3DC",
  border: "1px solid rgba(64, 145, 108, 0.48)",
  background: "rgba(27, 67, 50, 0.16)",
  boxShadow: "inset 0 1px 0 rgba(82, 183, 136, 0.16)",
  "&:hover": {
    color: "#FFFFFF",
    transform: "translateY(-2px)",
    border: "1px solid rgba(82, 183, 136, 0.7)",
    background: "rgba(45, 106, 79, 0.34)",
    boxShadow:
      "inset 0 1px 0 rgba(183, 228, 199, 0.22), 0 10px 22px rgba(27, 67, 50, 0.18)",
  },
  "&:active": {
    color: "#FFFFFF",
    transform: "translateY(1px)",
    background: "rgba(27, 67, 50, 0.4)",
  },
  "&:focus, &:focus-visible": {
    color: "#FFFFFF",
    outline: "none",
    border: "1px solid rgba(82, 183, 136, 0.7)",
    boxShadow:
      "inset 0 1px 0 rgba(82, 183, 136, 0.16), 0 0 0 3px rgba(64, 145, 108, 0.28)",
  },
};

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

        <HeroTreeDivider />

        <Box
          sx={{
            position: "relative",
            zIndex: 3,
            height: "100%",
            display: "flex",
            alignItems: { xs: "flex-start", md: "center" },
            pl: { xs: 0, md: 2, xl: 3 },
            pr: { xs: 0, md: 0 },
            overflow: "visible",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "40%", lg: "38%" },
              maxWidth: { md: 520 },
              height: { xs: "62%", md: "auto" },
              maxHeight: { xs: "62%", md: "none" },
              display: "flex",
              flexDirection: "column",
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: { xs: "center", md: "flex-start" },
              boxSizing: "border-box",
              pt: { xs: "52px", md: 0 },
              px: { xs: 2, md: 0 },
              overflow: "visible",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Box
              sx={{
                width: "100%",
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <Typography
                component="h1"
                sx={{
                  mb: { xs: 1.25, sm: 1.75, md: 2 },
                  fontWeight: 700,
                  lineHeight: 1.25,
                  letterSpacing: "-0.03em",
                  textAlign: { xs: "center", md: "left" },
                  fontSize: {
                    xs: "clamp(0.85rem, 5vw, 1.25rem)",
                    md: "1.7rem",
                    lg: "2.25rem",
                    xl: "2.65rem",
                  },
                  width: "max-content",
                  maxWidth: "100%",
                  mx: { xs: "auto", md: 0 },
                }}
              >
                <Box component="span" sx={{ display: "block", whiteSpace: "nowrap" }}>
                  Growing Smarter. Farming Sustainably.
                </Box>
                <Box component="span" sx={{ display: "block", whiteSpace: "nowrap" }}>
                  Building Better.
                </Box>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  gap: { xs: 0.75, sm: 2 },
                  width: { xs: "100%", md: "auto" },
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Button
                  disableRipple
                  disableFocusRipple
                  onClick={() => navigate("/request-service")}
                  endIcon={
                    <ArrowForwardRounded
                      sx={{ fontSize: { xs: "0.9rem", sm: "1.1rem" } }}
                    />
                  }
                  sx={heroPrimaryBtn}
                >
                  Request a Service
                </Button>
                <Button
                  disableRipple
                  disableFocusRipple
                  onClick={() => navigate("/services")}
                  sx={heroSecondaryBtn}
                >
                  Explore Our Services
                </Button>
              </Box>
              <HeroServiceAnimations services={displayServices} />
          </Box>
        </Box>
      </Box>

        <Box
          component="button"
          type="button"
          onClick={() =>
            document.getElementById("what-we-do")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          aria-label="Scroll down"
          sx={{
            position: "absolute",
            left: "50%",
            bottom: {
              xs: "max(14px, env(safe-area-inset-bottom, 0px))",
              md: 28,
            },
            transform: "translateX(-50%)",
            zIndex: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 0,
            m: 0,
            border: 0,
            background: "transparent",
            color: "#D8F3DC",
            cursor: "pointer",
            appearance: "none",
            WebkitAppearance: "none",
            WebkitTapHighlightColor: "transparent",
            outline: "none",
            "&:hover": {
              color: "#FFFFFF",
            },
            "&:focus, &:focus-visible": {
              outline: "none",
              color: "#FFFFFF",
            },
          }}
        >
          <KeyboardArrowDownRounded
            sx={{
              fontSize: { xs: 32, sm: 36 },
              "@keyframes heroExploreBounce": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(6px)" },
              },
              animation: "heroExploreBounce 1.6s ease-in-out infinite",
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
              },
            }}
          />
        </Box>
      </Box>

      <Box
        id="what-we-do"
        sx={{
          pt: { xs: 3, md: 4 },
          pb: { xs: 3, md: 4 },
          backgroundColor: "#F7F4EC",
          scrollMarginTop: { xs: "64px", lg: "68px" },
        }}
      >
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
                md: "repeat(12, minmax(0, 1fr))",
              },
              gap: { xs: 2, sm: 2.25, md: 2.5 },
              width: "100%",
            }}
          >
            {displayServices.map((service, index) => {
              const activeImage =
                (heroIndex + index) % heroImages.length;
              const title =
                {
                  "hydroponic-farming": "Hydroponics",
                  "vertical-farming": "Vertical",
                  "organic-agriculture": "Organic",
                  "agronomy-consultancy": "Agronomy",
                  landscaping: "Landscape",
                  training: "Training",
                  "eia-services": "EIA",
                }[service.slug] || service.name;
              return (
                <Box
                  key={service.slug || service.name}
                  onClick={() => navigate(`/services/${service.slug}`)}
                  sx={{
                    gridColumn: {
                      xs: "auto",
                      sm: "auto",
                      md: index < 4 ? "span 3" : "span 4",
                    },
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#2D6A4F",
                    borderRadius: "0 0 56px 0",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 10px 24px rgba(27, 67, 50, 0.14)",
                    transition:
                      "transform 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      backgroundColor: "#245C43",
                      boxShadow: "0 16px 32px rgba(27, 67, 50, 0.22)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: { xs: 180, sm: 200, md: 220 },
                      overflow: "hidden",
                    }}
                  >
                    {heroImages.map((src, imageIndex) => (
                      <Box
                        key={src}
                        sx={{
                          position: "absolute",
                          inset: 0,
                          backgroundImage: `url(${encodeURI(src)})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          opacity: activeImage === imageIndex ? 1 : 0,
                          transition: "opacity 1.2s ease-in-out",
                        }}
                      />
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      px: 2,
                      py: { xs: 1.1, md: 1.25 },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#FFFFFF",
                        fontWeight: 800,
                        fontSize: { xs: "1.15rem", md: "1.25rem" },
                        letterSpacing: "0.02em",
                        textAlign: "center",
                        lineHeight: 1.2,
                      }}
                    >
                      {title}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
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

      <Box
        sx={{
          pt: { xs: 2, md: 2.5 },
          pb: { xs: 2, md: 2.5 },
          background:
            "linear-gradient(180deg, #F7F4EC 0%, #FFFFFF 48%, #F7F4EC 100%)",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: { xs: 1.75, md: 2.25 }, maxWidth: 640, mx: "auto", textAlign: "center" }}>
            <Typography
              sx={{
                color: "#2D6A4F",
                fontWeight: 800,
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                mb: 0.75,
              }}
            >
              Keep exploring
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 0.75, fontWeight: 800, color: "#1B2A22" }}
            >
              Explore more
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "0.95rem", lineHeight: 1.55 }}>
              Register for training, read practical guides, browse project photos,
              or hear from clients — pick a path below.
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
              gap: { xs: 2, md: 2.5 },
            }}
          >
            {[
              {
                title: "Training catalogue",
                text: "Browse upcoming courses, pick a date, and register in a few steps.",
                action: "View courses",
                path: "/training",
                icon: SchoolOutlined,
                tone: "#2D6A4F",
              },
              {
                title: "Knowledge Centre",
                text: "Read practical articles on hydroponics, agronomy and sustainable farming.",
                action: "Read articles",
                path: "/blog",
                icon: MenuBookOutlined,
                tone: "#40916C",
              },
              {
                title: "Gallery",
                text: "See photos from farms, landscaping, training and completed projects.",
                action: "Open gallery",
                path: "/gallery",
                icon: PhotoLibraryOutlined,
                tone: "#1B4332",
              },
              {
                title: "Testimonials",
                text: "Hear from farmers, institutions and businesses we have worked with.",
                action: "Read stories",
                path: "/testimonials",
                icon: FormatQuoteOutlined,
                tone: "#52B788",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Box
                  key={item.path}
                  role="link"
                  tabIndex={0}
                  onClick={() => navigate(item.path)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigate(item.path);
                    }
                  }}
                  sx={{
                    position: "relative",
                    height: "100%",
                    minHeight: { md: 250 },
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    p: { xs: 2.25, md: 2.5 },
                    borderRadius: "22px 22px 48px 22px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(45, 106, 79, 0.14)",
                    boxShadow: "0 8px 24px rgba(27, 67, 50, 0.06)",
                    overflow: "hidden",
                    outline: "none",
                    transition:
                      "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s ease, border-color 0.22s ease",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: 4,
                      height: "100%",
                      background: `linear-gradient(180deg, ${item.tone}, #1B4332)`,
                      transform: "scaleY(0.35)",
                      transformOrigin: "top",
                      transition: "transform 0.28s ease",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(165deg, rgba(45, 106, 79, 0.06) 0%, transparent 42%)",
                      opacity: 0,
                      transition: "opacity 0.28s ease",
                      pointerEvents: "none",
                    },
                    "&:hover, &:focus-visible": {
                      transform: "translateY(-8px)",
                      borderColor: item.tone,
                      boxShadow: "0 18px 36px rgba(27, 67, 50, 0.14)",
                      "&::before": { transform: "scaleY(1)" },
                      "&::after": { opacity: 1 },
                      "& .explore-icon": {
                        backgroundColor: item.tone,
                        color: "#FFFFFF",
                        transform: "scale(1.08)",
                      },
                      "& .explore-action": {
                        color: item.tone,
                        "& .explore-arrow": {
                          transform: "translateX(4px)",
                        },
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        color: item.tone,
                        fontWeight: 800,
                        fontSize: "0.72rem",
                        letterSpacing: "0.14em",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Typography>
                    <Box
                      className="explore-icon"
                      sx={{
                        width: 46,
                        height: 46,
                        borderRadius: "14px",
                        backgroundColor: "rgba(45, 106, 79, 0.1)",
                        color: item.tone,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition:
                          "transform 0.25s ease, background-color 0.25s ease, color 0.25s ease",
                      }}
                    >
                      <Icon />
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      mb: 0.85,
                      fontWeight: 800,
                      fontSize: { xs: "1.08rem", md: "1.12rem" },
                      color: "#1B2A22",
                      lineHeight: 1.25,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      fontSize: "0.88rem",
                      lineHeight: 1.55,
                      mb: 2.25,
                      flex: 1,
                    }}
                  >
                    {item.text}
                  </Typography>
                  <Box
                    className="explore-action"
                    sx={{
                      mt: "auto",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: "#2D6A4F",
                      fontWeight: 800,
                      fontSize: "0.86rem",
                      width: "fit-content",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.action}
                    <ArrowForwardRounded
                      className="explore-arrow"
                      sx={{
                        fontSize: 18,
                        transition: "transform 0.22s ease",
                      }}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
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
