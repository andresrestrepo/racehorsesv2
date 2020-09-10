import React from 'react';
import horseImg from "../../assets/horse.gif";
import horseStaticImg from "../../assets/horse-static.png";

import { view } from '@risingstack/react-easy-state'
import GameStore from '../../store/GameStore';

import './Horse.css';

const Horse = view((props) => {

    return (
        <div className="container-horse">
            <div className="horse" style={{ left: props.horse.position }}>
                <div className={props.horse.name}></div>
                <div className="tag-name-horse">{props.horse.name}</div>

                {!GameStore.raceInProgress
                    ? <img alt="horse-static" src={horseStaticImg} ></img>
                    : <img alt="horse" src={horseImg} ></img>
                }
            </div>
            <div className="floor-horse"></div>
        </div>
    )
})

export default Horse;