type MessageType = {
  id: string;
  content?: string;
  userId: string;
  channelId: string;
  createdAt: Date;
  updatedAt: Date;
};

export default MessageType;
