import React from "react"
import {ListGroup} from "react-bootstrap"
export default({videoList,changeSelection})=>{
    const changeSelectedVideo=(data)=>{
          changeSelection(data)
    }
    return(
      <React.Fragment>
      {videoList.length>0 && 
       videoList.map(data=>(
                    <ListGroup.Item key={data.id.videoId} onClick={()=>changeSelectedVideo(data)} style={{cursor:"pointer"}}>
                    <div
                    style={{
                        marginBottom:10,
                        padding:10,
                        display:"flex"
                    }}
                    >
                    <div>
                    <img alt="sample" src={data.snippet.thumbnails.medium.url} height="100px"/>
                    </div>
                    <div style={{paddingLeft:5}}>
                    <div className="sugg-title">{data.snippet.title}</div>
                    <div className="sugg-channel">{data.snippet.channelTitle}</div>
                    </div>
                    </div>
                    </ListGroup.Item>
             )
       )
    }
      </React.Fragment>
    )
} 