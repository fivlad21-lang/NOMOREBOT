import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple / iOS home-screen icon — same brand language as tab favicon. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0b1020 0%, #12203a 55%, #0b1020 100%)",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 132,
            height: 132,
            borderRadius: 28,
            border: "3px solid rgba(62, 224, 255, 0.5)",
            boxShadow: "0 0 40px rgba(62, 224, 255, 0.15)",
            color: "#3ee0ff",
            fontSize: 96,
            fontWeight: 800,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: -2,
          }}
        >
          N
        </div>
      </div>
    ),
    { ...size },
  );
}
