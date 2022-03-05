import { AVANTAGEVALUE } from '../../src/Constantes';
import Match from '../../src/Match';
import { MatchScore, Point, PointNormal, Score } from '../../src/Types';

describe('Test Match', () => {
    let match: Match

    beforeEach(() => match = Match.getInstance());

    it('init', () => {
        match.init()
        expect(match.getCurrentSet()).toBe(0)
        expect(match.getIsFinished()).toBe(false)
    })

    it('comparePointWithPlayerOneWinner', () => {
        match.playerOneScores();
        expect(match.getPlayerOne().gamePoint).toBe(15)
        expect(match.getPlayerTwo().gamePoint).toBe(0)
    })

    it('comparePointWithPlayerTwoWinner', () => {
        match.playerTwoScores();
        expect(match.getPlayerOne().gamePoint).toBe(0)
        expect(match.getPlayerTwo().gamePoint).toBe(15)
    })

    it('comparePointEndGame', () => {
        match.getPlayerOne().gamePoint = 40;
        match.getPlayerTwo().gamePoint = 15;
        match.playerOneScores();
        expect(match.getPlayerOne().gamePoint).toBe(0) // Debut jeu suivant
        expect(match.getPlayerTwo().gamePoint).toBe(0) // Debut jeu suivant
    })

    it('comparePointGoToAvantage', () => {
        match.getPlayerOne().gamePoint = 40;
        match.getPlayerTwo().gamePoint = 40;
        match.playerOneScores();
        expect(match.getPlayerOne().gamePoint).toBe(AVANTAGEVALUE)
        expect(match.getPlayerTwo().gamePoint).toBe(40)
    })

    it('comparePointCancelAvantage', () => {
        match.getPlayerOne().gamePoint = 40;
        match.getPlayerTwo().gamePoint = AVANTAGEVALUE;
        match.playerOneScores();
        expect(match.getPlayerOne().gamePoint).toBe(40)
        expect(match.getPlayerTwo().gamePoint).toBe(40)
    })

    it('analyseSituationAfterPointButNotEndSet', () => {
        match.getPlayerOne().gamePoint = 40;
        match.getPlayerOne().score = [5, 0, 0];
        match.getPlayerTwo().gamePoint = 15;
        match.getPlayerTwo().score = [2, 0, 0];
        expect(match.getCurrentSet()).toBe(0)

        match.playerOneScores();

        expect(match.getCurrentSet()).toBe(1)
        expect(match.getPlayerOne().gamePoint).toBe(0)
        expect(match.getPlayerTwo().gamePoint).toBe(0)
    })

    it('isSetWonMaxOK', () => {
        expect(match.isSetWon(7, 5)).toBe(true)
    })

    it('isSetWonMinOK', () => {
        expect(match.isSetWon(6, 2)).toBe(true)
    })

    it('isSetWonMinNOK', () => {
        expect(match.isSetWon(6, 5)).toBe(false)
    })

    it('isSetWonCurrentLoserWin', () => {
        expect(match.isSetWon(2, 6)).toBe(false)
    })

    it('isMatchWinOK', () => {
        expect(match.isMatchWon(2)).toBe(true)
    })

    it('isMatchWinNOK', () => {
        expect(match.isMatchWon(1)).toBe(false)
    })

    it('setScoreFirstSetOK', () => {
        const playerOneScore : Score = [5,0,0];
        const playerTwoScore : Score = [2,0,0];
        const playerOnePoint : PointNormal = 15;
        const playerTwoPoint : PointNormal = 30;
        const score: MatchScore = {
            playerOneScore: playerOneScore,
            playerTwoScore: playerTwoScore,
            playerOnePoint: playerOnePoint,
            playerTwoPoint: playerTwoPoint
        }

        const result = match.setScore(score);
        expect(result.code).toBe(0); // Tout va bien -> score accepté
        expect(match.getCurrentSet()).toBe(0);
        expect(match.getPlayerOne().gamePoint).toBe(playerOnePoint);
        expect(match.getPlayerTwo().gamePoint).toBe(playerTwoPoint);
        expect(match.getPlayerOne().score).toBe(playerOneScore);
        expect(match.getPlayerTwo().score).toBe(playerTwoScore);
    })

    it('setScoreSecondSetOK', () => {
        const playerOneScore : Score = [7,0,0];
        const playerTwoScore : Score = [6,2,0];
        const playerOnePoint : PointNormal = 15;
        const playerTwoPoint : PointNormal = 30;
        const score: MatchScore = {
            playerOneScore: playerOneScore,
            playerTwoScore: playerTwoScore,
            playerOnePoint: playerOnePoint,
            playerTwoPoint: playerTwoPoint
        }

        const result = match.setScore(score);
        expect(result.code).toBe(0); // Tout va bien -> score accepté
        expect(match.getCurrentSet()).toBe(1);
        expect(match.getPlayerOne().gamePoint).toBe(playerOnePoint);
        expect(match.getPlayerTwo().gamePoint).toBe(playerTwoPoint);
        expect(match.getPlayerOne().score).toBe(playerOneScore);
        expect(match.getPlayerTwo().score).toBe(playerTwoScore);
    })

    it('setScoreThirdSetOK', () => {
        const playerOneScore : Score = [7,4,1];
        const playerTwoScore : Score = [6,6,0];
        const playerOnePoint : PointNormal = 15;
        const playerTwoPoint : PointNormal = 30;
        const score: MatchScore = {
            playerOneScore: playerOneScore,
            playerTwoScore: playerTwoScore,
            playerOnePoint: playerOnePoint,
            playerTwoPoint: playerTwoPoint
        }

        const result = match.setScore(score);
        expect(result.code).toBe(0); // Tout va bien -> score accepté
        expect(match.getCurrentSet()).toBe(2);
        expect(match.getPlayerOne().gamePoint).toBe(playerOnePoint);
        expect(match.getPlayerTwo().gamePoint).toBe(playerTwoPoint);
        expect(match.getPlayerOne().score).toBe(playerOneScore);
        expect(match.getPlayerTwo().score).toBe(playerTwoScore);
    })

    it('setScoreError1WongNbGameInSet', () => {
        const playerOneScore : Score = [8,4,1];
        const playerTwoScore : Score = [6,6,0];
        const playerOnePoint : PointNormal = 15;
        const playerTwoPoint : PointNormal = 30;
        const startScore : Score = [0,0,0];
        const score: MatchScore = {
            playerOneScore: playerOneScore,
            playerTwoScore: playerTwoScore,
            playerOnePoint: playerOnePoint,
            playerTwoPoint: playerTwoPoint
        }

        const result = match.setScore(score);
        expect(result.code).toBe(1); // Jeu dépensé les limites de jeus possibles : < 0 ou > 7
        expect(match.getCurrentSet()).toBe(0);
        expect(match.getPlayerOne().gamePoint).toBe(0);
        expect(match.getPlayerTwo().gamePoint).toBe(0);
        expect(match.getPlayerOne().score).toStrictEqual(startScore);
        expect(match.getPlayerTwo().score).toStrictEqual(startScore);
    })

    it('setScoreError2StartSecondSetBeforeEndFirstSet', () => {
        const playerOneScore : Score = [4,4,0];
        const playerTwoScore : Score = [3,6,0];
        const playerOnePoint : PointNormal = 15;
        const playerTwoPoint : PointNormal = 30;
        const startScore : Score = [0,0,0];
        const score: MatchScore = {
            playerOneScore: playerOneScore,
            playerTwoScore: playerTwoScore,
            playerOnePoint: playerOnePoint,
            playerTwoPoint: playerTwoPoint
        }

        const result = match.setScore(score);
        expect(result.code).toBe(2); // Début du second set avant que le premier ne soit terminé
        expect(match.getCurrentSet()).toBe(0);
        expect(match.getPlayerOne().gamePoint).toBe(0);
        expect(match.getPlayerTwo().gamePoint).toBe(0);
        expect(match.getPlayerOne().score).toStrictEqual(startScore);
        expect(match.getPlayerTwo().score).toStrictEqual(startScore);
    })

    it('setScoreError2StartThirdSetBeforeEndFirstSet', () => {
        const playerOneScore : Score = [4,0,0];
        const playerTwoScore : Score = [3,0,1];
        const playerOnePoint : PointNormal = 15;
        const playerTwoPoint : PointNormal = 30;
        const startScore : Score = [0,0,0];
        const score: MatchScore = {
            playerOneScore: playerOneScore,
            playerTwoScore: playerTwoScore,
            playerOnePoint: playerOnePoint,
            playerTwoPoint: playerTwoPoint
        }

        const result = match.setScore(score);
        expect(result.code).toBe(2); // Début du troisième set avant que le premier ne soit terminé
        expect(match.getCurrentSet()).toBe(0);
        expect(match.getPlayerOne().gamePoint).toBe(0);
        expect(match.getPlayerTwo().gamePoint).toBe(0);
        expect(match.getPlayerOne().score).toStrictEqual(startScore);
        expect(match.getPlayerTwo().score).toStrictEqual(startScore);
    })

    it('setScoreError3StartSecondBeforeEndFirstSet', () => {
        const playerOneScore : Score = [6,4,0];
        const playerTwoScore : Score = [3,2,1];
        const playerOnePoint : PointNormal = 15;
        const playerTwoPoint : PointNormal = 30;
        const startScore : Score = [0,0,0];
        const score: MatchScore = {
            playerOneScore: playerOneScore,
            playerTwoScore: playerTwoScore,
            playerOnePoint: playerOnePoint,
            playerTwoPoint: playerTwoPoint
        }

        const result = match.setScore(score);
        expect(result.code).toBe(3); // Début du troisème set avant que le second ne soit terminé
        expect(match.getCurrentSet()).toBe(0);
        expect(match.getPlayerOne().gamePoint).toBe(0);
        expect(match.getPlayerTwo().gamePoint).toBe(0);
        expect(match.getPlayerOne().score).toStrictEqual(startScore);
        expect(match.getPlayerTwo().score).toStrictEqual(startScore);
    })

    it('setScoreError4DoubleAvantage', () => {
        const playerOneScore : Score = [6,4,0];
        const playerTwoScore : Score = [3,6,0];
        const playerOnePoint : PointNormal = AVANTAGEVALUE;
        const playerTwoPoint : PointNormal = AVANTAGEVALUE;
        const startScore : Score = [0,0,0];
        const score: MatchScore = {
            playerOneScore: playerOneScore,
            playerTwoScore: playerTwoScore,
            playerOnePoint: playerOnePoint,
            playerTwoPoint: playerTwoPoint
        }

        const result = match.setScore(score);
        expect(result.code).toBe(4); // Les deux joueurs sont à l'avantage
        expect(match.getCurrentSet()).toBe(0);
        expect(match.getPlayerOne().gamePoint).toBe(0);
        expect(match.getPlayerTwo().gamePoint).toBe(0);
        expect(match.getPlayerOne().score).toStrictEqual(startScore);
        expect(match.getPlayerTwo().score).toStrictEqual(startScore);
    })

    it('setScoreError5AvantageInTieBreak', () => {
        const playerOneScore : Score = [6,4,6];
        const playerTwoScore : Score = [3,6,6];
        const playerOnePoint : Point = AVANTAGEVALUE;
        const playerTwoPoint : Point = 5;
        const startScore : Score = [0,0,0];
        const score: MatchScore = {
            playerOneScore: playerOneScore,
            playerTwoScore: playerTwoScore,
            playerOnePoint: playerOnePoint,
            playerTwoPoint: playerTwoPoint
        }

        const result = match.setScore(score);
        expect(result.code).toBe(5); // L'un des joueurs a l'avantage dans un tie-break
        expect(match.getCurrentSet()).toBe(0);
        expect(match.getPlayerOne().gamePoint).toBe(0);
        expect(match.getPlayerTwo().gamePoint).toBe(0);
        expect(match.getPlayerOne().score).toStrictEqual(startScore);
        expect(match.getPlayerTwo().score).toStrictEqual(startScore);
    })

})