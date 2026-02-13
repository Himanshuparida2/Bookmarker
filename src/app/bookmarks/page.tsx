"use client";
import dotenv from 'dotenv';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
dotenv.config();
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

  const fetchItm = () => {
    console.log(process.env.NEXT_PUBLIC_URL);
    fetch(`${process.env.NEXT_PUBLIC_URL}?email=${encodeURIComponent("test@test.com")}`,
      { method: 'GET',}
      ).then((response) => response.json())
    .then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }
  return (
    <div>
      <input type="text" name='bookmark-input' ref={bookmarkref} className='border'/>
      <input type="button" value="add bookmark" className='border-2 hover:cursor-pointer' onClick={() => updateBookmarks(bookmarkref.current.value)} />
      <input type="button" value="fetch" className='border' onClick={()=>{fetchItm()}} />
      <p>{response}</p>
    </div>
  )
}

export default bookmarks 

