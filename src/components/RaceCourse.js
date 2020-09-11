import React, { useState } from 'react';
import { view } from '@risingstack/react-easy-state'
import GameStore from '../store/GameStore';
import Horse from './horse/Horse';
import winnerImg from "../assets/trophy.png";
import './RaceCourse.css';
import PieInformation from './pie/PieInformation';
import { Collapse, } from 'reactstrap';


const RaceCourse = view(() => {

    const horses = GameStore.horses;
    let horsesByPositions = [...GameStore.horses];
    horsesByPositions.sort((a, b) => {
        return a.position - b.position;
    })

    horsesByPositions.map(horse => {
        horse.value = horse.position;
        return horse;
    })

    const startRace = () => {
        GameStore.startRace();
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="container-racecourse">
            <div className="container-start-race">
                {!GameStore.raceInProgress
                    ? (
                        <React.Fragment>
                            <button id="start-race-btn" type="button" className="btn btn-outline-primary" onClick={startRace} >Start Race</button>
                            <button className="btn btn-primary" type="button" onClick={toggle}>
                                Real Time Graph
                            </button>
                        </React.Fragment>

                    )
                    : (
                        <React.Fragment>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </React.Fragment>

                    )
                }
            </div>

            <Collapse isOpen={isOpen}>

                <div id="pie-information">
                    <PieInformation data={horsesByPositions} />
                </div>

            </Collapse>



            {
                horses.map((horse) =>
                    <Horse key={horse.id} horse={horse} />
                )
            }

            <div className="row horses-positions">
                <div className="col">
                    <div>Winner: <img alt="horse" src={winnerImg} ></img>
                        <span className="winner-tag">{GameStore.positions[0]} </span>
                    </div>
                    <div>Positions: {GameStore.positions.join(" | ")}</div>
                    <div>Time Elapsed: {GameStore.timeElapsed}</div>
                    <div>Fastest Race: {GameStore.fasterRace}</div>

                </div>
            </div>
        </div >
    )
})

export default RaceCourse;