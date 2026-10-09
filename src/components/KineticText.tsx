import { useCurrentFrame, interpolate, Easing } from "remotion";
import React from "react";
import { syne, COLORS } from "../fonts";

type Props = {
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  letterSpacing?: string;
  staggerFrames?: number;
  align?: "center" | "left";
};

export const KineticText: React.FC<Props> = ({
  text,
  delay = 0,
  fontSize = 90,
  color = COLORS.paper,
  letterSpacing = "0.01em",
  staggerFrames = 3,
  align = "center",
}) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        gap: "0.3em",
        fontFamily: syne,
        fontWeight: 800,
        fontSize,
        color,
        letterSpacing,
        textTransform: "uppercase",
        lineHeight: 1.05,
      }}
    >
      {words.map((word, i) => {
        const start = delay + i * staggerFrames;
        const progress = interpolate(frame, [start, start + 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.exp),
        });
        const blur = interpolate(frame, [start, start + 18], [8, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: progress,
              transform: `translateY(${(1 - progress) * 0.5}em)`,
              filter: `blur(${blur}px)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
