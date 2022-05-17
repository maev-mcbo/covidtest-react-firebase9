import React from 'react'
import { useParams } from 'react-router-dom'

function ShowID() {

    const {id}= useParams()
    console.log(id);

  return (
    <div>ShowID {id}</div>
  )
}

export default ShowID