# 📱 Macarte

<p align="center">
  <img src="./assets/icon.png" width="120" alt="Macarte Logo"/>
</p>

<h3 align="center">
  Rechargez votre compte téléphonique sans saisir vos codes.
</h3>

<p align="center">
  Une application mobile intelligente qui simplifie le rechargement des cartes téléphoniques grâce à la reconnaissance automatique des codes.
</p>


---

## 🚀 À propos du projet

**Macarte** est une application mobile conçue pour simplifier l'utilisation des cartes de recharge téléphoniques au Niger.

Aujourd'hui, pour recharger un compte mobile, l'utilisateur doit :

1. Acheter une carte de recharge.
2. Gratter la zone cachée.
3. Retenir ou recopier une longue série de chiffres.
4. Composer manuellement un code USSD.
5. Lancer l'appel pour effectuer la recharge.

Cette manipulation peut être longue, source d'erreurs et difficile pour certains utilisateurs.

**Macarte propose une expérience plus simple :**

📷 Scanner la carte → 🔍 Extraire automatiquement le code → ✅ Vérifier → 📞 Recharger


---

# 🎯 Objectif

Créer une application mobile capable de :

- Scanner une carte de recharge avec la caméra du téléphone.
- Extraire automatiquement les chiffres du code grâce à l'OCR.
- Générer automatiquement la commande USSD adaptée à l'opérateur.
- Fonctionner hors connexion Internet.
- Simplifier le rechargement pour les utilisateurs nigériens.


---

# ✨ Fonctionnalités prévues

## ✅ Interface utilisateur

- Choix du réseau téléphonique.
- Interface simple et adaptée aux utilisateurs mobiles.
- Design moderne.
- Fonctionnement hors ligne.


## 🔄 Scan intelligent

- Utilisation de la caméra du téléphone.
- Zone de cadrage dédiée pour améliorer la précision.
- Reconnaissance automatique des chiffres.


## 🔍 Reconnaissance OCR

L'application utilisera une technologie de reconnaissance de texte embarquée afin de lire les codes directement depuis la carte.

Objectif :

- Pas d'envoi d'image vers un serveur.
- Traitement directement sur le téléphone.
- Respect de la confidentialité.


## 📞 Génération USSD

Après extraction du code, Macarte prépare automatiquement la commande adaptée au réseau :

| Opérateur | Format |
|---|---|
| Moov Africa | `*101*CODE#` |
| Zamani Telecom | `*123*CODE#` |
| Airtel Niger | `*136*CODE#` |
| Niger Telecoms | `*132*CODE#` |


---

# 📱 Réseaux supportés

Version initiale :

- 🟢 Moov Africa Niger
- 🔴 Airtel Niger
- 🟠 Niger Telecoms
- 🟡 Zamani Telecom


---

# 🛠️ Technologies utilisées

## Mobile

- React Native
- Expo
- JavaScript


## Modules

- Expo Camera
- ML Kit OCR
- Expo Dev Client


## Architecture

Application pensée pour fonctionner :

- Sans serveur obligatoire.
- Sans connexion Internet pour le scan.
- Avec stockage local.


---

# 🏗️ Architecture du fonctionnement
