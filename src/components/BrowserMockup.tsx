import { Img, staticFile, useCurrentFrame, interpolate } from "remotion";
import React from "react";
import { inter } from "../fonts";

type Props = {
  src: string;
  width: number;
  height: number;
  panDistance?: number;
  url?: string;
  zoom?: number;
};

export const BrowserMockup: React.FC<Props> = ({
  src,
  width,
  height,
  panDistance = 90,
  url = "grupovo.com.mx",
  zoom = 1.4,
}) => {
  const frame = useCurrentFrame();
  const pan = interpolate(frame, [0, 150], [0, -panDistance], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#111",
        boxShadow: "0 60px 120px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          height: 40,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 14px",
          backgroundColor: "#1a1a1a",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {["#4a4a4a", "#4a4a4a", "#4a4a4a"].map((c, i) => (
            <div
              key={i}
              style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: c }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            marginLeft: 10,
            height: 22,
            borderRadius: 11,
            backgroundColor: "#262626",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: inter,
            fontSize: 11,
            color: "rgba(245,243,238,0.5)",
            letterSpacing: "0.02em",
          }}
        >
          {url}
        </div>
      </div>

      <div style={{ width, height, overflow: "hidden", position: "relative" }}>
        <Img
          src={staticFile(src)}
          style={{
            position: "absolute",
            top: pan,
            left: "50%",
            transform: "translateX(-50%)",
            width: width * zoom,
            height: "auto",
          }}
        />
      </div>
    </div>
  );
};
