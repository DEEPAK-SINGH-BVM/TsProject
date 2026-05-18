import React from "react";
import { cardStyles } from "../../styles/card.styles";

export const MyShopSkeleton = () => (
  <div style={{ ...cardStyles.page, animation: "pulse 1.5s infinite" }}>
    {/* Header */}
    <div style={cardStyles.header}>
      <div
        style={{
          width: "30%",
          height: "24px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
          marginBottom: "6px",
        }}
      />
      <div
        style={{
          width: "50%",
          height: "16px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
        }}
      />
    </div>

    {/* Shop Card */}
    <div style={{ ...cardStyles.card, ...cardStyles.flex }}>
      <div style={{ ...cardStyles.avatar, backgroundColor: "#f3f4f6" }} />
      <div style={{ flex: 1, gap: "8px" }}>
        <div
          style={{
            width: "60%",
            height: "20px",
            backgroundColor: "#f3f4f6",
            borderRadius: "6px",
            marginBottom: "4px",
          }}
        />
        <div
          style={{
            width: "40%",
            height: "16px",
            backgroundColor: "#f3f4f6",
            borderRadius: "6px",
            marginBottom: "4px",
          }}
        />
        <div
          style={{
            width: "30%",
            height: "16px",
            backgroundColor: "#f3f4f6",
            borderRadius: "999px",
          }}
        />
      </div>
    </div>

    {/* Shop Details */}
    <div style={cardStyles.section}>
      <div
        style={{
          width: "40%",
          height: "20px",
          backgroundColor: "#f3f4f6",
          borderRadius: "6px",
          marginBottom: "12px",
        }}
      />{" "}
      {/* Section title */}
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            style={{
              width: "100%",
              height: "16px",
              backgroundColor: "#f3f4f6",
              borderRadius: "6px",
              marginBottom: "8px",
            }}
          />
        ))}
    </div>

    {/* Edit Button */}
    <div style={cardStyles.section}>
      <div
        style={{
          ...cardStyles.buttonPrimary,
          backgroundColor: "#f3f4f6",
          color: "transparent",
          height: "44px",
          width: "120px",
        }}
      />
    </div>
  </div>
);
