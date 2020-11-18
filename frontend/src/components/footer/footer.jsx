import React from 'react';
import { info } from '../about-page/bio-information';
import { FooterItem } from './footer-item';

export const Footer = () => {
  const items = info.map((ele, idx) => {
    return <FooterItem key={idx} userInfo={ele} idx={idx} />
  })

  return (
    <ul className="footer-container">
      <div className="small-icon"></div>
      <div id="footer-text">SCHOPENHAUER</div>
      <a 
        id="nav-github-link"
        key="nav-github-link"
        href="https://github.com/eric2523/Schopenhauer" 
        target="_blank">
        <i id="nav-github-icon" className="fab fa-github"></i>
      </a>
      { items }
    </ul>
  )
}