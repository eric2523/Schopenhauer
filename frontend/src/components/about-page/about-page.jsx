import React from "react";
import { PersonalBioItem } from "./personal-bio-item"
import { info } from "./bio-information"

export const AboutPage = (props) => {
  const biosList = info.map((ele, idx) => {
    return <PersonalBioItem key={idx} userInfo={ele} idx={idx} />
  })

  return (
    <div>
      <div className="about-splash">
        <div className="main-title">
          <h1 className="splash-title">About us</h1>
        </div>
      </div>
      <div className="about-info-1">
        <div className="info-1-head">
          <h1>Our Motivation</h1>
          <div className="motivation-bottom">
            <p className="info-1-head-p">
              The philosopher Arthur Schopenhauer held that the “world” consists of lawfully repeating patterns of “representations” beneath which surges an unrepresentable, violent “will” which cannot be captured by law or representation. Against this metaphysical background, he accorded music a special status in comparison with the other arts. Whereas other forms of art sought to elevate by means of idealizing from representations to yet more general representations, music sought to express this will directly “in itself” without representing it.
            </p>
            <br></br>
            <p className="info-1-head-p">
              Our app pays homage to this conflict between music and visual representation by allowing users to engage in creative free play by making their own visualizers for music they upload. We encourage the spirit of music as Schopenhauer saw it, but in the realm of the visual, and over the medium of technology.
            </p>
          </div>
            <div className="personal-bios">
              <ul>
                { biosList }
              </ul>
            </div>
        </div>
      </div>
    </div>
  );
}
