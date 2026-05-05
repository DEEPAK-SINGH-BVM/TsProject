export const cardStyles = {
  page: {
    maxWidth: "48rem",
    margin: "0 auto",
    padding: "24px",
    marginTop: "44px",
    backgroundColor: "#f9fafb",
  },

  header: {
    marginBottom: "24px",
  },

  title: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#1f2937",
  },

  subtitle: {
    fontSize: "0.875rem",
    color: "#6b7280",
    marginTop: "6px",
  },

  card: {
    backgroundColor: "#ffffff",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
  },

  flex: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "999px",
    objectFit: "cover" as const,
    border: "1px solid #e5e7eb",
  },

  fallbackAvatar: {
    width: "80px",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: "999px",
  },

  name: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#111827",
  },

  text: {
    fontSize: "0.875rem",
    color: "#6b7280",
  },

  badge: {
    marginTop: "6px",
    fontSize: "12px",
    padding: "4px 10px",
    backgroundColor: "#f3f4f6",
    color: "#374151",
    borderRadius: "999px",
    display: "inline-block",
  },

  sectionTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#1f2937",
    marginBottom: "12px",
  },

  textarea: {
    width: "100%",
    border: "1px solid #e5e7eb",
    padding: "12px",
    borderRadius: "12px",
    minHeight: "100px",
    resize: "none" as const,
    outline: "none",
  },

  buttonPrimary: {
    padding: "10px 16px",
    borderRadius: "12px",
    backgroundColor: "#111827",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    transition: "0.2s",
  },

  buttonPrimaryHover: {
    backgroundColor: "#1f2937",
  },

  buttonOutline: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    color: "#374151",
    backgroundColor: "#ffffff",
    cursor: "pointer",
  },

  buttonOutlineHover: {
    backgroundColor: "#f3f4f6",
  },

  section: {
    backgroundColor: "#ffffff",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: "20px",
    padding: "24px",
    marginTop: "16px",
  },
};
