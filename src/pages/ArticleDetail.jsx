import React, { useEffect, useState } from "react";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { apiGet, mediaUrl } from "../utils/api";

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet(`/api/articles/${slug}`)
      .then((res) => setArticle(res.data))
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!article) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography>Article not found.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <Helmet>
        <title>{article.title} | Knowledge Centre</title>
      </Helmet>
      <Container sx={{ maxWidth: 860 }}>
        <Typography variant="overline">{article.category?.name}</Typography>
        <Typography variant="h3" sx={{ mb: 2 }}>
          {article.title}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          {article.author?.name}
          {article.published_at
            ? ` · ${new Date(article.published_at).toLocaleDateString()}`
            : ""}
        </Typography>
        {article.featured_image && (
          <Box
            component="img"
            src={mediaUrl(article.featured_image)}
            alt={article.title}
            sx={{ width: "100%", borderRadius: 3, mb: 4 }}
          />
        )}
        <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
          {article.content}
        </Typography>
      </Container>
    </Box>
  );
}
