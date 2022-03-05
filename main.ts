import Match  from './src/Match';
import { MatchScore } from './src/Types';

const match = Match.getInstance();
match.init();

// On établit un score de départ
const score: MatchScore = {
    playerOneScore: [6,0,0],
    playerTwoScore: [5,0,0],
    playerOnePoint: 0,
    playerTwoPoint: 30
}
match.setScore(score);

// Le joueur deux gagne un point
match.playerOneScores();

// Le joueur deux gagne un point
match.playerTwoScores();

// On génère 50 points suivants
for (let i=0;i<50;i++){
    match.playPoint();
}