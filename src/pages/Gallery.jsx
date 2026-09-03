import React, { useEffect, useState } from "react";
import { Box, Chip, Container, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { apiGet, mediaUrl } from "../utils/api";
import { galleryCategories } from "../data/siteContent";

export default function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [active, setActive] = useState("all");

  useEffect(() => {
    apiGet("/api/galleries?status=active&limit=50")
      .then((res) => setAlbums(res.data || []))
      .catch(() => setAlbums([]));
  }, []);

  const images = albums
    .filter((album) => active === "all" || album.slug === active)
    .flatMap((album) =>
      (album.media || []).map((item) => ({
        ...item,
        albumName: album.name,
      }))
    );

  return (
    <Box sx={{ py: 8 }}>
      <Helmet>
        <title>Gallery | Mcaludoh Consultancy</title>
      </Helmet>
      <Container>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Gallery
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 4 }}>
          {(albums.length
            ? [{ name: "All", slug: "all" }, ...albums]
            : galleryCategories.map((name) => ({
                name,
                slug: name === "All" ? "all" : name.toLowerCase().replace(/\s+/g, "-"),
              }))
          ).map((album) => (
            <Chip
              key={album.id || album.slug}
              label={album.name}
              color={active === album.slug ? "primary" : "default"}
              onClick={() => setActive(album.slug)}
            />
          ))}
        </Box>
        <Grid container spacing={2}>
          {images.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Box
                component="img"
                src={mediaUrl(item.file_url)}
                alt={item.caption || item.albumName}
                sx={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 2 }}
              />
            </Grid>
          ))}
          {!images.length && (
            <Typography>Gallery photos will appear here once uploaded.</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
