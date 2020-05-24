import React,{useEffect,useState} from "react"
import Suggestions from "./suggestions"
import Singlevideo from "./Singlevideo"
import {Col,ListGroup} from "react-bootstrap"
import config from"../../config"
import Flatlist from "flatlist-react"
export default({searchString})=>{
    const [videoList,setvideoList] = useState([])
    const [id,setid] = useState("")
    const [title,settitle] = useState("")
    const [description,setdes] = useState("")
    const [selectedVideo,setselectedVideo]=useState({})
    const [error,seterror] = useState(false)
    const callApi = async()=>{
        const sample = await config.get('search',{
            params:{
            part:'snippet',
            maxResults:1000,
            nextPageToken: "CDIQAA",
            key:'AIzaSyC6UqwIY0Cge78sEuyZrP1wEKuSpYeAZJ4',
            q:searchString
        }
    })
        const result=sample.data.items
        if(result.length===0){
                 seterror(true)
        }
        else{
            console.log(sample)
            setselectedVideo(result[0])
            setvideoList(result)
           setid(result[0].id.videoId)
           settitle(result[0].snippet.title)
           setdes(result[0].snippet.description)
               seterror(false)
        }
     
    }

    useEffect(()=>{
        callApi();
    },[searchString])
    const selectedVideoCallBack = (videoDetail)=>{
          setselectedVideo(videoDetail)
          setid(videoDetail.id.videoId)
   settitle(videoDetail.snippet.title)
   setdes(videoDetail.snippet.description)
    }
    return(
    <React.Fragment>
    <Col xs={12} lg={8}>
     {error?<h1>Unable to find the related video</h1>:<Singlevideo detail={selectedVideo} description={description} title={title} id ={id}/>}
   
    </Col>
    <Col xs={12} lg={4}>
        {!error && <ListGroup>
        <p><strong>Suggestions</strong></p>
        <Flatlist list={videoList} renderItem={<Suggestions videoList={videoList} changeSelection={selectedVideoCallBack}/>}/>
      {/* selectedVideoId={selectedVideo.id}
        
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      */}
        </ListGroup>}
    </Col>
   </React.Fragment>
    )
}