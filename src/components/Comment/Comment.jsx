import './comments.scss';

function Comment({comment, image}) {
  return (
    <div className='comment'>
        <div className='commentAvatar'>
           {
            image &&  <img src={image} alt="" />
           }
        </div>

        <div className='commentText'>
            <p>{comment}</p>
        </div>
    </div>
  )
}

export default Comment