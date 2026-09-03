import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, mediaUrl } from "../utils/api";
import { getServiceFallback } from "../data/siteContent";

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const fallback = getServiceFallback(slug);

  useEffect(() => {
    setLoading(true);
    apiGet(`/api/services/${slug}`)
      .then((res) => setService(res.data))
      .catch(() => setService(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const display = service || fallback;

  if (loading && !fallback) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!display) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography>Service not found.</Typography>
      </Container>
    );
  }

  const offerings = display.offerings || fallback?.offerings || [];

  return (
    <Box sx={{ py: 8 }}>
      <Helmet>
        <title>{display.name} | Mcaludoh Consultancy</title>
      </Helmet>
      <Container>
        {display.image && (
          <Box
            component="img"
            src={mediaUrl(display.image)}
            alt={display.name}
            sx={{
              width: "100%",
              maxHeight: 360,
              objectFit: "cover",
              borderRadius: 3,
              mb: 4,
            }}
          />
        )}
        <Typography variant="h3" sx={{ mb: 2 }}>
          {display.name}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, whiteSpace: "pre-wrap" }}>
          {display.description || display.short_description}
        </Typography>

        {offerings.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              What we offer
            </Typography>
            <Grid container spacing={1}>
              {offerings.map((item) => (
                <Grid item key={item}>
                  <Chip label={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <Button
          variant="contained"
          onClick={() =>
            navigate(`/request-service?service=${display.slug || display.id}`)
          }
        >
          Request {display.name} Consultation
        </Button>
      </Container>
    </Box>
  );
}
