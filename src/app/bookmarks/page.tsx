"use client";
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';

function bookmarks() {
  const bookmarkref = useRef(null);
  const [response, setResponse] = useState([]);

  useEffect(() => {
      const response = new BroadcastChannel("bookmarks_channel");
      response.onmessage = (event) => {
        setResponse((response)=>[...response,event.data.bookmark]);
          console.log("Bookmarks:", event.data.bookmark);
        };
  },[]);

  const updateBookmarks = (bookmark) => {
    const channel = new BroadcastChannel("bookmarks_channel");
    channel.postMessage({ bookmark });
    console.log("Bookmarks updated:", bookmark);
  };

  return (
    <div>
      <input type="text" name='bookmark-input' ref={bookmarkref} className='border-1'/>
      <input type="button" value="add bookmark" className='border-2 hover:cursor-pointer' onClick={() => updateBookmarks(bookmarkref.current.value)} />
      <p>{response}</p>
    </div>
  )
}

export default bookmarks 

