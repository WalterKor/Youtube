import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import './VideoDetailPage.css';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([]);
    const videoVariable = { videoId: videoId }
    const [Comments, setComments] = useState([]);

    useEffect(() => {    
        Axios.post('/api/video/getVideo', videoVariable)
        .then(response => {
            if (response.data.success) {            
                setVideo(response.data.video)
            } else {
                alert('비디오 정보를 가져오는것에 실패했습니다.')
            }
        })

        Axios.post('/api/comment/getComments', videoVariable)
        .then(res =>{
            if(res.data.success){
                setComments(res.data.Comments);
                console.log(Comments);
            }else{
                alert('comment 정보를 가져오는 것을 실패 했습니다.')
            }
        })


    },[])
    
    if(Video.writer){

        return (
          <Row>
              <Col lg={18} xs={24}>
                  <div style={{width: '100%', padding: '3rem 4rem'}}>
                  <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>
    
                      <List.Item
                          actions={[<Subscribe userTo={Video.writer._id} userFrom = {localStorage.getItem('userId')}   />]}
                      >
                          <List.Item.Meta 
                              avatar={<Avatar src={Video.writer && Video.writer.image} />}
                              title={<a href="https://ant.design">{Video.title}</a>}
                              description={Video.description}
                          />
                      </List.Item>
                      {/* 댓글 부분 */}
                      <Comment commentList={Comments} postId={videoId}/>
                  </div>
              </Col>
              <Col lg={6} xs={24}>
                  <SideVideo/>
              </Col>
          </Row>
        )
    }else{
        return (
            <div>Loading...</div>
        )
    }

}

export default VideoDetailPage