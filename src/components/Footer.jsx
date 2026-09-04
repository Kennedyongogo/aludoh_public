import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MAIZE = "#40916C";

const outlineBtnSx = {
  color: MAIZE,
  borderColor: MAIZE,
  WebkitTapHighlightColor: "transparent",
  "&:hover": {
    borderColor: "#52B788",
    backgroundColor: "rgba(64, 145, 108, 0.14)",
  },
  "&:active": {
    backgroundColor: "rgba(64, 145, 108, 0.2)",
  },
  "&:focus, &:focus-visible": {
    backgroundColor: "transparent",
    outline: "none",
    boxShadow: "none",
  },
};

export default function Footer({ settings }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: 0,
        py: { xs: 3, md: 3.5 },
        backgroundColor: "#1B4332",
        color: "white",
        borderTop: `3px solid ${MAIZE}`,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1.2fr 0.9fr 1.1fr",
            },
            gap: { xs: 2.5, md: 4 },
            alignItems: "start",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                mb: 0.75,
              }}
            >
              <Box
                component="img"
                src={encodeURI("/images/logo (1).png")}
                alt=""
                sx={{
                  height: 40,
                  width: 40,
                  objectFit: "contain",
                  borderRadius: "8px",
                  flexShrink: 0,
                }}
              />
              <Typography variant="h6" sx={{ lineHeight: 1.2, color: MAIZE }}>
                {settings?.company_name || "Mcaludoh Consultancy"}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.85, maxWidth: 380 }}>
              {settings?.footer_text ||
                "Professional solutions in hydroponics, vertical farming, organic agriculture, agronomy, landscaping, training and environmental services."}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, fontWeight: 700, color: MAIZE }}
            >
              Explore
            </Typography>
            <Stack spacing={0.6}>
              {[
                ["Services", "/services"],
                ["Projects", "/projects"],
                ["Training", "/training"],
                ["Knowledge Centre", "/blog"],
                ["Contact", "/contact"],
              ].map(([label, path]) => (
                <Typography
                  key={path}
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    opacity: 0.9,
                    transition: "color 0.2s ease",
                    "&:hover": { color: MAIZE, opacity: 1 },
                  }}
                  onClick={() => navigate(path)}
                >
                  {label}
                </Typography>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, fontWeight: 700, color: MAIZE }}
            >
              Get in touch
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              {settings?.phone || "+254 700 000000"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              {settings?.email || "info@mcaludoh.co.ke"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, mb: 1.25 }}>
              {settings?.address || "Nairobi, Kenya"}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
            >
              <Button
                size="small"
                disableRipple
                disableFocusRipple
                href={`tel:${String(settings?.phone || "+254700000000").replace(/\D/g, "")}`}
                sx={outlineBtnSx}
                variant="outlined"
              >
                Call Us
              </Button>
              <Button
                size="small"
                disableRipple
                disableFocusRipple
                href={`mailto:${settings?.email || "info@mcaludoh.co.ke"}`}
                sx={outlineBtnSx}
                variant="outlined"
              >
                Email Us
              </Button>
              <Button
                size="small"
                disableRipple
                disableFocusRipple
                href={`https://wa.me/${String(settings?.whatsapp || settings?.phone || "254700000000").replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                sx={outlineBtnSx}
                variant="outlined"
              >
                WhatsApp
              </Button>
              <Button
                size="small"
                variant="contained"
                disableRipple
                disableFocusRipple
                onClick={() => navigate("/request-service")}
                sx={{
                  backgroundColor: MAIZE,
                  color: "#FFFFFF",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  WebkitTapHighlightColor: "transparent",
                  "&:hover": { backgroundColor: "#2D6A4F" },
                  "&:active": { backgroundColor: "#245C43" },
                  "&:focus, &:focus-visible": {
                    backgroundColor: MAIZE,
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
              >
                Request a Service
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

