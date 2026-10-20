import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  candidatsDansLigne,
  extraireCode,
  commandeUssd,
  urlComposeur,
  nettoyerCode,
  codeValide,
  zoneDansPhoto,
} from './codeRecharge.js';

const ligne = (text, frame = null, confidence = 0.9) => ({ text, frame, confidence });

test('regroupe les chiffres séparés par des espaces ou des tirets', () => {
  assert.deepEqual(candidatsDansLigne('Code : 1234 5678-9012 34'), ['12345678901234']);
});

test('corrige les lettres confondues avec des chiffres', () => {
  assert.deepEqual(candidatsDansLigne('12O4 5S78 9OI2'), ['120455789012']);
});

test('ne touche pas aux mots sans chiffres', () => {
  assert.deepEqual(candidatsDansLigne('SOS Moov'), []);
});

test('choisit la plus longue suite et ignore le numéro de série', () => {
  const resultat = {
    width: 1000,
    height: 600,
    lines: [
      ligne('Serie N° 0012345'),
      ligne('8812 3456 7890 1234'),
      ligne('Moov Africa 500 F'),
    ],
  };
  assert.equal(extraireCode(resultat).code, '8812345678901234');
});

test('privilégie les lignes situées dans le cadre', () => {
  const resultat = {
    width: 1000,
    height: 1000,
    lines: [
      ligne('1111 2222 3333 4444', { x: 0, y: 0, width: 300, height: 50 }),
      ligne('9876 5432 1098', { x: 200, y: 450, width: 600, height: 80 }),
    ],
  };
  const zone = { x: 0.1, y: 0.3, width: 0.8, height: 0.4 };
  assert.equal(extraireCode(resultat, { zone }).code, '987654321098');
});

test('revient à toute l’image si le cadre est vide', () => {
  const resultat = {
    width: 1000,
    height: 1000,
    lines: [ligne('1111 2222 3333 4444', { x: 0, y: 0, width: 300, height: 50 })],
  };
  const zone = { x: 0.1, y: 0.3, width: 0.8, height: 0.4 };
  assert.equal(extraireCode(resultat, { zone }).code, '1111222233334444');
});

test('renvoie null sans code plausible', () => {
  assert.equal(extraireCode({ width: 1, height: 1, lines: [ligne('Merci')] }).code, null);
});

test('génère la commande USSD et l’URL du composeur', () => {
  const commande = commandeUssd('101', '123456789012');
  assert.equal(commande, '*101*123456789012#');
  assert.equal(urlComposeur(commande), 'tel:*101*123456789012%23');
});

test('nettoie et valide la saisie manuelle', () => {
  assert.equal(nettoyerCode('12 34-56'), '123456');
  assert.equal(codeValide('123456'), false);
  assert.equal(codeValide('123456789012'), true);
});

test('projette le cadre de l’aperçu dans la photo', () => {
  // Aperçu 300×150 (2:1) d'une photo 3000×4000 : seule une bande centrale est visible.
  const zone = zoneDansPhoto(
    { width: 300, height: 150 },
    { width: 3000, height: 4000 },
    { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
    0
  );
  assert.ok(Math.abs(zone.x - 0.1) < 1e-9);
  assert.ok(Math.abs(zone.width - 0.8) < 1e-9);
  // Bande visible : 1500 px de haut sur 4000, centrée.
  assert.ok(Math.abs(zone.y - (0.3125 + 0.1 * 0.375)) < 1e-9);
  assert.ok(Math.abs(zone.height - 0.8 * 0.375) < 1e-9);
});
