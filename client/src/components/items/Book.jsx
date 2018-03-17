import React from 'react'

const Book = (props) => {
  let { name, author, genre } = props
  return (
    <div onClick={props.onClick}>
      {name} | {author} | {genre}
    </div>
  )
}

export default Book
