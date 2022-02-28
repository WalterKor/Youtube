import './VideoUploadPage.css'
import React, { useState, useEffect} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector} from 'react-redux'


const { Title } = Typography;
const { TextArea } = Input;

const PrivateOption = [
    {value: 0, label: "Private"},
    {value: 1, label: "Public"},
]

const CateoryOption = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"},
]

function VideoUploadPage(props) {
const user = useSelector(state=> state.user);
const [VideoTitle, setVideoTitle] = useState("");
const [Description, setDescription] = useState("");
const [Private, setPrivate] = useState(0);
const [Category, setCategory] = useState("Film & Animation")
const [FilePath, setFilePath] = useState("");
const [Duration, setDuration] = useState("");
const [ThumbnailPath, setThumbnailPath] = useState("");



const onTitleChange = (e)=>{
    setVideoTitle(e.currentTarget.value);
}

const onDescriptionChange = (e)=> {
    setDescription(e.currentTarget.value);
}

const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value);
}

const onCategoryChange = (e)=> {
    setCategory(e.currentTarget.value);
}

const onSubmit = (e)=>{
    e.preventDefault();
    const variable = {
        writer: user.userData._id,
        title: VideoTitle,
        description: Description,
        privacy: Private,
        filePath: FilePath,
        category: Category,
        duration: Duration,
        thumbnail: ThumbnailPath
    }
    Axios.post('/api/video/uploadVideo',variable)
        .then(res=>{
            if(res.data.success){
                message.success('업로드 했습니다.');

                setTimeout(() => {
                    props.history.push('/')    
                }, 1000);
                

            }else{
                alert('비디오 업로드에 실패했습니다.')
            }
        })
}

const onDrop = (files) => {
    let formData = new FormData;
    const config = {
        header: {'content-type': 'multipart/form-data'}
    }
    formData.append('file', files[0])
    
    Axios.post('/api/video/uploadfiles', formData, config)
    .then(res =>{
        if(res.data.success){
            console.log(res.data)
            
            let variable = {
                url: res.data.url,
                fileName: res.data.fileName
            }
            setFilePath(res.data.url)

            Axios.post('/api/video/thumbnail', variable)
            .then(res =>{
                if(res.data.success){
                    
                    setDuration(res.data.fileDuration);
                    setThumbnailPath(res.data.url);                    

                }else{
                    alert('썸네일 생성에 실패했습니다.');
                }

            })
 

        }else{
            alert('비디오 업로드를 실패했습니다.')
        }
    })

    
}


  return (
    <div className='upload_container'>
        <div className='upload_header'>
            <Title level={2}>Upload Video</Title>
        </div>

        <Form onSubmit={onSubmit}>
            <div className='DropZone'>
                {/* DropZone */}
                <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}
                >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />

                            </div>
                        )}
                    </Dropzone>
                {/* 썸네일 */}
                {ThumbnailPath &&
                    <div>
                        <img src={`http://localhost:5000/${ThumbnailPath}`} alt='thumbnail'></img>
                    </div>
                }

            </div>
            <br/>
            <br/>
            <label>Title</label>
            <Input
                onChange={onTitleChange}
                value={VideoTitle}
            />
            <br/><br/>

            <label>Description</label>
            <TextArea
                 onChange={onDescriptionChange}
                 value={Description}
            />
            
            <br/><br/>

            <select onChange={onPrivateChange}>
                {PrivateOption.map((item, index)=>(
                    <option key={index} value={item.value} >{item.label}</option>
                ))}                
            </select>
            <br/><br/>

            <select onChange={onCategoryChange}>
                {CateoryOption.map((item, index) =>(
                    <option key={index} value={item.value} >{item.label}</option>
                ))}                
            </select>
            <br/><br/>
            <Button type='primary' size='large' onClick={onSubmit}>
                Submit
            </Button>
        </Form>

    </div>
  )
}

export default VideoUploadPage