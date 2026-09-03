import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { apiPost } from "../utils/api";
import { showError, showSuccess } from "../utils/swal";
import { fallbackServices } from "../data/siteContent";

export default function RequestService() {
  const { services = [] } = useOutletContext() || {};
  const [searchParams] = useSearchParams();
  const preset = searchParams.get("service");
  const selectedService = useMemo(
    () =>
      services.find((item) => item.slug === preset || item.id === preset) ||
      fallbackServices.find((item) => item.slug === preset) ||
      null,
    [services, preset]
  );
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    organization: "",
    farm_size: "",
    crop: "",
    farming_method: "",
    service_required: "",
    service_id: selectedService?.id || "",
    additional: "",
  });

  useEffect(() => {
    if (selectedService?.id || selectedService?.slug) {
      setForm((prev) => ({
        ...prev,
        service_id: selectedService.id || selectedService.slug,
      }));
    }
  }, [selectedService]);

  const change = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const description = [
        form.additional,
        form.farm_size && `Farm size: ${form.farm_size}`,
        form.crop && `Crop: ${form.crop}`,
        form.farming_method && `Current method: ${form.farming_method}`,
        form.service_required && `Service required: ${form.service_required}`,
      ]
        .filter(Boolean)
        .join("\n");

      const isUuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          form.service_id
        );
      const selectedName =
        services.find((item) => item.id === form.service_id)?.name ||
        fallbackServices.find((item) => item.slug === form.service_id)?.name ||
        form.service_id;

      await apiPost("/api/service-requests", {
        name: form.name,
        phone: form.phone,
        email: form.email,
        organization: form.organization,
        location: form.location,
        service_id: isUuid ? form.service_id : undefined,
        description: [
          !isUuid && `Requested service: ${selectedName}`,
          description,
        ]
          .filter(Boolean)
          .join("\n"),
      });
      showSuccess("Request received. Our team will contact you shortly.");
      setForm({
        name: "",
        phone: "",
        email: "",
        location: "",
        organization: "",
        farm_size: "",
        crop: "",
        farming_method: "",
        service_required: "",
        service_id: selectedService?.id || selectedService?.slug || "",
        additional: "",
      });
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Helmet>
        <title>Request a Service | Mcaludoh Consultancy</title>
      </Helmet>
      <Container sx={{ maxWidth: 720 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Request a Service
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Tell us what you need. The request goes directly to the admin portal.
        </Typography>
        <Box component="form" onSubmit={submit}>
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel>Service</InputLabel>
            <Select
              label="Service"
              value={form.service_id}
              onChange={change("service_id")}
            >
              {(services.length ? services : fallbackServices).map((service) => (
                <MenuItem
                  key={service.id || service.slug}
                  value={service.id || service.slug}
                >
                  {service.name}
                </MenuItem>
              ))}
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField required fullWidth label="Name" sx={{ mb: 2 }} value={form.name} onChange={change("name")} />
          <TextField required fullWidth label="Phone" sx={{ mb: 2 }} value={form.phone} onChange={change("phone")} />
          <TextField fullWidth type="email" label="Email" sx={{ mb: 2 }} value={form.email} onChange={change("email")} />
          <TextField fullWidth label="Location" sx={{ mb: 2 }} value={form.location} onChange={change("location")} />
          <TextField fullWidth label="Organization" sx={{ mb: 2 }} value={form.organization} onChange={change("organization")} />
          <TextField fullWidth label="Farm size" sx={{ mb: 2 }} value={form.farm_size} onChange={change("farm_size")} />
          <TextField fullWidth label="Type of crop" sx={{ mb: 2 }} value={form.crop} onChange={change("crop")} />
          <TextField
            fullWidth
            label="Current farming method"
            sx={{ mb: 2 }}
            value={form.farming_method}
            onChange={change("farming_method")}
          />
          <TextField
            fullWidth
            label="Service required"
            placeholder="Farm assessment, soil assessment, landscape design..."
            sx={{ mb: 2 }}
            value={form.service_required}
            onChange={change("service_required")}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Additional information"
            sx={{ mb: 2 }}
            value={form.additional}
            onChange={change("additional")}
          />
          <Button type="submit" variant="contained">
            Submit Request
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
