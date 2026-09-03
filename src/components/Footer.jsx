import React from "react";
import { Box, Container, Grid, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Footer({ settings }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: 8,
        py: 6,
        backgroundColor: "#1B4332",
        color: "white",
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {settings?.company_name || "Mcaludoh Consultancy"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, mb: 2 }}>
              {settings?.footer_text ||
                "Professional solutions in hydroponics, vertical farming, organic agriculture, agronomy, landscaping, training and environmental services."}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>
              Explore
            </Typography>
            <Stack spacing={1}>
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
                  sx={{ cursor: "pointer", opacity: 0.9 }}
                  onClick={() => navigate(path)}
                >
                  {label}
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>
              Get in touch
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              {settings?.phone || "+254 700 000000"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              {settings?.email || "info@mcaludoh.co.ke"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, mb: 2 }}>
              {settings?.address || "Nairobi, Kenya"}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
              <Button
                size="small"
                href={`tel:${String(settings?.phone || "+254700000000").replace(/\D/g, "")}`}
                sx={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}
                variant="outlined"
              >
                Call Us
              </Button>
              <Button
                size="small"
                href={`mailto:${settings?.email || "info@mcaludoh.co.ke"}`}
                sx={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}
                variant="outlined"
              >
                Email Us
              </Button>
              <Button
                size="small"
                href={`https://wa.me/${String(settings?.whatsapp || settings?.phone || "254700000000").replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                sx={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}
                variant="outlined"
              >
                WhatsApp
              </Button>
            </Stack>
            <Button
              variant="contained"
              onClick={() => navigate("/request-service")}
              sx={{
                backgroundColor: "#C4A35A",
                color: "#1B2A22",
                "&:hover": { backgroundColor: "#9C7B32" },
              }}
            >
              Request a Service
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
