import React,{useEffect,useState} from "react"
import Suggestions from "./suggestions"
import Singlevideo from "./Singlevideo"
import {Col,ListGroup} from "react-bootstrap"
import YouTube from "simple-youtube-api"
import config from"../../config"
const youtube = new YouTube(config.apiKey)
export default({searchString})=>{
    const [videoList,setvideoList] = useState([])
    const [selectedVideo,setselectedVideo]=useState({})
    const [error,setError] = useState(false)
    useEffect(()=>{
        callApi();
    },[searchString])
    const callApi = async()=>{
        const result = await youtube.searchVideos(searchString,15)
        if(result.length===0){
            setError(true)
        }
        else{
            setError(false)
        }
        setselectedVideo(result[0])
    setvideoList(result)
    }


    const selectedVideoCallBack = (videoDetail)=>{
          setselectedVideo(videoDetail)
    }
    return(
    <React.Fragment>
    <Col xs={12} lg={8}>
    {error?<h1>No result found,Please try looking something else</h1>:
        <Singlevideo detail={selectedVideo}/>
    }
   
    </Col>
    <Col xs={12} lg={4}>
    {!error && (
        <ListGroup>
        <p><strong>Suggestions</strong></p>
        <Suggestions videoList={videoList} changeSelection={selectedVideoCallBack}
        selectedVideoId={selectedVideo.id}
        />
      {/*<ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      */}
        </ListGroup>
    )}
   
    </Col>
   </React.Fragment>
    )
}