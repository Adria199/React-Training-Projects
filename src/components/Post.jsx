import {format, formatDistanceToNow} from 'date-fns'

import styles from './Post.module.css';

import { Comment } from './Comment';
import { Avatar } from './Avatar';
import { useState } from 'react';

export function Post({author, publishedAt, content}) {
   const [comments, setComments] = useState ([
       1,
       2,  
   ])
   
    const publishedDateFormatted = format(publishedAt, "LLLL d 'at' HH:mm")

    const publishedDateRelativeTonow = formatDistanceToNow(publishedAt, {
      addSuffix: true
    })

    function handleCreateNewComment() {
       event.preventDefault()

       setComments([...comments, comments.lenght + 1])
    }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeTonow}</time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type == 'paragraph') {
            return <p>{line.content}</p>
          } else if (line.type == 'link') {
            return <p><a href="#">{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Leave a feedback</strong>

        <textarea 
          placeholder='Leave a comment'
        />
        
        <footer>
          <button type='submit'>Publish</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment />
        })}
      </div>

    </article>
  )
}