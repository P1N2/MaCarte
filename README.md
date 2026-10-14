# 📱 Macarte — Rechargez sans saisir

**Macarte** est une application mobile conçue pour simplifier le rechargement de crédit téléphonique au Niger grâce à la reconnaissance automatique des codes de recharge.

L'objectif est simple : **scanner, vérifier et recharger**, sans avoir à saisir manuellement une longue série de chiffres.

---

## 📌 À propos du projet

Pour recharger un téléphone à partir d'une carte physique, l'utilisateur doit généralement gratter la carte, recopier le code secret, composer le code USSD de son opérateur, puis lancer la commande.

Cette manipulation peut entraîner des erreurs de saisie et faire perdre du temps.

**Macarte vise à rendre ce processus plus simple, rapide et accessible** grâce à la caméra du téléphone et à la reconnaissance optique de caractères (OCR).

### 💡 Le principe

📷 Scanner la carte → 🔍 Reconnaître le code → ✅ Vérifier les chiffres → 📞 Lancer la commande de recharge

---

## 🎯 Objectifs

- Simplifier l'utilisation des cartes de recharge téléphonique.
- Reconnaître automatiquement les chiffres imprimés sur une carte.
- Réduire les erreurs de saisie manuelle.
- Générer la commande USSD correspondant à l'opérateur sélectionné.
- Permettre la reconnaissance du code directement sur le téléphone, sans dépendre d'un serveur distant.
- Proposer une interface simple, intuitive et adaptée aux utilisateurs au Niger.

---

## ✨ Fonctionnalités

### ✅ Interface mobile

- Interface moderne et intuitive.
- Sélection de l'opérateur téléphonique.
- Écran de scan avec une zone de cadrage dédiée.
- Identité visuelle adaptée à chaque opérateur.

### 🚧 Reconnaissance automatique des codes

Fonctionnalité en cours de développement :

- Capture de l'image de la carte avec la caméra.
- Reconnaissance optique des caractères (OCR).
- Extraction des chiffres du code de recharge.
- Possibilité de vérifier et de corriger le code avant utilisation.

### 🚧 Génération des commandes USSD

L'application prépare la commande de recharge correspondant à l'opérateur choisi.

| Opérateur | Format USSD |
|---|---|
| Moov Africa Niger | `*101*CODE#` |
| Zamani | `*123*CODE#` |
| Airtel Niger | `*136*CODE#` |
| Niger Telecoms | `*132*CODE#` |

**Important :** le code reconnu devra être vérifié par l'utilisateur avant de lancer la commande. La validation finale dépendra du réseau téléphonique et de la carte utilisée.

---

## 📡 Opérateurs pris en charge

La première version cible quatre opérateurs au Niger :

- 🟢 Moov Africa
- 🟡 Zamani
- 🔴 Airtel Niger
- 🟠 Niger Telecoms

---

## 🛠️ Technologies utilisées

| Technologie | Utilisation |
|---|---|
| React Native | Développement de l'application mobile |
| Expo | Environnement de développement |
| JavaScript | Langage principal |
| Expo Camera | Accès à la caméra du téléphone |
| Google ML Kit OCR | Reconnaissance de texte envisagée sur l'appareil |
| Expo Dev Client | Test des modules natifs personnalisés |

---

## 🔐 Confidentialité et fonctionnement hors ligne

Macarte est conçue pour privilégier le traitement local des images et des codes de recharge.

L'objectif est de permettre la reconnaissance des chiffres directement sur le téléphone, sans envoyer les images à un serveur distant.

Le fonctionnement hors ligne du processus OCR sera confirmé lors des tests sur appareil physique.

La commande USSD peut nécessiter une carte SIM active et une connexion au réseau de l'opérateur.

---

## 🏗️ Fonctionnement prévu

```text
          UTILISATEUR
               |
               v
      Choix de l'opérateur
               |
               v
       Capture de la carte
               |
               v
      Reconnaissance OCR
               |
               v
      Extraction des chiffres
               |
               v
       Vérification du code
               |
               v
      Génération de la commande
               |
               v
       Ouverture du composeur
               |
               v
       Validation par l'utilisateur
```

---

## 📂 Structure du projet

```text
Macarte/
├── assets/
│   ├── image.png
│   ├── image1.png
│   ├── image2.png
│   ├── image3.png
│   └── ...
├── App.js
├── app.json
├── package.json
├── package-lock.json
└── README.md
```

*Remarque : la liste des fichiers du dossier `assets` peut évoluer au cours du développement.*

---

## 🚀 Installation et lancement

### Prérequis

- Node.js et npm installés.
- Git installé.
- Un téléphone Android pour les tests.
- Un compte Expo si nécessaire pour les builds avec EAS.

### 1. Cloner le dépôt

```bash
git clone URL_DE_TON_DEPOT
```

Remplace `URL_DE_TON_DEPOT` par l'URL réelle de ton dépôt GitHub.

### 2. Accéder au projet

```bash
cd Macarte
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Lancer le serveur de développement

```bash
npx expo start
```

**Remarque :** les fonctionnalités utilisant des modules natifs, notamment l'OCR, nécessitent un development build compatible. Expo Go seul peut ne pas suffire.

---

## 📊 État du développement

| Fonctionnalité | État |
|---|---|
| Interface d'accueil | ✅ Réalisée |
| Sélection des opérateurs | ✅ Réalisée |
| Affichage des logos | ✅ Intégré |
| Écran de scan | ✅ Interface intégrée |
| Accès à la caméra | 🔄 À tester dans le build |
| Intégration de l'OCR | 🚧 En cours |
| Extraction et correction du code | 🚧 À développer |
| Génération de la commande USSD | 🚧 À intégrer |
| Tests avec des cartes physiques | ⏳ À venir |

---

## 🔮 Perspectives d'évolution

Les améliorations envisagées comprennent :

- Amélioration de la précision de reconnaissance des chiffres.
- Détection et correction des erreurs de lecture.
- Prise en charge de nouveaux opérateurs.
- Historique local des recharges, si nécessaire.
- Amélioration de l'accessibilité.
- Interface multilingue, notamment en français, en haoussa et en zarma.
- Optimisation du cadrage et des conditions de prise de vue.

---

## 🤝 Contributions

Les suggestions et contributions sont les bienvenues.

Pour contribuer :

1. Forker le dépôt.
2. Créer une branche pour les modifications.
3. Effectuer les changements souhaités.
4. Soumettre une Pull Request avec une description claire.

Pour signaler un problème, vous pouvez également ouvrir une *Issue* sur GitHub.

---

## 👨🏽‍💻 Auteur

**Penouel Aoga**

Développeur et concepteur du projet Macarte.

Ce projet est né de la volonté de simplifier une opération quotidienne grâce à une solution mobile pratique et intelligente, adaptée au contexte nigérien.

---

## 📜 Licence

Aucune licence libre n'est définie pour le moment. Les conditions de réutilisation et de redistribution du code restent donc à préciser.

---

<p align="center">
  <strong>Macarte — Rechargez. Sans saisir.</strong>
</p>
