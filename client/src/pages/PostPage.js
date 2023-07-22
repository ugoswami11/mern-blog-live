import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
// import '../Config';
import axios from "axios";


export default function PostPage(){
    const {id} = useParams();
    const [postInfo, setPostInfo] = useState('');
    const {userInfo, ready} = useContext(UserContext);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            const {data} = await axios.get(`/post/${id}`);
            setPostInfo(data);
            if(userInfo!== null && (userInfo.username_id === data.author._id)){
                setIsUser(true);
            }
        }
        fetchData();
        
    },[]);

    const handleDelete = async () => {
        setIsDeleting(true);
        const response = await axios.delete(`/post/${id}`);
        if(response.status === 200){
            navigate('/')
        }else{
            throw new Error('Failed to delete the post');
        }
      };

    if(!ready){
        return '';
    }

    if(!postInfo){
        return '';   
    }

    return(
        <div className="post-page">
            <h3>{postInfo.title}</h3>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">@{postInfo.author.username}</div>
            {isUser && (
                <div className="edit-row">
                    <Link className="edit-button" to={`/edit/${postInfo._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit
                    </Link>
                    <button className="delete-button" onClick={handleDelete} disabled={isDeleting}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Delete
                    </button>
                </div>
            )}

            <div className="image">
                <img src={postInfo.coverImg} alt="" />
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
    );
}