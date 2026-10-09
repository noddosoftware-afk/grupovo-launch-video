import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";
import { KineticText } from "./KineticText";
import { COLORS, inter, syne } from "../fonts";

type Stat = { value: string; label: string };

const STATS: Stat[] = [
  { value: "20+", label: "Años de experiencia" },
  { value: "50,000+", label: "Cirugías realizadas" },
  { value: "300,000+", label: "Consultas atendidas" },
];

const StatItem: React.FC<{ stat: Stat; index: number }> = ({ stat, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = 20 + index * 14;

  const scale = spring({
    frame: frame - start,
    fps,
    config: { damping: 200, stiffness: 110, mass: 0.8 },
    from: 0.85,
    to: 1,
  });
  const opacity = interpolate(frame, [start, start + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          fontFamily: syne,
          fontWeight: 800,
          fontSize: 92,
          color: COLORS.gold,
          lineHeight: 1,
        }}
      >
        {stat.value}
      </div>
      <div
        style={{
          marginTop: 14,
          fontFamily: inter,
          fontSize: 24,
          color: "rgba(243,247,250,0.85)",
          textAlign: "center",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
};

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const eyebrowOpacity = interpolate(frame, [4, 18], [0, 1], {
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
      <div
        style={{
          fontFamily: inter,
          fontSize: 22,
          letterSpacing: "0.45em",
          color: COLORS.gold,
          opacity: eyebrowOpacity,
          marginBottom: 10,
          textTransform: "uppercase",
        }}
      >
        Trayectoria
      </div>

      <KineticText text="Experiencia real, respaldada" delay={0} fontSize={48} />

      <div
        style={{
          marginTop: 60,
          display: "flex",
          gap: 90,
        }}
      >
        {STATS.map((s, i) => (
          <StatItem key={s.label} stat={s} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
