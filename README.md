# WIK-DPS-TP02 - Conteneurisation Docker

Ce projet démontre l'utilisation de Docker pour conteneuriser une API web développée dans le cadre du TP WIK-DPS-TP01.

## Description

Le projet comprend :
- Une API TypeScript simple qui renvoie les headers HTTP pour les requêtes GET vers `/ping`
- Trois approches de conteneurisation Docker :
  1. Image Docker single-stage optimisée pour le développement
  2. Image Docker multi-stage optimisée pour la production
  3. Image ultra-légère (<500 bytes) qui affiche les nombres de 0 à 10000

## Structure du projet


WIK-DPS-TP02/
├── README.md                  # Documentation du projet
├── src/                       # Code source de l'API
│   ├── index.ts               # Point d'entrée de l'API
│   ├── package.json           # Dépendances et scripts
│   └── tsconfig.json          # Configuration TypeScript
├── Dockerfile                 # Image Docker single-stage
├── Dockerfile.multistage      # Image Docker multi-stage
├── Dockerfile.bonus           # Image ultra-légère (bonus)
├── counter.c                  # Programme C pour l'image ultra-légère
├── .dockerignore              # Fichiers à ignorer lors du build
└── scan-results/              # Résultats des analyses de sécurité

## Optimisations Docker implémentées

### Image single-stage

- Utilisation d'Alpine Linux pour réduire la taille
- Ordre des layers optimisé pour le cache Docker
- Utilisateur non-root pour renforcer la sécurité

### Image multi-stage

- Séparation des étapes de build et d'exécution
- Inclusion uniquement des dépendances de production
- Exclusion du code source et des outils de build dans l'image finale

### Image bonus

- Base "scratch" (image vide) 
- Programme C compilé statiquement et optimisé
- Taille inférieure à 500 bytes

## Instructions d'utilisation

### Construction des images

```bash
# Image single-stage
docker build -t wik-dps-tp02:single -f Dockerfile .

# Image multi-stage
docker build -t wik-dps-tp02:multi -f Dockerfile.multistage .

# Image minimaliste (bonus)
docker build -t wik-dps-tp02:minimal -f Dockerfile.bonus .