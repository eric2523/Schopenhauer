import React from "react";

export const PersonalBioItem = (props) => {
  return (
    <li className="personal-bio-li">
      <h2>{props.userInfo.name}</h2>
      <div className="profile-pic-container">
        <div className={`profile-pic-icon prof-pic-${props.idx}`}></div>
      </div>
      <div className="profile-icon-container">
        <a
          target="_blank"
          className="about-github-icon"
          href={props.userInfo.gitHub}
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href={props.userInfo.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fab fa-linkedin"></i>
        </a>
      </div>
    </li>
  );
};
