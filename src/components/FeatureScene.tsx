import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";
import { KineticText } from "./KineticText";
import { BrowserMockup } from "./BrowserMockup";
import { COLORS, inter } from "../fonts";

type Props = {
  eyebrow: string;
  title: string;
  bullets: string[];
  mockupSrc: string;
  mockupHeight?: number;
  panDistance?: number;
  flip?: boolean;
  zoom?: number;
  url?: string;
};

export const FeatureScene: React.FC<Props> = ({
  eyebrow,
  title,
  bullets,
  mockupSrc,
  mockupHeight = 480,
  panDistance = 90,
  flip = false,
  zoom = 1.4,
  url,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mockupEntry = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 90, mass: 1 },
    from: flip ? -60 : 60,
    to: 0,
  });
  const mockupOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  const mockupRotate = flip ? 6 : -6;

  const eyebrowOpacity = interpolate(frame, [4, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        flexDirection: flip ? "row-reverse" : "row",
        alignItems: "center",
        padding: "0 90px",
        gap: 70,
      }}
    >
      <div style={{ flex: "0 0 640px" }}>
        <div
          style={{
            fontFamily: inter,
            fontSize: 22,
            letterSpacing: "0.45em",
            color: COLORS.gold,
            opacity: eyebrowOpacity,
            marginBottom: 22,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>

        <KineticText text={title} delay={10} fontSize={76} align="left" />

        <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 16 }}>
          {bullets.map((b, i) => {
            const start = 35 + i * 8;
            const op = interpolate(frame, [start, start + 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const x = interpolate(frame, [start, start + 15], [-16, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: op,
                  transform: `translateX(${x}px)`,
                }}
              >
                <div style={{ width: 22, height: 1, background: COLORS.gold, flexShrink: 0 }} />
                <div
                  style={{
                    fontFamily: inter,
                    fontSize: 24,
                    color: "rgba(245,243,238,0.8)",
                  }}
                >
                  {b}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          opacity: mockupOpacity,
          transform: `translateX(${mockupEntry}px) rotateY(${mockupRotate}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <BrowserMockup src={mockupSrc} width={760} height={mockupHeight} panDistance={panDistance} zoom={zoom} url={url} />
      </div>
    </AbsoluteFill>
  );
};
