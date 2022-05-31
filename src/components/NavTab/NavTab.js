import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <nav className="nav-tab">
        <ul className="nav-tab__list">
            <li className="nav-tab__list-item">
                <a className="nav-tab__list-link" href="#about-project">О проекте</a>
            </li>
            <li className="nav-tab__list-item">
                <a className="nav-tab__list-link" href="#technologies">Технологии</a>
            </li>
            <li className="nav-tab__list-item">
                <a className="nav-tab__list-link" href="#student">Студент</a>
            </li>
        </ul>
    </nav>
  )
}

export default NavTab;