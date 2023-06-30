import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="mobilechat">
      <div className="chatInfo">
        <span style={{color:"#fff",textTransform:"capitalize",margin:"5px"}} className="mobiletext">{data.user?.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
