import React from 'react';

export default (props) => {
  const { text, user, userPop, id } = props.tweet

  return(
    <div className="well well-sm" style={{border:'1px solid black', backgroundColor:'white'}}>
        <p>{user} - {userPop} followers</p>
        <p>{text}</p>
    </div>
  )
}
