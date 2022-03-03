import {WINGAMEVALUE, AVANTAGEVALUE,MAXPOINTINGAME } from './Constantes';

type PointNormal = 0|15|30|typeof MAXPOINTINGAME|typeof AVANTAGEVALUE| typeof WINGAMEVALUE; // Type limitant la valeur des points d'un jeu normal
type PointTieBreak = number ; // Type limitant la valeur des points d'un jeu de tie break
type Point = PointNormal | PointTieBreak; // Type général des types de points d'un jeu
type Score = Array<number>; // Tableau de Sets

function isPointNormalType(arg: Point): arg is PointNormal {
    return [MAXPOINTINGAME,AVANTAGEVALUE,WINGAMEVALUE].some(element => element === arg);
  }

export {Point, PointNormal, PointTieBreak, isPointNormalType, Score};