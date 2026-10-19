import { ImageResponse } from "next/og";

export const alt = "UG Global: Specialist B2B sales closing and pipeline follow-up";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#171B24",
          color: "#F5F3EE",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 44, fontWeight: 600 }}>UG</span>
          <span style={{ width: 2, height: 36, background: "#3157D5" }} />
          <span style={{ fontSize: 20, letterSpacing: 8, fontFamily: "sans-serif" }}>GLOBAL</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 68, lineHeight: 1.08, maxWidth: 940 }}>
            You Generate the Opportunities. We Help Close the Business.
          </div>
          <div style={{ width: 120, height: 3, background: "#3157D5" }} />
          <div style={{ fontSize: 24, color: "#A8B8D4", fontFamily: "sans-serif", letterSpacing: 3 }}>
            SPECIALIST B2B SALES CLOSING | UK &amp; INTERNATIONAL
          </div>
        </div>
      </div>
    ),
    size,
  );
}
