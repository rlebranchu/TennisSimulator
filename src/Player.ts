import { NBMAXGAMEFORWINSET, NBMINGAMEFORWINSET } from './Constantes';
import {Score, Point, PointTieBreak} from './Types';

export default class Player {

    score: Score;       // Nombre de Jeu gagnés par Set
    name: string;       // Nom du Joueur
    gamePoint : Point;  // Point du joueur du jeu en cours
    nbSetWin: number;

    constructor(numero: number = 0) {
        this.name = 'Joueur ' + numero;
        this.score = [0,0,0];
        this.gamePoint = 0;
        this.nbSetWin = 0;
    }

    showScore() : void {
        // Affiche le nom de Joueur
        let scoreString = this.name + ' : ';
        // Affiche les trois sets
        scoreString += this.score.join(' | ');
        // Affiche les points du jeu actuel
        scoreString += ' - ' + this.gamePoint;
        console.log(scoreString);
    }

    changeGame(currentSet: number = 0, otherPlayerGame : number = 0, currentGameWinning : boolean = false) : boolean {
        let isSetWin = false;
        if(currentGameWinning){
            // On gagne un jeu en plus dans le set en cours
            this.score = this.score.map((value, index) => {
                if(index == currentSet){
                    return value+1;
                }
                else
                    return value;
            });
            // On regarde si on a gagné le set en cours
            switch (this.score[currentSet]){
                case NBMINGAMEFORWINSET: // 6 : on gagne si l'adversaire à 4 ou moins
                    isSetWin = otherPlayerGame <= 4;
                    break;
                case NBMAXGAMEFORWINSET: // 7 : on gagne dans tous les cas
                    isSetWin = true;
                    break;
                default: // Dans les autres cas, on ne gagne pas le set en cours
                    break;
            }
        }
        // On repars sur un autre set
        this.gamePoint = 0;
        // On regarde s'il a gagné le set : si oui, on incrémente le nombre de set gagné
        if(isSetWin)
            this.nbSetWin++;
        return isSetWin;
    }
}