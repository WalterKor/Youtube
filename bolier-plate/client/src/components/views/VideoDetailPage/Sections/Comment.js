import Axios from 'axios';
import React,{useState} from 'react'
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';


function Comment(props) {

    const user = useSelector(state => state.user);
    const videoId = props.videoId;

    const [commentValue, setcommentValue] = useState("");

    const handleClick = (event)=>{
        setcommentValue(event.currentTarget.value);
    }

    const onSubmit = (e)=>{
        e.preventDefault();

        const varibles = {
            content: commentValue,
            writer:  user.userData._id,
            postId:  videoId
        }



        Axios.post('/api/comment/saveComment', varibles)
        .then(res =>{
            if(res.data.success){
                console.log(res.data.result);
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
        {props.commentLists && props.commentLists.map((comment, index)=>(
            <SingleComment comment={comment} postId={videoId}/>
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