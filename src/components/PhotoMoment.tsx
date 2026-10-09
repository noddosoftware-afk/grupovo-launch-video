import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from "remotion";
import React from "react";
import { KineticText } from "./KineticText";
import { COLORS, inter } from "../fonts";

type Props = {
  src: string;
  eyebrow: string;
  title: string;
};

export const PhotoMoment: React.FC<Props> = ({ src, eyebrow, title }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 90], [1, 1.1]);
  const eyebrowOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.1) 45%, rgba(10,10,10,0.3) 100%)",
        }}
      />
      <AbsoluteFill
        style={{ justifyContent: "flex-end", alignItems: "center", padding: "0 80px 90px" }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 22,
            letterSpacing: "0.45em",
            color: COLORS.gold,
            opacity: eyebrowOpacity,
            marginBottom: 18,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
        <KineticText text={title} delay={20} fontSize={72} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
