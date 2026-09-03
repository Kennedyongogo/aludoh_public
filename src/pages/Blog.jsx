import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { apiGet, mediaUrl } from "../utils/api";

export default function Blog() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    apiGet("/api/articles?status=published&limit=24")
      .then((res) => setArticles(res.data || []))
      .catch(() => setArticles([]));
  }, []);

  return (
    <Box sx={{ py: 8 }}>
      <Helmet>
        <title>Knowledge Centre | Mcaludoh Consultancy</title>
      </Helmet>
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Knowledge Centre
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 5 }}>
          Practical articles on hydroponics, agronomy, organic farming and
          sustainable agriculture.
        </Typography>
        <Grid container spacing={3}>
          {articles.map((article) => (
            <Grid item xs={12} md={4} key={article.id}>
              <Card
                sx={{ cursor: "pointer", height: "100%" }}
                onClick={() => navigate(`/blog/${article.slug}`)}
              >
                {article.featured_image && (
                  <Box
                    component="img"
                    src={mediaUrl(article.featured_image)}
                    alt={article.title}
                    sx={{ width: "100%", height: 180, objectFit: "cover" }}
                  />
                )}
                <CardContent>
                  <Typography variant="overline">
                    {article.category?.name}
                  </Typography>
                  <Typography variant="h6">{article.title}</Typography>
                  <Typography color="text.secondary">{article.excerpt}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {!articles.length && (
            <Typography>Articles will appear here once published.</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
