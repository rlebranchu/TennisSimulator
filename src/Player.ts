import {Score, Point} from './Types';

export default class Player {

    score: Score;       // Nombre de Jeu gagnés par Set
    name: string;       // Nom du Joueur
    gamePoint : Point;  // Point du joueur du jeu en cours
    nbSetWin: number;

    constructor(numero = 0) {
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

    nextGame(currentGameWinning = false, currentSet = 0) : void {
        if(currentGameWinning){
            console.log(this.name + " gagne le Set !" + "\n" + '----------------------------'); 
            // On gagne un jeu en plus dans le set en cours
            this.score[currentSet]++;
        }
        // On repars sur un autre set
        this.gamePoint = 0;
    }

    nextSet() : void {
        // Fonction appelé uniquement pour le gagnant du point, du jeu et du set
        this.nbSetWin++;
    }

    setState(score: Score, point: Point, nbSetWin: number): void {
        this.score = score;
        this.gamePoint = point;
        this.nbSetWin = nbSetWin;
    }
}