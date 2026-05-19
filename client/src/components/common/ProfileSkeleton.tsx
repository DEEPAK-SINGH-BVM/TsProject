import React from "react";
import { cardStyles as styles } from "../../styles/card.styles";

export const ProfileSkeleton = () => {
  return (
    <div style={styles.page}>
      {/* Header Skeleton */}
      <div style={styles.header}>
        <div
          style={{
            width: 150,
            height: 24,
            backgroundColor: "#e0e0e0",
            borderRadius: 4,
            marginBottom: 8,
            animation: "pulse 1.5s infinite",
          }}
        />
        <div
          style={{
            width: 250,
            height: 16,
            backgroundColor: "#e0e0e0",
            borderRadius: 4,
            animation: "pulse 1.5s infinite",
          }}
        />
      </div>

      {/* Profile Card Skeleton */}
      <div style={{ ...styles.card, ...styles.flex }}>
        {/* Avatar */}
        <div
          style={{
            ...styles.avatar,
            backgroundColor: "#e0e0e0",
            animation: "pulse 1.5s infinite",
          }}
        />

        {/* Info */}
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}
        >
          <div
            style={{
              width: "50%",
              height: 20,
              backgroundColor: "#e0e0e0",
              borderRadius: 4,
              animation: "pulse 1.5s infinite",
            }}
          />
          <div
            style={{
              width: "70%",
              height: 16,
              backgroundColor: "#e0e0e0",
              borderRadius: 4,
              animation: "pulse 1.5s infinite",
            }}
          />
          <div
            style={{
              width: "30%",
              height: 16,
              borderRadius: 12,
              backgroundColor: "#e0e0e0",
              animation: "pulse 1.5s infinite",
            }}
          />
        </div>
      </div>

      <div style={styles.section}>
        <div
          style={{
            width: 120,
            height: 40,
            borderRadius: 8,
            backgroundColor: "#e0e0e0",
            animation: "pulse 1.5s infinite",
          }}
        />
      </div>
    </div>
  );
};
