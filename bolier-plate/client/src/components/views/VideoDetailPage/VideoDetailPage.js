import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage(props) {

    var videoId = props.match.params.videoId;
    const [Video, setVideo] = useState([]);
    const [CommentLists, setCommentLists] = useState([]);

    var videoVariable = {
        videoId: videoId
    }

    useEffect(() => {    
        //해당 비디오 가져오는거
        Axios.post('/api/video/getVideo', videoVariable)
        .then(response => {
            if (response.data.success) {                     
                setVideo(response.data.video)
            } else {
                alert('비디오 정보를 가져오는것에 실패했습니다.')
            }
        })

        //해당페이지 댓글 전부 가져오는거
        Axios.get('/api/comment/getComments', videoVariable)
        .then(response => {
            if (response.data.success) {                                              
                setCommentLists(response.data.comments)
            } else {
                alert('댓글 정보를 가져오는것에 실패했습니다.')
            }
        })



    },[])

    const refreshFunction = (newComment)=>{
        setCommentLists(CommentLists.concat(newComment));
    }

    
    if(Video.writer){
        return (
          <Row>
              <Col lg={18} xs={24}>
                  <div style={{width: '100%', padding: '3rem 4rem'}}>
                  <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>
    
                      <List.Item
                        //   actions={[<Subscribe userTo={Video.writer._id} userFrom = {localStorage.getItem('userId')}   />]}
                      >
                          <List.Item.Meta 
                              avatar={<Avatar src={Video.writer && Video.writer.image} />}
                              title={<a href="https://ant.design">{Video.title}</a>}
                              description={Video.description}
                          />
                      </List.Item>
                      {/* 댓글 부분 */}
                      <Comment refreshFunction={refreshFunction} CommentLists={CommentLists} postId={videoId}/>
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