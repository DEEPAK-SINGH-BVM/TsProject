// styles/product.styles.ts

export const productStyles = {
  page: {
    padding: "24px",
    marginTop: "44px",
    backgroundColor: "#f5f5f4",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
    gap: "20px",
    flexWrap: "wrap" as const,
  },

  title: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#1f2937",
  },

  subtitle: {
    fontSize: "0.95rem",
    color: "#78716c",
    marginTop: "6px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
    alignItems: "start",
    justifyItems: "center",
  },

  emptyState: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "40px",
    textAlign: "center" as const,
    color: "#78716c",
    border: "1px solid #e7e5e4",
    fontWeight: 500,
  },

  /* CARD */

  card: {
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    overflow: "hidden",
    border: "1px solid #e7e5e4",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    transition: "0.2s ease",
    width: "100%",
    maxWidth: "360px",
  },

  imageWrapper: {
    position: "relative" as const,
    width: "100%",
    height: "220px",
    overflow: "hidden",
    backgroundColor: "#f5f5f4",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },

  stockBadge: {
    position: "absolute" as const,
    top: "14px",
    right: "14px",
    padding: "6px 12px",
    borderRadius: "999px",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: 600,
    backdropFilter: "blur(6px)",
  },

  inStock: {
    backgroundColor: "#57534e",
  },

  outStock: {
    backgroundColor: "#a8a29e",
  },

  content: {
    padding: "20px",
  },

  badges: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap" as const,
    marginBottom: "14px",
  },

  badge: {
    backgroundColor: "#f5f5f4",
    color: "#44403c",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 500,
    border: "1px solid #e7e5e4",
  },

  subBadge: {
    backgroundColor: "#fafaf9",
    color: "#57534e",
  },

  productTitle: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#1f2937",
    marginBottom: "10px",
  },

  description: {
    color: "#78716c",
    fontSize: "14px",
    lineHeight: "22px",
    marginBottom: "20px",
  },

  details: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
  },

  detailBox: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
  },

  detailLabel: {
    color: "#a8a29e",
    fontSize: "12px",
    fontWeight: 500,
  },

  price: {
    color: "#1f2937",
    fontSize: "26px",
    fontWeight: 700,
  },

  detailValue: {
    color: "#44403c",
    fontSize: "16px",
    fontWeight: 600,
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  editButton: {
    flex: 1,
    border: "1px solid #d6d3d1",
    padding: "12px",
    borderRadius: "14px",
    backgroundColor: "#1f2937",
    color: "#ffffff",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    transition: "0.2s",
  },

  deleteButton: {
    flex: 1,
    border: "1px solid #e7e5e4",
    padding: "12px",
    borderRadius: "14px",
    backgroundColor: "#fafaf9",
    color: "#57534e",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    transition: "0.2s",
  },
};
