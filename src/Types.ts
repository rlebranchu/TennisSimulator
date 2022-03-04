import {WINGAMEVALUE, AVANTAGEVALUE,MAXPOINTINGAME } from './Constantes';

// Type limitant la valeur des points d'un jeu normal
type PointNormal = 0|15|30|typeof MAXPOINTINGAME|typeof AVANTAGEVALUE| typeof WINGAMEVALUE;

// Type limitant la valeur des points d'un jeu de tie break
type PointTieBreak = number;

// Type général des types de points d'un jeu
type Point = PointNormal | PointTieBreak;

// Tableau de Sets
type Score = Array<number>;

function isPointNormalType(arg: Point): arg is PointNormal {
  return [AVANTAGEVALUE,WINGAMEVALUE].some(element => element === arg);
}

export {Point, PointNormal, PointTieBreak, isPointNormalType, Score};