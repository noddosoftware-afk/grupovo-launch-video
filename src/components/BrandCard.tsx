import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import React from "react";
import { syne, inter, COLORS } from "../fonts";

type Props = {
  eyebrow: string;
  tagline?: string;
  showLogo?: boolean;
};

export const BrandCard: React.FC<Props> = ({ eyebrow, tagline, showLogo = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 120, mass: 0.8 },
    from: 0.85,
    to: 1,
  });
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineWidth = interpolate(frame, [18, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [30, 50], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {showLogo && (
        <Img
          src={staticFile("img/logo.png")}
          style={{
            height: 92,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        />
      )}

      <div
        style={{
          marginTop: 44,
          fontFamily: inter,
          fontWeight: 500,
          fontSize: 20,
          letterSpacing: "0.34em",
          color: COLORS.accent,
          opacity: logoOpacity,
        }}
      >
        {eyebrow}
      </div>

      <div
        style={{
          marginTop: 18,
          width: 220 * lineWidth,
          height: 2,
          background: COLORS.gold,
        }}
      />

      {tagline && (
        <div
          style={{
            marginTop: 34,
            fontFamily: syne,
            fontWeight: 300,
            fontSize: 52,
            color: COLORS.paper,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            letterSpacing: "0.02em",
          }}
        >
          {tagline}
        </div>
      )}
    </AbsoluteFill>
  );
};
