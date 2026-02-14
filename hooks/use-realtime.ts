"use client"
import { useEffect, useRef } from "react";
import { updateBookmarks } from "../src/app/bookmarks/backend/DataBaseFunctions";
import { useUser } from "./userContext";

export function useRealtime() {
  const {bookmarks} = useUser();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Determine WS protocol based on current window protocol
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host;
    const wsUrl = `${protocol}//${host}/ws`;

    const connect = () => {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("[WS] Connected");
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'update') {
            // Invalidate bookmarks query to trigger a refetch
            updateBookmarks(message.email,message.bookmark);
          }
        } catch (err) {
          console.error("[WS] Failed to parse message", err);
        }
      };

      ws.onclose = () => {
        console.log("[WS] Disconnected, attempting reconnect...");
        setTimeout(connect, 3000);
      };

      ws.onerror = (err) => {
        console.error("[WS] Error:", err);
        ws.close();
      };
    };

    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [bookmarks]);
}
