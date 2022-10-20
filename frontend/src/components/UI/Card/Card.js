import React from 'react';
import "./style.css";

function Card(props) {
  return (
    <div  {...props} className="card">
      {props.children}

    </div>
  )
}

export default Card
