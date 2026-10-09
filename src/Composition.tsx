import { Composition } from "remotion";
import { LaunchVideo, TOTAL_DURATION } from "./LaunchVideo";

export const MyComposition = () => {
  return (
    <Composition
      id="GrupoVOLaunch"
      component={LaunchVideo}
      durationInFrames={TOTAL_DURATION}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
