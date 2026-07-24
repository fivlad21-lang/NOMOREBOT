import { ImageResponse } from "next/og";

export const alt = "NOMORE LAB — курс сайтів і лендінгів для бізнесу";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(135deg, #070b16 0%, #0b1020 45%, #12203a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 28,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#7dd3fc",
              fontWeight: 600,
            }}
          >
            nomorelab.wtf
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              lineHeight: 0.95,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            <span>NOMORE</span>
            <span>LAB</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              fontSize: 42,
              lineHeight: 1.2,
              fontWeight: 700,
              color: "#f8fafc",
            }}
          >
            Збери лендінг під TikTok за вечір — і приймай оплату
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#94a3b8",
              lineHeight: 1.35,
            }}
          >
            Курс сайтів і воронок для бізнесу · Start / Community / Mentor
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
