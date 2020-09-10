import React from 'react';
import { view } from '@risingstack/react-easy-state'
import GameStore from '../store/GameStore';
import Horse from './horse/Horse';
import winnerImg from "../assets/trophy.png";

import './RaceCourse.css';


const RaceCourse = view(() => {

    const horses = GameStore.horses;
    let horsesByPositions = [...GameStore.horses];
    horsesByPositions.sort((a, b) => {
        return b.position - a.position;
    })

    const startRace = () => {
        GameStore.startRace();
    }

    const horsesInformation = horsesByPositions.map((horse) =>
        <div className="row" key={horse.id}>
            <div className="col" style={{ textAlign: 'right' }} >
                {horse.name}:
            </div>
            <div className="col" style={{ textAlign: 'left' }}>
                {horse.position}
            </div>
        </div>
    );

    return (
        <div className="container-racecourse">
            <div className="container-start-race">
                {!GameStore.raceInProgress
                    ? <button type="button" className="btn btn-outline-primary" onClick={startRace} >Start Race</button>
                    : (
                        <React.Fragment>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </React.Fragment>

                    )
                }
            </div>
            {horses.map((horse) =>
                <Horse key={horse.id} horse={horse} />
            )}

            <div className="row horses-positions">
                <div className="col">
                    <div>Winner: <img alt="horse" src={winnerImg} ></img>
                        <span className="winner-tag">{GameStore.positions[0]} </span>
                    </div>
                    <div>Positions: {GameStore.positions.join(" | ")}</div>
                    <div>Time Elapsed: {GameStore.timeElapsed}</div>
                    <div>Faster Race: {GameStore.fasterRace}</div>

                </div>
                <div className="col">
                    {GameStore.raceInProgress &&
                        <React.Fragment> {horsesInformation} </React.Fragment>
                    }
                </div>
            </div>
        </div>
    )
})

export default RaceCourse;