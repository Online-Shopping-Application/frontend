import '../init'

import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default function Notification() {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState("");
  const [greetings, setGreetings] = useState([]);

  const connect = () => {
    const socket = new SockJS("http://localhost:8086/stomp-endpoint");

    console.log(socket);
    
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      setConnected(true);
      console.log("Connected: " + frame);

      client.subscribe("/topic/greetings", (message) => {
        console.log(JSON.parse(message.body));
      });
      
    });

    setStompClient(client);
  };

  const disconnect = () => {
        if (stompClient) {
          stompClient.disconnect(() => {
            setConnected(false);
            console.log("Disconnected");
          });
        }
      };
    
      const sendName = () => {
        if (stompClient) {
          console.log(JSON.stringify({ message: name })); // Debug the sent payload
          stompClient.send("/app/hello", {}, JSON.stringify({ message: name }));
        }
      };

    
      useEffect(() => {
        return () => {
          if (stompClient) {
            stompClient.disconnect();
          }
        };
      }, [stompClient]);

  return (
        <div id="main-content" className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="form-inline">
              <div className="form-group">
                <label htmlFor="connect">WebSocket connection:</label>
                <button
                  id="connect"
                  className="btn btn-default"
                  onClick={connect}
                  disabled={connected}
                >
                  Connect
                </button>
                <button
                  id="disconnect"
                  className="btn btn-default"
                  onClick={disconnect}
                  disabled={!connected}
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-inline">
              <div className="form-group">
                <label htmlFor="name">What is your name?</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Your name here..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button
                id="send"
                className="btn btn-default"
                onClick={sendName}
                disabled={!connected || name.trim() === ""}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
