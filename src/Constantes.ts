import {Point} from './Types'; 

// Valeur pour indiquer qu'un jeu a été gagner par un joueur
const WINGAMEVALUE = 'JEU'; 

// Valeur pour indiquer qu'il a l'avantange
const AVANTAGEVALUE = 'Av'; 

// Nombre de point max d'un jeu sans avantage
const MAXPOINTINGAME = 40;  

// Nombre Minimal de Jeu pour gagner un Set
const NBMINGAMEFORWINSET = 6; 

 // Nombre Maximal de Jeu pour gagner un Set
const NBMAXGAMEFORWINSET = 7;

 // Ordre des points d'un jeu
const ORDREPOINT : Array<Point> = [0,15,30,MAXPOINTINGAME];

export {WINGAMEVALUE, AVANTAGEVALUE,MAXPOINTINGAME, NBMINGAMEFORWINSET, NBMAXGAMEFORWINSET, ORDREPOINT};