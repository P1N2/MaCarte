// Extraction du code de recharge à partir du texte reconnu par l'OCR.
// Logique pure (sans React Native) pour pouvoir être testée avec `npm test`.

// Lettres que l'OCR confond souvent avec des chiffres sur les cartes grattées.
const CONFUSIONS = {
  O: '0', o: '0', D: '0', Q: '0',
  I: '1', l: '1', i: '1', '|': '1', '!': '1',
  Z: '2', z: '2',
  S: '5', s: '5',
  G: '6', b: '6',
  T: '7',
  B: '8',
  g: '9', q: '9',
};

// Longueurs acceptées pour un code de recharge.
export const LONGUEUR_MIN = 10;
export const LONGUEUR_MAX = 20;

/** Remplace les lettres ambiguës par des chiffres lorsqu'elles sont entourées de chiffres. */
function corrigerConfusions(texte) {
  return texte.replace(/[A-Za-z|!]/g, (car, index) => {
    const avant = texte.slice(Math.max(0, index - 2), index);
    const apres = texte.slice(index + 1, index + 3);
    const voisinChiffre = /\d/.test(avant) || /\d/.test(apres);
    return voisinChiffre && CONFUSIONS[car] ? CONFUSIONS[car] : car;
  });
}

/**
 * Renvoie les suites de chiffres candidates d'une ligne. Les espaces, tirets
 * et points entre groupes de chiffres (ex. « 1234 5678 9012 ») sont ignorés.
 */
export function candidatsDansLigne(ligne) {
  const corrigee = corrigerConfusions(ligne);
  const groupes = corrigee.match(/\d(?:[\d \-.]*\d)?/g) ?? [];
  return groupes.map((groupe) => groupe.replace(/\D/g, ''));
}

/**
 * Garde les lignes dont le centre se trouve dans la zone de cadrage.
 * @param zone rectangle normalisé { x, y, width, height } entre 0 et 1.
 */
export function lignesDansZone(resultat, zone) {
  const { width, height, lines } = resultat;
  if (!zone || !width || !height) return lines;
  return lines.filter(({ frame }) => {
    if (!frame) return true;
    const cx = (frame.x + frame.width / 2) / width;
    const cy = (frame.y + frame.height / 2) / height;
    return (
      cx >= zone.x && cx <= zone.x + zone.width &&
      cy >= zone.y && cy <= zone.y + zone.height
    );
  });
}

/**
 * Choisit le code de recharge le plus probable dans un résultat OCR.
 * @returns {{ code: string | null, candidats: string[] }}
 */
export function extraireCode(resultat, { zone, longueurMin = LONGUEUR_MIN, longueurMax = LONGUEUR_MAX } = {}) {
  const lignesZone = lignesDansZone(resultat, zone);
  // Si rien n'est détecté dans le cadre, on se rabat sur toute l'image.
  const lignes = lignesZone.length > 0 ? lignesZone : resultat.lines;

  const vus = new Set();
  const candidats = [];
  for (const ligne of lignes) {
    for (const suite of candidatsDansLigne(ligne.text)) {
      if (suite.length < longueurMin || suite.length > longueurMax || vus.has(suite)) continue;
      vus.add(suite);
      candidats.push({ suite, confiance: ligne.confidence ?? 0 });
    }
  }

  // Le code secret est en général la plus longue suite de chiffres de la carte
  // (le numéro de série est plus court) ; à longueur égale, la plus fiable gagne.
  candidats.sort((a, b) => b.suite.length - a.suite.length || b.confiance - a.confiance);
  return {
    code: candidats[0]?.suite ?? null,
    candidats: candidats.map((c) => c.suite),
  };
}

/** Ne garde que les chiffres (saisie ou correction manuelle). */
export function nettoyerCode(texte) {
  return (texte ?? '').replace(/\D/g, '');
}

export function codeValide(code) {
  return code.length >= LONGUEUR_MIN && code.length <= LONGUEUR_MAX;
}

/** Commande USSD de recharge, ex. `*101*123456789012#`. */
export function commandeUssd(prefixe, code) {
  return `*${prefixe}*${code}#`;
}

/** URL `tel:` à ouvrir dans le composeur (`#` doit être encodé). */
export function urlComposeur(commande) {
  return `tel:${commande.replace(/#/g, '%23')}`;
}

/**
 * Convertit le cadre affiché dans l'aperçu caméra en zone normalisée de la photo.
 * L'aperçu remplit son conteneur (mode « cover ») : une partie de la photo est
 * rognée à l'écran. Une marge est ajoutée pour tolérer un cadrage imprécis.
 * @param apercu taille du conteneur de l'aperçu { width, height }
 * @param photo taille de la photo { width, height }
 * @param cadre cadre normalisé dans l'aperçu { x, y, width, height }
 */
export function zoneDansPhoto(apercu, photo, cadre, marge = 0.1) {
  const echelle = Math.max(apercu.width / photo.width, apercu.height / photo.height);
  // Fraction de la photo réellement visible dans l'aperçu.
  const visibleL = apercu.width / (photo.width * echelle);
  const visibleH = apercu.height / (photo.height * echelle);
  const x = (1 - visibleL) / 2 + cadre.x * visibleL;
  const y = (1 - visibleH) / 2 + cadre.y * visibleH;
  const w = cadre.width * visibleL;
  const h = cadre.height * visibleH;
  const x0 = Math.max(0, x - marge);
  const y0 = Math.max(0, y - marge);
  return {
    x: x0,
    y: y0,
    width: Math.min(1, x + w + marge) - x0,
    height: Math.min(1, y + h + marge) - y0,
  };
}
