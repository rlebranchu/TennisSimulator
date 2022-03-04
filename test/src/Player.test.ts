import Player from '../../src/Player';

describe('Test Player', () => {
    var player: Player
    
    beforeEach(() => player = new Player(1));

    it('changeGameLoser', () => {
        expect(player.changeGame()).toBe(false)
    })

    it('changeGameWinnerWithoutWinningCurrentGame', () => {
        expect(player.changeGame(0,0,false)).toBe(false) // Pas de changement de set
    })

    it('changeGameWinnerWithWinningCurrentGame', () => {
        expect(player.changeGame(0,0,true)).toBe(false) // Pas de changement de set
    })

    it('changeGameWinnerWithWinButNotEndSet', () => {
        player.score = [1,0,0];
        expect(player.changeGame(0,2,true)).toBe(false) // Pas de changement de set
    })

    it('changeGameWinnerWithWinAndEndSet', () => {
        player.score = [5,0,0];
        expect(player.changeGame(0,4,true)).toBe(true) // Pas de changement de set
    })

    it('changeGameWinnerWithWinButNotEndSetAtSecondSet', () => {
        player.score = [7,2,0];
        expect(player.changeGame(1,2,true)).toBe(false) // Pas de changement de set
    })

    it('changeGameWinnerWithWinAndEndSetAtSecondSet', () => {
        player.score = [7,6,0];
        expect(player.changeGame(1,6,true)).toBe(true) // Pas de changement de set
    })

    it('changeGameWinnerWithWinButNotEndSetAtThirdSet', () => {
        player.score = [7,7,3];
        expect(player.changeGame(2,2,true)).toBe(false) // Pas de changement de set
    })

    it('changeGameWinnerWithWinAndEndSetAtThirdSet', () => {
        player.score = [7,7,6];
        expect(player.changeGame(2,5,true)).toBe(true) // Pas de changement de set
    })

    it('changeGameWinnerCheckCountGame', () => {
        player.score = [4,0,0];
        player.changeGame(0,2,true);
        expect(player.score[0]).toBe(5)  // Incrementation de 1
        expect(player.score[1]).toBe(0)  // Pas set en cours : ne bouge pas
        expect(player.score[2]).toBe(0)  // Pas set en cours : ne bouge pas
    }) 
    
    it('changeGameWinnerWhithSetWinningCheckNbSetWin', () => {
        player.score = [5,0,0];
        player.changeGame(0,2,true);
        expect(player.nbSetWin).toBe(1)  // Incrementation de 1
    }) 

})