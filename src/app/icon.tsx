import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Tab favicon — navy + cyan N (macOS / Windows browsers). */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0b1020 0%, #12203a 100%)",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 26,
            height: 26,
            borderRadius: 6,
            border: "1.5px solid rgba(62, 224, 255, 0.45)",
            color: "#3ee0ff",
            fontSize: 18,
            fontWeight: 800,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: -0.5,
          }}
        >
          N
        </div>
      </div>
    ),
    { ...size },
  );
}
