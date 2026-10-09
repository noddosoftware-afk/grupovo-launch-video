import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";

// Una sola familia tipográfica — la misma del sitio real — para títulos y
// texto de cuerpo, usando distintos pesos.
export const { fontFamily: jakarta } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
});

// Alias para reusar los componentes heredados (BrandCard, FeatureScene, etc.)
// que importan `syne` (títulos) e `inter` (cuerpo) por nombre.
export const syne = jakarta;
export const inter = jakarta;

export const COLORS = {
  ink: "#0b2e4f", // --azul-900 del sitio
  ink2: "#124a76", // --azul-700
  paper: "#f3f7fa", // --gris-100
  mute: "#7b8ba0", // --gris-400
  gold: "#15b8a6", // --cian-500 (acento de marca)
  accent: "#3dd1be", // --cian-400
};
