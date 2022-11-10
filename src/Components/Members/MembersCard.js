import React from 'react'
import "./MembersCard.css";

export default function MembersCard(props) {
  return (
    <div class="card2">
        <div class="card-cover-photo2">
            <img src="https://i.imgur.com/KykRUCV.jpeg" class="card-profile2"/>
        </div>
        <h3 class="card-profile-name2">{props.name}</h3>
        <div className = "card-tags ">
        {props.tags?.map(item=>(
          
          <a class = "label label-default">{item}</a>
          

        ))}
        </div>
        
        
        
        <div className='d-flex'>
      
        <button class="card-btn2">Following</button>
          <button class="card-btn2">Message</button>
        </div>
        
        
    </div>
  )
}
