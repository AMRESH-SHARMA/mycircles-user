import React from 'react';


const Comments = ({ comment, setComment, addComment, comments, isPostingComment }) => {
  return (
    <form onSubmit={addComment}>
    <input
      value={comment}
      onChange={(e) => setComment(e.target.value.trim())}
      placeholder='Add comment..'
    />
    <button onClick={addComment}>
      {isPostingComment ? 'Commenting...' : 'Comment'}
    </button>
  </form>
  )
}

export default Comments