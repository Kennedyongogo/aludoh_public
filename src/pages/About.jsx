import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

const expertise = [
  "Hydroponics",
  "Vertical farming",
  "Agronomy",
  "Organic agriculture",
  "Landscaping",
  "Environmental services",
  "Training",
];

export default function About() {
  return (
    <Box sx={{ py: 8 }}>
      <Helmet>
        <title>About Us | Mcaludoh Consultancy</title>
      </Helmet>
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          About Us
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6, maxWidth: 800 }}>
          Professional agricultural and environmental consultancy providing
          practical and sustainable solutions.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Who We Are
            </Typography>
            <Typography color="text.secondary">
              Mcaludoh Consultancy helps farmers, businesses and institutions
              design, install and manage productive agricultural systems. We
              combine technical expertise with hands-on training so clients can
              grow smarter and farm more sustainably.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Our Expertise
            </Typography>
            {expertise.map((item) => (
              <Typography key={item} sx={{ mb: 1 }}>
                • {item}
              </Typography>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Our Vision
            </Typography>
            <Typography color="text.secondary">
              To promote innovative, productive and environmentally sustainable
              agricultural systems.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Our Mission
            </Typography>
            <Typography color="text.secondary">
              To provide practical technical expertise that helps farmers,
              businesses and institutions improve agricultural productivity and
              environmental sustainability.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
