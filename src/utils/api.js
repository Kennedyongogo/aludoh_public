export const apiGet = async (path) => {
  const response = await fetch(path, {
    headers: { Accept: "application/json" },
  });
  const data = await response.json();
  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Failed to load data");
  }
  return data;
};

export const apiPost = async (path, body) => {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Request failed");
  }
  return data;
};

export const mediaUrl = (value) => {
  if (!value) return "";
  if (value.startsWith("http") || value.startsWith("/")) return value;
  return `/uploads/${value}`;
};
