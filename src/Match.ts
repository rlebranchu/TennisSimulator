import Player from './Player';
import { isPointNormalType, Point } from './Types';
import { AVANTAGEVALUE, MAXPOINTINGAME, ORDREPOINT, WINGAMEVALUE } from './Constantes';

export default class Match {
    private static instance: Match;

    private _playerOne: Player = new Player(1);
    private _playerTwo: Player = new Player(2);
    private _currentSet = 0;        // Premier set : currentSet à zéro (pour gestion d'index de tableau)
    private _isFinished = false;    // La match est-il finit ?

    public static getInstance(): Match {
        return this.instance ?? new Match();
    }

    public init () : void {
        console.log("========================================================" +'\n' +
                    "=================    DEBUT DU MATCH    =================" +'\n' +
                    "========================================================")
        this._playerOne = new Player(1);
        this._playerTwo = new Player(2);
        this._currentSet = 0;
        this._isFinished = false;
        this.afficheScore();
    }

    private afficheScore() : void {
       this._playerOne.showScore();
       this._playerTwo.showScore();
       console.log('\n');
    }

    public playPoint() : void {
        // Si la partie n'est pas fini
        if(!this._isFinished) {
            if(Math.random() > 0.5)  // Random entre 0 et 1 : true et false au probabilité équivalente
                this.playerOneScores();
            else
                this.playerTwoScores();
        }
    }

    // Fonction éxecutée quand le Joueur 1 gagne un point
    public playerOneScores () : void {
        // Si la partie n'est pas fini
        if(!this._isFinished) {
            console.log(this._playerOne.name + " gagne le point !" + "\n" + '----------------------------'); 
            // Appel l'algorithme qui va calculer les points
            if(this._playerOne.score[this._currentSet] == 6 && this._playerTwo.score[this._currentSet] == 6){ // Set en Tie-Break
                this.comparePointTieBreak(this._playerOne, this._playerTwo);
            } else { // Set normal
                this.comparePoint(this._playerOne, this._playerTwo);
            }
            // On regarde si c'est la fin du jeu, set ou match
            this.analyseSituationAfterPoint(this._playerOne, this._playerTwo);
        }
    }

    // Fonction éxecutée quand le Joueur 2 gagne un point
    public playerTwoScores () : void {
        // Si la partie n'est pas fini
        if(!this._isFinished) {
            console.log(this._playerTwo.name + " gagne le point !" + "\n" + '----------------------------'); 
            // Appel l'algorithme qui va calculer les points
            // Si les deux joueurs sont à 6 jeux chacun il faut faire un TieBreak
            if(this._playerOne.score[this._currentSet] == 6 && this._playerTwo.score[this._currentSet] == 6){
                this.comparePointTieBreak(this._playerTwo, this._playerOne);
            } else { // Set normal
                this.comparePoint(this._playerTwo, this._playerOne);
            }
            // On regarde si c'est la fin du jeu, set ou match
            this.analyseSituationAfterPoint(this._playerTwo, this._playerOne);
        }
    }

    // public only for jest
    public comparePoint(playerWinner : Player, playerLoser: Player) : void {
        let playerWinnerPoint : Point = playerWinner.gamePoint; // A null : si a la fin c'est NULL -> c'est que j'ai gagné le jeu
        let playerLoserPoint : Point = playerLoser.gamePoint;
        switch (playerWinner.gamePoint){ // Condition en fonction de mes points actuels
            case MAXPOINTINGAME: //40
                // Je regarde si l'adversaire à aussi 40 -> je prend l'avantage et il reste à 40
                if(playerLoserPoint == MAXPOINTINGAME){
                    playerWinnerPoint = AVANTAGEVALUE;
                // Sinon je regarde si l'adversaire à l'avatange -> il redescend à 40 et je reste à 40
                } else if(playerLoserPoint == AVANTAGEVALUE) {
                    playerLoserPoint = MAXPOINTINGAME; //40
                } else {
                    playerWinnerPoint = WINGAMEVALUE; //'JEU'
                }
                break;
            case AVANTAGEVALUE: // 'AV'
                // Si j'ai déjà l'avantage, je gagne le Jeu
                playerWinnerPoint = WINGAMEVALUE; //'JEU'
                break;
            default:
                // Si je n'ai pas d'avantage ni 40, j'augmente mon score
                playerWinnerPoint = ORDREPOINT[ORDREPOINT.indexOf(playerWinner.gamePoint)+1];
                break;
        }
        // On attribut les points au joueurs
        playerWinner.gamePoint = playerWinnerPoint;
        playerLoser.gamePoint = playerLoserPoint;
    }

    // public only for jest
    public comparePointTieBreak(playerWinner : Player, playerLoser: Player) : void {
        let playerWinnerPoint : Point = playerWinner.gamePoint; // A null : si a la fin c'est NULL -> c'est que j'ai gagné le jeu
        const playerLoserPoint: Point = playerLoser.gamePoint;
        if(!isPointNormalType(playerWinnerPoint) && !isPointNormalType(playerLoserPoint)){ // On vérifie que les points actuels sont bien des entiers : sinon erreur
            playerWinnerPoint++;
            // Si le score du joueur ayant gagné le point atteint au minimum 7 et qu'il a deux points d'écarts
            if(playerWinnerPoint >= 7 && playerWinnerPoint >= playerLoserPoint +2)
                playerWinnerPoint = WINGAMEVALUE;
        } else {
            console.log('Erreur dans le calul de point du Tie Break');
        }
        // On attribut les points au joueurs
        playerWinner.gamePoint = playerWinnerPoint;
        playerLoser.gamePoint = playerLoserPoint;
    }

    // pulic only for jest
    public analyseSituationAfterPoint(playerWinner: Player, playerLoser: Player) : void {
        // On regarde si le joueur à gagné le set
        if(playerWinner.gamePoint == WINGAMEVALUE) {
            console.log(playerWinner.name + " gagne le Jeu !" + "\n" + '----------------------------'); 
            // si oui, il faut passer sur le jeu suivant
            const isSetWin = playerWinner.changeGame(this._currentSet,playerLoser.score[this._currentSet], true);
            playerLoser.changeGame();
            
            // Le joueur a-t-il gagné le set ?
            if(isSetWin) {
                
                console.log(playerWinner.name + " gagne le Set !" + "\n" + '----------------------------'); 
                // On change de set
                this._currentSet++;

                //Affiche le nouveau score 
                this.afficheScore();

                // On vérifie maintenant que si le match est terminé 
                // (Si le joueur gagnant a deux sets gagnés)
                if(playerWinner.nbSetWin == 2) {
                    console.log("========================================================" +'\n' +
                                "==================    FIN DU MATCH    ==================" +'\n' +
                                "===============   VAINQUEUR : "+ playerWinner.name +"   ===============" +'\n' +
                                "========================================================")
                    this._isFinished = true;
                }
            } else {
                //Affiche le nouveau score 
                this.afficheScore();
            }
        } else {
            // Si le joueur n'a pas gagné de nouveau jeu : cela implique qu'il n'a pas gagné le set ni le match
            // on affiche simplement le score
            this.afficheScore();
        }
    }

    public setScore() : void {
        // reste a dev
    }


    // GETTER FUNCTIONS (only use for Jest)
    public getPlayerOne () : Player { return this._playerOne }
    public getPlayerTwo () : Player { return this._playerTwo }
    public getCurrentSet () : number { return this._currentSet }
    public getIsFinished () : boolean { return this._isFinished }
}