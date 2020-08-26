import React from 'react';
import './showcase.css';

const Showcase = ({ image, title, text, color, sizeImage }) => (
    <section className={`showcase`} style={{ backgroundColor: color, borderBottom: `1px solid ${color}` }}>
        <div className='showcase-text'>
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
        <img src={image} alt='showcaseImage' className={sizeImage} />
    </section>
)

export default Showcase;