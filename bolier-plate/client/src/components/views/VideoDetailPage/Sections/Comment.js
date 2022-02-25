import Axios from 'axios';
import React,{useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import ReplyComment from './ReplyComment';
import SingleComment from './SingleComment';


function Comment(props) {

    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("");

    const handleClick = (event)=>{
        setcommentValue(event.currentTarget.value);
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        const varibles = {
            content: commentValue,
            writer:  user.userData._id,
            postId:  props.postId
        }

        Axios.post('/api/comment/saveComment', varibles)
        .then(res =>{
            if(res.data.success){                
                setcommentValue("");
                props.refreshFunction(res.data.result);
            }else{
                alert('댓글을 저장하지 못했습니다.')
            }
        })
    }



  return (
    <div>
        <br/>
        <p>Replies</p>
        <hr/>
        
        {/* Comment Lists */}
        {props.CommentLists && props.CommentLists.map((comment, index)=> (            

            //일단 대댓글이 아닌 컴포넌트 먼저 뿌리기위해        
            (!comment.responseTo && 
                <React.Fragment>
                    <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                    <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                </React.Fragment>
            )
        ))}
        {/* Root Comment Forms */}


        <form style={{ display : 'flex'}} onSubmit={onSubmit} >
            <textarea
                style={{ width: '100%', borderRadius: '5px'}}
                onChange={handleClick}
                value={commentValue}
                placeholder='댓글추가...'
            />
            <br/>
            <button 
                style={{ width: '20%', height: '52px'}}
                onClick={onSubmit}
                >Submit</button>
        </form>



    </div>
  )
}

export default Comment