import React from 'react';
import './App.css';
import Header from './components/header/Header';
import { view } from '@risingstack/react-easy-state'
import RaceCourse from './components/RaceCourse';


const App = view(() => {
    return (
        <div>
            <Header />
            <RaceCourse />
        </div>
    );
})

export default App;
