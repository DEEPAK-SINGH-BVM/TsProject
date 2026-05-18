import { cardStyles } from "../../styles/card.styles";
import { productStyles } from "../../styles/product.styles";

export const ProductCardSkeleton = () => (
  <div
    style={{
      ...productStyles.card,
      animation: "pulse 1.5s infinite",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      height: "480px",
      boxSizing: "border-box",
    }}
  >
    {/* Image */}
    <div
      style={{
        ...productStyles.imageWrapper,
        backgroundColor: "#f5f5f4",
      }}
    />

    <div
      style={{
        padding: "20px",
      }}
    >
        {/* Title */}
        <div
          style={{
            width: "70%",
            height: "24px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        />

        {/* Price */}
        <div
          style={{
            width: "40%",
            height: "20px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
            paddingTop:"20px",
            marginBottom: "12px",
          }}
        />

        {/* Badges */}
        <div
          style={{
            width: "60%",
            height: "20px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        />
        <div
          style={{
            width: "60%",
            height: "40px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        />

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          paddingTop: "50px",
        }}
      >
        <div
          style={{
            ...productStyles.editButton,
            backgroundColor: "#f3f4f6",
            color: "transparent",
            height: "56px",
            flex: 1,
            // margin: "9px",
          }}
        />
        <div
          style={{
            ...productStyles.deleteButton,
            backgroundColor: "#f3f4f6",
            color: "transparent",
            height: "56px",
            flex: 1,
            // margin: "9px",
          }}
        />
      </div>
    </div>
  </div>
);
