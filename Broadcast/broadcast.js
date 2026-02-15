export const broadcastBookmarks = (bookmarks) => {
    const channel = new BroadcastChannel("bookmarks_channel");
  
    channel.postMessage({
      type: "BOOKMARKS_UPDATED",
      bookmarks,
    });
  
    channel.close();
  };