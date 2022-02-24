import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import './Subscribe.css';

function Subscribe(props) {

    let mypage = false;
    
    if( localStorage.getItem('userId') == props.userTo){
        mypage = true;
    }else{
        mypage = false;   
    }

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    const variable = { userTo: props.userTo};

    const onSubscribe = ()=>{

        let subscribedVariable = {

             userTo: props.userTo,
             userFrom: props.userFrom

        }
        // 이미 구독중이라면
        if(Subscribed){
            Axios.post('/api/subscribe/unSubscribe', subscribedVariable)
            .then(res =>{
                if(res.data.success){
                    setSubscribeNumber(SubscribeNumber - 1);
                    setSubscribed(!Subscribed)
                }else{
                    alert('구독 취소하는데 실패했습니다.')
                }
            })

        }else{
        //구독중이 아니라면
            Axios.post('/api/subscribe/subscribe', subscribedVariable)
                .then(res =>{
                    if(res.data.success){
                        setSubscribeNumber(SubscribeNumber + 1);
                    setSubscribed(!Subscribed)
                    }else{
                        alert('구독 하는데 실패했습니다.')
                    }
                })
            }
    }

    useEffect(() => {

        Axios.post('/api/subscriber/subscriberNumber', variable)
        .then(res=>{
            if(res.data.success){
                setSubscribeNumber(res.data.subscribeNumber);
            }else{
                alert('구독자 수 정보를 받아 오지 못했습니다.')
            }
        });

        let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId')}

        Axios.post('/api/subscribe/subscribed' , subscribedVariable)
        .then(res=>{
            if(res.data.success){
                setSubscribed(res.data.subscribed)
            }else{
                alert('정보를 받아오지 못했습니다.');
            }
        })      
    }, [])
  return (
    <div>        
        { mypage ? <div>내 동영상</div> : 
        <button 
            onClick={onSubscribe}
            style={{
                backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                borderRadius: '4px', color: 'white', border: '0.1px',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                {Subscribed ? 'Subscribed' : 'Subscwribe'}
        </button>}
    </div>
  )
}

export default Subscribe