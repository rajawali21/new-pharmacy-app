import React from 'react';
import './footer.css';

const Footer = ({ isAbsolute }) => (
    <footer className={`footer ${isAbsolute && 'absolute'}`}>
        <p>Copyright &copy; 2020 - Pharmacy App</p>
    </footer>
)

export default Footer;