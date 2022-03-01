import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';




function LikeDislike(props) {

    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);
    

    let variable = { }

    if(props.vidoe){
        variable = {
            videoId: props.videoId,
            userId: props.userId
        }
    }else{
        variable = {
            userId: props.userId,
            commentId: props.commentId
        }
    }



    useEffect(() => {

      Axios.post('/api/like/getLikes', variable)
        .then(response =>{
            if(response.data.success){
                // 얼마나 많은 좋아요를 받았는지
                setLikes(response.data.likes.length);
                
                //내가 이미 좋아요를 눌렀는지
                response.data.likes.map(like=>{
                    if(like.userId === props.userId){
                        setDislikeAction('disliked')
                    }

                })

            }else{
                alert('Dislike정보를 가저오는것에 실패했습니다.')
            }
        })


      Axios.post('/api/like/getDislikes', variable)
        .then(response =>{
            if(response.data.success){
                // 얼마나 많은 좋아요를 받았는지
                setDislikes(response.data.dislikes.length);
                
                //내가 이미 좋아요를 눌렀는지
                response.data.dislikes.map(dislike =>{
                    if(dislike.userId === props.userId){
                        setLikeAction('liked')
                    }

                })

            }else{
                alert('Like정보를 가저오는것에 실패했습니다.')
            }
        })
    
      
    }, [])
    const onLike = ()=>{

        if(LikeAction === null){

            Axios.post('/api/like/upLike', variable)
                .then(response=>{
                    if(response.data.success){
                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        if(DislikeAction !== null){
                            setDislikeAction(null);
                            setDislikes(Dislikes -1)
                        }
                    }else{
                        alert('Like를 올리지 못했습니다.')
                    }
                })
        }else{
            Axios.post('/api/like/unLike', variable)
                .then(response=>{
                    if(response.data.success){
                      setLikes(Likes -1)
                      setLikeAction(null)

                    }else{
                        alert('Like를 내리지 못했습니다.')
                    }
                })



        }
    }

    const onDislike = ()=>{
        //클릭이 되어있을때
        if(DislikeAction !== null){

            Axios.post('/api/like/unDislike', variable)
            .then(res =>{
                if(res.data.success){
                    setDislikes(Dislikes - 1)
                    setDislikeAction(null)                    
                }else{
                    alert('Dislike를 지우지 못했습니다.')
                }
            })

        }else{
            
            Axios.post('/api/like/upDislike', variable)
            .then(res =>{
                if(res.data.success){

                    setDislikes(Dislikes + 1)                 
                    setDislikeAction('disliked')

                    if(LikeAction !== null){
                        setLikeAction(null)
                        setLikes(Likes -1)
                    }


                }else{
                    alert('Dislike를 지우지 못했습니다.')
                }
            })
        }
    }

  return (
    <div>
        <span key="comment-basic-like">
            <Tooltip title="Like">
                <Icon type='like' 
                      theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                      onClick={onLike}
                />                
            </Tooltip>
        <span style={{paddingLeft: '8px', cursor: 'auto'}}> {Likes} </span>
        </span>
        
        <span key="comment-basic-like">
            <Tooltip title="Dislike">
                <Icon type='dislike' 
                    theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                    onClick={onDislike}
                />                
            </Tooltip>
            <span style={{paddingLeft: '8px', cursor: 'auto'}}> {Dislikes} </span>
        </span>
    </div>
  )
}

export default LikeDislike