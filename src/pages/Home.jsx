import React from 'react';
import homebg from '../assets/home.png'

const Home = () => {
    return (
        <div className='home'>
        <div>
        <h2 className='heroTitle'>Welcome to the Developer Community</h2>
        <p className='heroText'>Great collection of developers are enlisted here by registered users </p>
        </div>
            <div>
                <img src={homebg} alt=""/>
            </div>
        </div>
    );
}

export default Home;
