export const authStyles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    backgroundColor: "#f9fafb",
  },

  card: {
    width: "100%",
    maxWidth: "440px",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(15, 23, 42, 0.08)",
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
    borderRadius: "28px",
    padding: "32px",
  },
  
  header: {
    marginBottom: "28px",
  },

  title: {
    margin: 0,
    fontSize: "1.75rem",
    color: "#1f2937",
  },

  subtitle: {
    marginTop: "10px",
    color: "#6b7280",
    fontSize: "0.95rem",
    lineHeight: 1.6,
  },

  field: {
    marginBottom: "18px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    color: "#4b5563",
    fontSize: "0.95rem",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "16px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  } as const,

  inputFocus: {
    borderColor: "#9ca3af",
    boxShadow: "0 0 0 4px rgba(148, 163, 184, 0.12)",
  },

  errorText: {
    color: "#ef4444",
    fontSize: "0.85rem",
    marginTop: "6px",
  },

  button: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "16px",
    border: "none",
    backgroundColor: "#111827",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.2s ease, transform 0.2s ease",
  } as const,

  buttonHover: {
    backgroundColor: "#0f172a",
  },

  footer: {
    marginTop: "20px",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "0.95rem",
  },

  link: {
    color: "#111827",
    fontWeight: 600,
    textDecoration: "none",
  },
  select: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "16px",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    color: "#111827",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  } as const,
  footerText: {
    color: "#6b7280",
    fontSize: "0.95rem",
  },
  form: {
    marginTop: "32px",
  },
  inputWrapper: {
    marginBottom: "18px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  textarea: {
    width: "100%",
    padding: "14px 16px",
    marginTop:"15px",
    borderRadius: "16px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    outline: "none",
    resize: "none",
    minHeight: "120px",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  } ,
} as const;
