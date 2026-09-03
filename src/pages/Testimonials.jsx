import React, { useEffect, useState } from "react";
import { Avatar, Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { apiGet, mediaUrl } from "../utils/api";

export default function Testimonials() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    apiGet("/api/testimonials?status=approved&limit=24")
      .then((res) => setItems(res.data || []))
      .catch(() => setItems([]));
  }, []);

  return (
    <Box sx={{ py: 8 }}>
      <Helmet>
        <title>Testimonials | Mcaludoh Consultancy</title>
      </Helmet>
      <Container>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Testimonials
        </Typography>
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} md={4} key={item.id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography sx={{ mb: 2 }}>"{item.content}"</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar src={mediaUrl(item.photo)} alt={item.client_name} />
                    <Box>
                      <Typography fontWeight={700}>{item.client_name}</Typography>
                      <Typography color="text.secondary">
                        {[item.organization, item.service?.name || item.service_received]
                          .filter(Boolean)
                          .join(" · ")}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {!items.length && (
            <Typography>Client testimonials will appear here.</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
