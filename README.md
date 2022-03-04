# TennisSimulator
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" width="125px"/>

## Contexte
Ce projet est mon premier projet en TypeScript.
Le but est de découvrir les particularités en le comparant au Javascript.

## Pourquoi le langage TypeScript :
Je suis actuellement en train d'apprendre de nouvelles technologies web et mobiles.
On m'a beaucoup parlé de TypeScript : "Javascript plus strucuturé principalement orienté objet".
C'est donc l'occasion dans apprendre d'avantages.

De plus, il répond aux besoins du projet :
  - Affichage en console (aucune UI nécessaire)
  - Utilisation d'un pattern orienté objet
  - Projet pas trop lourd (comme les projets Java, .Net, etc.) : quelques fichiers suffisent

## Fonctions intégrées :
  - init() : lancement d'une partie
  - playerOneScores() : simuler le point gagné du joueur 1
  - playerTwoScores() : simuler le point gagné du joueur 2
  - playPoint() : simuler le point gagné d'un joueur aléatoirement
  - Intégration de Jest dans le projets pour effectuer des tests unitaires
  - Intégration de EsLint pour accentuer la qualité du code 
 
*D'autres fonctions sont définis mais non-utilisables. Elle permettent un bon fonctionnement du programme.
(Exemple : comparePoint, comparePointTieBreak, analyseSituationAfterPoint, etc.)*

## Fonctions à venir :
  - setScore : donner un état au match en cours

## Comment lancer le projet :
  1. Etablir dans main.js l'algorithme de gain de point (via les fonctions établis ci dessus)
  2. Lancer la commande : npm run start

## Comment lancer les tests unitaires :
  1. Dans le fichier global du projet, lancer la commande : npm test

