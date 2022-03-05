import Player from '../../src/Player';

describe('Test Player', () => {
    let player: Player
    
    beforeEach(() => player = new Player(1));

    it('nextGameLoser', () => {
        player.score = [1,0,0];
        player.nextGame();
        expect(player.score[0]).toBe(1)
    })

    it('nextGameWinner', () => {
        player.score = [1,0,0];
        player.nextGame(true,0);
        expect(player.score[0]).toBe(2) // Pas de changement de set
    })

    it('nextSetWinnerFirstSet', () => {
        player.nextSet();
        expect(player.nbSetWin).toBe(1) // Pas de changement de set
    })

    it('nextSetWinnerSecondSet', () => {
        player.nbSetWin = 1;
        player.nextSet();
        expect(player.nbSetWin).toBe(2) // Pas de changement de set
    })
})