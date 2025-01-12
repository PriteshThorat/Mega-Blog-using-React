import { useEffect, useState } from 'react';
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

const PostCard = ({$id, title, featuredImage}) => {
    const [imgUrl, setImgUrl] = useState('');

    useEffect(() => {
            service.getFilePreview(featuredImage)
            .then(url => {
                if(url){
                    setImgUrl(url);
                }
            })
            .catch(err => {
                console.log("At PosrCard: ", err);
            })
    }, [imgUrl]);

    return (
        <Link to={`/post/${$id}`}>
            <div>
                <div className='w-full bg-gray-100 rounded-xl p-4'>
                    <img
                    className='rounded-xl'
                    src={imgUrl}
                    alt={title} />
                </div>
                <h2
                className='text-xl font-bold' >
                    {title}
                </h2>
            </div>
        </Link>
    )
};

export default PostCard;