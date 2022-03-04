import {Point} from './Types'; 

const WINGAMEVALUE = 'JEU'; // Valeur pour indiquer qu'un jeu a été gagner par un joueur
const AVANTAGEVALUE = 'Av'; // Valeur pour indiquer qu'il a l'avatange
const MAXPOINTINGAME = 40;  // Nombre de point max d'un jeu sans avantage
const NBMINGAMEFORWINSET = 6; // Nombre Minimal de Jeu pour gagner un Set
const NBMAXGAMEFORWINSET = 7; // Nombre Maximal de Jeu pour gagner un Set
const ORDREPOINT : Array<Point> = [0,15,30,40]; // Ordre des points d'un jeu

export {WINGAMEVALUE, AVANTAGEVALUE,MAXPOINTINGAME, NBMINGAMEFORWINSET, NBMAXGAMEFORWINSET, ORDREPOINT};