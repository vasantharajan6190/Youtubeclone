import React from "react"
export default(props)=>{
    return(
    <div>
    {props.detail && (
        <div>
        <iframe title="video"  width="100%" height="400px" src={`https://www.youtube.com/embed/${props.id}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <h5>{props.title}</h5>
       <p>{props.description}</p>
        </div>
    )} 
    </div>

    )
}