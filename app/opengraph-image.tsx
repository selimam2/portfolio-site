import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sami El-Imam — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 90px",
        }}
      >
        <div
          style={{
            color: "#818CF8",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Software Engineer
        </div>
        <div
          style={{
            color: "white",
            fontSize: 80,
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: 28,
          }}
        >
          Sami El-Imam
        </div>
        <div
          style={{
            color: "#71717A",
            fontSize: 26,
            lineHeight: 1.5,
            maxWidth: 720,
            marginBottom: 48,
          }}
        >
          Computer Engineering · University of Waterloo · Full-stack systems,
          AWS infrastructure &amp; AI/LLM engineering
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
        >
          {["TypeScript", "React", "AWS", "Terraform", "Claude API"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  background: "#1E1B4B",
                  color: "#A5B4FC",
                  fontSize: 18,
                  fontWeight: 600,
                  padding: "8px 20px",
                  borderRadius: 999,
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 90,
            color: "#4F46E5",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          samielimam.com
        </div>
      </div>
    ),
    { ...size }
  );
}
