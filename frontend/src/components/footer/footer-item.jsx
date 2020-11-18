import React from 'react';

export const FooterItem = (props) => {
  return (
    <li>
      <a target="_blank" href={props.userInfo.gitHub}>
        <div className="profile-pic-container">
          <div className={`profile-pic-icon small prof-pic-${props.idx}`}></div>
        </div>
      </a>
    </li>
  )
}