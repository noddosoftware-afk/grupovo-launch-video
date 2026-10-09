import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import React from "react";

import { BrandCard } from "./components/BrandCard";
import { PhotoMoment } from "./components/PhotoMoment";
import { StatsScene } from "./components/StatsScene";
import { FeatureScene } from "./components/FeatureScene";
import { COLORS } from "./fonts";

const T = linearTiming({ durationInFrames: 20 });

export const DURATIONS = {
  intro: 95,
  hero: 140,
  stats: 140,
  especialidades: 155,
  agenda: 155,
  panel: 155,
  tecnologia: 95,
  closing: 110,
};

const SCENES = Object.keys(DURATIONS).length;
const TRANSITIONS = SCENES - 1;

export const TOTAL_DURATION =
  Object.values(DURATIONS).reduce((a, b) => a + b, 0) - 20 * TRANSITIONS;

export const LaunchVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={DURATIONS.intro}>
          <BrandCard
            eyebrow="LEÓN, GTO. · OFTALMOLOGÍA Y SALUD VISUAL"
            tagline="Recupera tu visión, sin depender de lentes."
            showLogo={false}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={T} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.hero}>
          <PhotoMoment src="img/hero.jpg" eyebrow="Grupo VO" title="Especialistas en salud visual" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={T} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.stats}>
          <StatsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={T} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.especialidades}>
          <FeatureScene
            eyebrow="Especialidades"
            title="Soluciones para cada caso"
            bullets={[
              "Cirugía LASIK",
              "Estrabismo",
              "Crosslinking Corneal",
              "Cirugía de Catarata",
            ]}
            mockupSrc="ui/servicios.jpg"
            mockupHeight={430}
            panDistance={60}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={T} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.agenda}>
          <FeatureScene
            eyebrow="Agenda en línea"
            title="Agendar una cita toma minutos"
            bullets={[
              "Solicitud directa desde el sitio",
              "Recepción confirma el horario disponible",
              "Ya no depende solo de WhatsApp",
            ]}
            mockupSrc="ui/agenda.jpg"
            mockupHeight={430}
            panDistance={120}
            flip
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={T} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.panel}>
          <FeatureScene
            eyebrow="Panel de recepción"
            title="Todo en un solo lugar"
            bullets={[
              "Cada solicitud, organizada al momento",
              "Actualiza el estado de cada cita",
              "Acceso privado para el equipo",
            ]}
            mockupSrc="ui/admin.jpg"
            mockupHeight={430}
            panDistance={40}
            url="grupovo.com.mx/admin"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={T} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.tecnologia}>
          <PhotoMoment src="img/equipo.jpg" eyebrow="Tecnología" title="Diagnóstico especializado" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={T} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.closing}>
          <BrandCard
            eyebrow="AGENDA TU CONSULTA"
            tagline="477 403 8972 · León, Gto."
            showLogo={false}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
