import { AVANTAGEVALUE } from '../../src/Constantes';
import Match from '../../src/Match';

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
        match.getPlayerOne().score = [5,0,0];
        match.getPlayerTwo().gamePoint = 15;
        match.getPlayerTwo().score = [2,0,0];
        expect(match.getCurrentSet()).toBe(0)

        match.playerOneScores();
        
        expect(match.getCurrentSet()).toBe(1)
        expect(match.getPlayerOne().gamePoint).toBe(0)
        expect(match.getPlayerTwo().gamePoint).toBe(0)
    })

    

})