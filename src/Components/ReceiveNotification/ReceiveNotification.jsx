import '../init'

import React, { useEffect, useState } from 'react'
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default function ReceiveNotification() {
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
                                showGreeting(JSON.parse(message.body));
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

        const showGreeting = (message) => {
                setGreetings((prevGreetings) => [...prevGreetings, message.message]);
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
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <table id="conversation" className="table table-striped">
                      <thead>
                        <tr>
                          <th>Greetings</th>
                        </tr>
                      </thead>
                      <tbody id="greetings">
                        {greetings.map((greeting, index) => (
                          <tr key={index}>
                            <td>{greeting}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
        )
}
