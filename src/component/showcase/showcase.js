import React from 'react';
import './showcase.css';

const Showcase = ({ image, title, text }) => (
    <section className='showcase'>
        <div className='showcase-text'>
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
        <img src={image} alt='showcaseImage' />
    </section>
)

export default Showcase;