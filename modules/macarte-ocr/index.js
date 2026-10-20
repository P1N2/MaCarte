import MacarteOcr from './src/MacarteOcrModule';

/** Indique si l'OCR natif est disponible (development build ou build EAS). */
export function estDisponible() {
  return MacarteOcr != null && MacarteOcr.isAvailable();
}

/**
 * Reconnaît le texte d'une image locale, entièrement sur l'appareil.
 * @param {string} uri URI `file://` de l'image (photo de la caméra, galerie…)
 * @returns {Promise<{ text: string, width: number, height: number,
 *   lines: { text: string, confidence: number,
 *     frame: { x: number, y: number, width: number, height: number } | null }[] }>}
 */
export async function reconnaitreTexte(uri) {
  if (!MacarteOcr) {
    throw new Error(
      "L'OCR hors ligne nécessite un development build (npx expo run:android ou eas build --profile development)."
    );
  }
  return MacarteOcr.recognizeText(uri);
}
