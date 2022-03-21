import Player from './Player';
import { ErrorMessage, isPointNormal, isPointTieBreak, MatchScore, Point, PointTieBreak } from './Types';
import { AVANTAGEVALUE, MAXPOINTINGAME, NBMAXGAMEFORWINSET, NBMINGAMEFORWINSET, ORDREPOINT, WINGAMEVALUE } from './Constantes';

export default class Match {
    private static instance: Match;

    private _playerOne: Player = new Player(1);
    private _playerTwo: Player = new Player(2);
    private _currentSet = 0;        // Premier set : currentSet à zéro (pour gestion d'index de tableau)
    private _isFinished = false;    // La match est-il finit ?

    public static getInstance(): Match {
        return this.instance ?? new Match();
    }

    public init(): void {
        console.log("========================================================" + '\n' +
            "=================    DEBUT DU MATCH    =================" + '\n' +
            "========================================================")
        this._playerOne = new Player(1);
        this._playerTwo = new Player(2);
        this._currentSet = 0;
        this._isFinished = false;
        this.afficheScore();
    }

    private afficheScore(): void {
        this._playerOne.showScore();
        this._playerTwo.showScore();
        console.log('\n');
    }

    public playPoint(): void {
        // Si la partie n'est pas finie
        if (!this._isFinished) {
            if (Math.random() > 0.5)  // Random entre 0 et 1 : true et false au probabilité équivalente
                this.playerOneScores();
            else
                this.playerTwoScores();
        }
    }

    // Fonction éxecutée quand le Joueur 1 gagne un point
    public playerOneScores(): void {
        // Si la partie n'est pas finie
        if (!this._isFinished) {
            console.log(this._playerOne.name + " gagne le point !" + "\n" + '----------------------------');
            // Appel l'algorithme qui va calculer les points
            if (this._playerOne.score[this._currentSet] == 6 && this._playerTwo.score[this._currentSet] == 6) { // Set en Tie-Break
                this.comparePointTieBreak(this._playerOne, this._playerTwo);
            } else { // Set normal
                this.comparePoint(this._playerOne, this._playerTwo);
            }
            // On regarde si c'est la fin du jeu, set ou match
            this.analyseSituationAfterPoint(this._playerOne, this._playerTwo);
        }
    }

    // Fonction éxecutée quand le Joueur 2 gagne un point
    public playerTwoScores(): void {
        // Si la partie n'est pas finie
        if (!this._isFinished) {
            console.log(this._playerTwo.name + " gagne le point !" + "\n" + '----------------------------');
            // Appel l'algorithme qui va calculer les points
            // Si les deux joueurs sont à 6 jeux chacun il faut faire un TieBreak
            if (this._playerOne.score[this._currentSet] == 6 && this._playerTwo.score[this._currentSet] == 6) {
                this.comparePointTieBreak(this._playerTwo, this._playerOne);
            } else { // Set normal
                this.comparePoint(this._playerTwo, this._playerOne);
            }
            // On regarde si c'est la fin du jeu, set ou match
            this.analyseSituationAfterPoint(this._playerTwo, this._playerOne);
        }
    }

    // public only for jest
    public comparePoint(playerWinner: Player, playerLoser: Player): void {
        let playerWinnerPoint: Point = playerWinner.gamePoint; // A null : si a la fin c'est NULL -> c'est que j'ai gagné le jeu
        let playerLoserPoint: Point = playerLoser.gamePoint;
        switch (playerWinner.gamePoint) { // Condition en fonction de mes points actuels
            case MAXPOINTINGAME: //40
                // Je regarde si l'adversaire à aussi 40 -> je prend l'avantage et il reste à 40
                if (playerLoserPoint == MAXPOINTINGAME) {
                    playerWinnerPoint = AVANTAGEVALUE;
                    // Sinon je regarde si l'adversaire à l'avatange -> il redescend à 40 et je reste à 40
                } else if (playerLoserPoint == AVANTAGEVALUE) {
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
                playerWinnerPoint = ORDREPOINT[ORDREPOINT.indexOf(playerWinner.gamePoint) + 1];
                break;
        }
        // On attribut les points au joueurs
        playerWinner.gamePoint = playerWinnerPoint;
        playerLoser.gamePoint = playerLoserPoint;
    }

    // public only for jest
    public comparePointTieBreak(playerWinner: Player, playerLoser: Player): void {
        let playerWinnerPoint: Point = playerWinner.gamePoint;
        const playerLoserPoint: Point = playerLoser.gamePoint;
        if (isPointTieBreak(playerWinnerPoint) && isPointTieBreak(playerLoserPoint)) { // On vérifie que les points actuels sont bien des entiers : sinon erreur
            playerWinnerPoint++;
            // Si le score du joueur ayant gagné le point atteint au minimum 7 et qu'il a deux points d'écarts
            if (playerWinnerPoint >= 7 && playerWinnerPoint >= playerLoserPoint + 2)
                playerWinnerPoint = WINGAMEVALUE;
        } else {
            console.log('Erreur dans le calul de point du Tie Break');
        }
        // On attribut les points au joueurs
        playerWinner.gamePoint = playerWinnerPoint;
        playerLoser.gamePoint = playerLoserPoint;
    }

    // pulic only for jest
    public analyseSituationAfterPoint(playerWinner: Player, playerLoser: Player): void {
        // On regarde si le joueur à gagné le set
        if (playerWinner.gamePoint == WINGAMEVALUE) {
            console.log(playerWinner.name + " gagne le Jeu !" + "\n" + '----------------------------');
            // si oui, il faut passer sur le jeu suivant
            playerWinner.nextGame(true, this._currentSet);
            playerLoser.nextGame();

            // On regarde s'il a gagné le set : si oui, on incrémente le nombre de set gagné
            if (this.isSetWon(playerWinner.score[this._currentSet], playerLoser.score[this._currentSet])) {
                //On indique au joueur gagnant qu'il a gagné le set
                playerWinner.nextSet();

                // On change de set
                this._currentSet++;

                //Affiche le nouveau score 
                this.afficheScore();

                // On vérifie maintenant que si le match est terminé 
                // (Si le joueur gagnant a deux sets gagnés)
                if (this.isMatchWon(playerWinner.nbSetWin)) {
                    console.log("========================================================" + '\n' +
                        "==================    FIN DU MATCH    ==================" + '\n' +
                        "===============   VAINQUEUR : " + playerWinner.name + "   ===============" + '\n' +
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

    public isSetWon(nbGameWinner: number, nbGameLoser: number): boolean {
        let isSetWin = false;
        // On regarde si on a gagné le set en cours
        switch (nbGameWinner) {
            case NBMINGAMEFORWINSET: // 6 : on gagne si l'adversaire à 4 ou moins
                isSetWin = nbGameLoser <= 4;
                break;
            case NBMAXGAMEFORWINSET: // 7 : on gagne dans tous les cas
                isSetWin = true;
                break;
            default: // Dans les autres cas, on ne gagne pas le set en cours
                break;
        }
        return isSetWin;
    }

    public isMatchWon(nbSetWin: number): boolean {
        return nbSetWin == 2;
    }

    public setScore(matchScore: MatchScore): ErrorMessage {
        //Analyse de la véracité des deux scores
        const playerWinnerOnSet: Player = new Player(0);
        const playerLoserOnSet: Player = new Player(0);

        // on vérifie que les scores on des nombres de jeux cohérents;
        const maxScorePlayerOne = Math.max(...matchScore.playerOneScore);
        const minScorePlayerOne = Math.min(...matchScore.playerOneScore);
        const maxScorePlayerTwo = Math.max(...matchScore.playerTwoScore);
        const minScorePlayerTwo = Math.min(...matchScore.playerTwoScore);
        if(maxScorePlayerOne > 7 || maxScorePlayerTwo > 7|| minScorePlayerOne < 0 || minScorePlayerTwo <0)
            return {code: 1, message: "Les scores attribués ne sont pas bons : avoir des jeux entre 0 et 7"};

        let currentSet = 0;
        this.getCurrentWinner(matchScore, playerWinnerOnSet, playerLoserOnSet, currentSet);
        let setFinished = this.isSetWon(playerWinnerOnSet.score[currentSet], playerLoserOnSet.score[currentSet]);
        let matchFinished = false;
        // Si le premier set n'est pas terminé : on regarde si le second set est commencé
        if (!setFinished) {
            if (matchScore.playerOneScore[currentSet+1] != 0 || matchScore.playerTwoScore[currentSet+1] != 0 || // Second set commencé
                matchScore.playerOneScore[currentSet+2] != 0 || matchScore.playerTwoScore[currentSet+2] != 0 ) { // Troisième set commencé
                return {code: 2, message: "Le second (ou le troisième) set commence sans que le premier ne soit terminé !"};
            }
        } else { // Sinon on regarde si le deuxième set est terminé
            currentSet = 1;
            this.getCurrentWinner(matchScore, playerWinnerOnSet, playerLoserOnSet, currentSet);
            setFinished = this.isSetWon(playerWinnerOnSet.score[currentSet], playerLoserOnSet.score[currentSet]);
            // Si le second set n'est pas terminé : on regarde si le troisième set est commencé
            if (!setFinished) {
                if (matchScore.playerOneScore[currentSet+1] != 0 || matchScore.playerTwoScore[currentSet+1] != 0) { // Troisième set commencé
                    return {code: 3, message: "Le troisieme set commence sans que le second ne soit terminé !" };
                }
            } else { // Si le premier est terminé et le deuxième aussi : on est au troisième set
                currentSet = 2;
                // On vérifie s'il est terminé
                this.getCurrentWinner(matchScore, playerWinnerOnSet, playerLoserOnSet, currentSet);
                if(this.isSetWon(playerWinnerOnSet.score[currentSet], playerLoserOnSet.score[currentSet])){
                    matchFinished = true;
                }
            }
        }        

        // Vérification de la véracité des points entre les joueurs
        // Double Avantage
        if(matchScore.playerOnePoint == AVANTAGEVALUE && matchScore.playerTwoPoint == AVANTAGEVALUE)
            return {code: 4, message: "Les deux joueurs ne peuvent pas être l'avantage"};
        //Point de Tie-Break
        if((matchScore.playerOnePoint == AVANTAGEVALUE || matchScore.playerTwoPoint == AVANTAGEVALUE) &&
            matchScore.playerOneScore[currentSet] == 6 && matchScore.playerTwoScore[currentSet] == 6
        )
            return {code: 5, message: "Impossible d'avoir un avantage dans un jeu de tie-break"};
        // Avantage avec autre Joueur pas à 40
        if([matchScore.playerOnePoint, matchScore.playerTwoPoint].includes(AVANTAGEVALUE) && ![matchScore.playerOnePoint, matchScore.playerTwoPoint].includes(MAXPOINTINGAME))
            return {code: 6, message: "Si l'un joueur à l'avantage, l'autre doit avoir 40 points"};
        // Si on est pas dans un tie-break, ne pouvoir avoir que des points de Type PointNormaux
        if(!(isPointNormal(matchScore.playerOnePoint) && isPointNormal(matchScore.playerTwoPoint)) &&
            !(matchScore.playerOneScore[currentSet] == 6 && matchScore.playerTwoScore[currentSet] == 6)
        )
            return {code: 7, message: "L'un des joueurs a des points imprévus dans un jeu normal"};
        // Si on est dans un tie-break, les points ne doivent pas avoir deux points d'écart : si l'un des joueurs a plus (ou égale à 7 points)
        if(matchScore.playerOneScore[currentSet] == 6 && matchScore.playerTwoScore[currentSet] == 6 &&
            Math.max((matchScore.playerOnePoint as PointTieBreak),(matchScore.playerTwoPoint as PointTieBreak)) >= 7 &&
            Math.abs((matchScore.playerOnePoint as PointTieBreak) - (matchScore.playerTwoPoint as PointTieBreak)) > 1
        )
            return {code: 8, message: "Dans un tie-break, les points ne peuvent pas avoir plus d'un point d'écart"};

        // Si nous arrivons jusqu'ici, c'est que les vérifications sont bonnes
        // On compte le nombre de set gagnés par chacun
        let nbSetWinOne = 0;
        let nbSetWinTwo = 0;
        for(let i = 0; i < currentSet; i++){
            if(matchScore.playerOneScore[i] > matchScore.playerTwoScore[i]){
                nbSetWinOne++;
            } // on ne peut pas faire de else car si nbJeu égals entre les deux joueurs : on ne veut pas donner +1 au joueur deux
            if(matchScore.playerOneScore[i] < matchScore.playerTwoScore[i]){
                nbSetWinTwo++;
            }
        }

        // Si quelqu'un a deux sets sur les deux premiers set, le troisième set ne doit pas être commencé
        if(nbSetWinOne == 2 || nbSetWinTwo ==2){
            matchFinished = true;
            if((matchScore.playerOnePoint != 0 || matchScore.playerTwoPoint != 0 ))
                return {code: 9, message: "Un joueur a gagné les deux premiers sets : le troisième set doit être vide"};
        }

        // Nous pouvons donc affectés ce nouveau score à celui du match
        this._currentSet = currentSet;
        this._isFinished = matchFinished;
        this._playerOne.setState(matchScore.playerOneScore,matchScore.playerOnePoint,nbSetWinOne);
        this._playerTwo.setState(matchScore.playerTwoScore,matchScore.playerTwoPoint,nbSetWinTwo);

        return {code: 0, message: ""};
    }

    private getCurrentWinner(matchScore: MatchScore, playerWinnerOnSet: Player, playerLoserOnSet: Player, numSet: number) : number {
        if (matchScore.playerOneScore[numSet] >= matchScore.playerTwoScore[numSet]) { // On estime que le premier joueur est le dernier gagnant
            playerWinnerOnSet.score = matchScore.playerOneScore;
            playerWinnerOnSet.gamePoint = matchScore.playerOnePoint;
            playerLoserOnSet.score = matchScore.playerTwoScore;
            playerLoserOnSet.gamePoint = matchScore.playerTwoPoint;
            return 1;
        } else { // Sinon c'est le deuxième joueur qui gagne le premier set
            playerWinnerOnSet.score = matchScore.playerTwoScore;
            playerWinnerOnSet.gamePoint = matchScore.playerTwoPoint;
            playerLoserOnSet.score = matchScore.playerOneScore;
            playerLoserOnSet.gamePoint = matchScore.playerOnePoint;
            return 2;
        }
    }


    // GETTER FUNCTIONS (only use for Jest)
    public getPlayerOne(): Player { return this._playerOne }
    public getPlayerTwo(): Player { return this._playerTwo }
    public getCurrentSet(): number { return this._currentSet }
    public getIsFinished(): boolean { return this._isFinished }
}