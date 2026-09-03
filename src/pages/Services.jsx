import React from "react";
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate, useOutletContext } from "react-router-dom";
import { mediaUrl } from "../utils/api";
import { fallbackServices } from "../data/siteContent";

export default function Services() {
  const navigate = useNavigate();
  const { services = [] } = useOutletContext() || {};
  const displayServices = services.length ? services : fallbackServices;

  return (
    <Box sx={{ py: 8 }}>
      <Helmet>
        <title>Services | Mcaludoh Consultancy</title>
      </Helmet>
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Services
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 5, maxWidth: 720 }}>
          Hydroponics, organic farming, vertical farming, agronomy,
          landscaping, training and EIA services.
        </Typography>
        <Grid container spacing={3}>
          {displayServices.map((service) => (
            <Grid item xs={12} md={4} key={service.id || service.slug}>
              <Card
                sx={{ height: "100%", cursor: "pointer" }}
                onClick={() => navigate(`/services/${service.slug}`)}
              >
                {service.image && (
                  <Box
                    component="img"
                    src={mediaUrl(service.image)}
                    alt={service.name}
                    sx={{ width: "100%", height: 180, objectFit: "cover" }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{service.name}</Typography>
                  <Typography color="text.secondary">
                    {service.short_description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
