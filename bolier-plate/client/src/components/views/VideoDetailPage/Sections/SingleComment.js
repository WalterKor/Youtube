import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

function SingleComment(props) {
    
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("");
    const [OpenReply, setOpenReply] = useState(false);

    
    const onClickReplyOpen = ()=>{ setOpenReply(!OpenReply); }
    const onHandleChange = (event)=>{ setCommentValue(event.currentTarget.CommentValue) };

    const onsubmit = (event)=>{

        event.preventDefault();
        
        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(res =>{
                if(res.data.success){
                    console.log(res.data.result);
                }else{
                    alert('댓글을 저장하지 못했습니다.')
                }
            }
        )
        
        
    }
    
    const actions = [
        <span onClick={onClickReplyOpen} key= "comment-basic-reply-to">Reply to</span>
    ]
    
        
    
    return (
        <div>
        <Comment 
            actions={actions}
            author={props.comment.writer.name}
            avatar={<Avatar src={props.comment.writer.image} alt />}
            content={ <p>{props.comment.content}</p>}
        />

        {OpenReply && 
            <form style={{ display : 'flex'}} onSubmit={onsubmit} >
                <textarea
                    style={{ width: '100%', borderRadius: '5px'}}
                    onChange={onHandleChange}  
                    value = {CommentValue}
                    placeholder='댓글추가...'
                />
                <br/>
                <button 
                    style={{ width: '20%', height: '52px'}}
                    onClick={onsubmit}
                    >Submit</button>
            </form>
        }

    </div>
  )
}

export default SingleComment