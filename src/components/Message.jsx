import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  let value = new Date(message.date.seconds*1000);
  let hh = value.getHours().toString().padStart(2,'0')
  let mm = value.getMinutes().toString().padStart(2,'0')
  // console.log(value)

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          style={{width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover"}}
        />
        <span>{hh}:{mm}</span>
      </div>
      <div className="messageContent">
        {message.text?<p>{message.text}</p>:null}
        {message.img?<div><img src={message.img} alt=""/></div>:null}
      </div>
    </div>
  );
};

export default Message;
