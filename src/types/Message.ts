type MessageType = {
  id: string;
  content?: string;
  userId: string;
  channelId: string;
  createdAt: Date;
};

export default MessageType;
