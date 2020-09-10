import { store } from '@risingstack/react-easy-state';

let GameStoreInterval;
let GameStoreIntervalTimeElapsed;
const GameStore = store({
    horses: [
        {
            id: 1,
            name: "tipo 1"
        },
        {
            id: 2,
            name: "tipo 2"
        },
        {
            id: 3,
            name: "tipo 3"
        },
        {
            id: 4,
            name: "tipo 4"
        }
    ],

    positions: [],
    addPosition: (name) => GameStore.positions.push(name),

    horsesFinished: 0,
    incrementHorsesFinished: () => GameStore.horsesFinished++,

    raceInProgress: false,

    timeElapsed: 0,
    incrementTimeElapsed: () => GameStore.timeElapsed++,

    fasterRace: 0,

    moveHorses: () => {
        GameStore.horses.forEach(horse => {
            let nextPosition = Math.floor((Math.random() * 10) + 10);
            let horseFinished = horse.position >= window.screen.width - 100;


            if (!horseFinished) {
                horse.position = horse.position + nextPosition;
            } else if (!horse.finished) {
                clearInterval(GameStoreIntervalTimeElapsed);
                horse.finished = true;
                horse.position = window.screen.width - 100;
                GameStore.addPosition(horse.name);
                GameStore.incrementHorsesFinished();


                if (GameStore.fasterRace === 0 || (GameStore.timeElapsed < GameStore.fasterRace)) {
                    GameStore.fasterRace = GameStore.timeElapsed
                }
            }
        })

        if (GameStore.horsesFinished === GameStore.horses.length) {
            clearInterval(GameStoreInterval);
            GameStore.raceInProgress = false;
            console.log(GameStore.positions);
        }
    },

    startRace: () => {
        GameStore.raceInProgress = true;
        GameStore.timeElapsed = 0;
        GameStore.positions = [];
        GameStore.horsesFinished = 0;
        GameStore.horses = GameStore.horses.map(horse => {
            horse.position = 0;
            horse.finished = false;
            return horse;
        })
        GameStoreInterval = setInterval(() => GameStore.moveHorses(), 100);
        GameStoreIntervalTimeElapsed = setInterval(() => GameStore.incrementTimeElapsed(), 1);

    }
});

export default GameStore; 