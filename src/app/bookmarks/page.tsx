"use client";
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { fetchItm,updateBookmarks,CreateUser,deleteUser } from './backend/DataBaseFunctions.js';

function bookmarks() {
  const bookmarkref = useRef(null);
  const [response, setResponse] = useState([]);
  const url="https://7sfloc4omk.execute-api.us-east-1.amazonaws.com/default/";

  useEffect(() => {
      const response = new BroadcastChannel("bookmarks_channel");
      response.onmessage = (event) => {
        setResponse((response)=>[...response,event.data.bookmark]);
          console.log("Bookmarks:", event.data.bookmark);
        };
  },[]);

  return (
    <div>
      <input type="text" name='bookmark-input' ref={bookmarkref} className='border'/>
      <input type="button" value="add bookmark" className='border-2 hover:cursor-pointer' onClick={() => updateBookmarks(bookmarkref.current.value)} />
      <input type="button" value="fetch" className='border' onClick={()=>{CreateUser("himanshu123@gmail.com","himanshu")}} />
      <p>{response}</p>
    </div>
  )
}

export default bookmarks 

