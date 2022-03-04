import Match  from './src/Match';

const match = Match.getInstance();
match.init();
for (let i=0;i<200;i++){
    match.playPoint();
}