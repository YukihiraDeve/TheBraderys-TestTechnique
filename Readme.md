# TheBraderys-TestTechnique.git
Ce projet a été développé dans le cadre d'un test technique pour le poste de développeur fullstack chez The Braderys, une entreprise dynamique et innovante dans le secteur de l'e-commerce. L'objectif principal était de créer une application de paiement complète, intégrant à la fois un frontend interactif et un backend robuste.
## Démarrage
Instructions sur la façon de lancer le projet sur un ordinateur local à des fins de développement et de test.

## Prérequis
Liste des choses dont tu as besoin pour installer le logiciel et comment les installer.
Node.js / Docker

# Installation
Un guide étape par étape qui te dira comment obtenir un environnement de développement en cours d'exécution.

```Cloner le dépôt :
git clone git@github.com:YukihiraDeve/TheBraderys-TestTechnique.git
cd TheBraderys-TestTechnique.git
```

Installer les dépendances :
```npm install```

Configurer les variables d'environnement :
Crée un fichier ```.env``` à la racine du projet et ajoute les variables nécessaires (par exemple, l'URL de l'API GraphQL).

Lancement du server :
```npm start```
Structrue : 

```
- Frontend/
  - components/    : Composants réutilisables
  - pages/         : Composants de page (CartPage, ProductsPage, etc.)
  - App.js         : Composant racine de l'application
  - index.js       : Point d'entrée de l'application React
  - public/          : Fichiers statiques (images, index.html)
  - .env.example     : Exemple de fichier de configuration des variables d'environnement
```

