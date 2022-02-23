import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import './VideoDetailPage.css';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])
    const videoVariable = { videoId: videoId }


    useEffect(() => {    
        Axios.post('/api/video/getVideo', videoVariable)
        .then(response => {
            if (response.data.success) {            
                setVideo(response.data.video)
            } else {
                alert('Failed to get video Info')
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