export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  AUDIO = "audio",
  VIDEO = "video",
  DOCUMENT = "document", // PDF, Word, etc.
  MIXED = "mixed", // Text + Media (Image, Audio, Video, PDF, etc.)
}

export interface IContent {
  text?: string;
  messageType: MessageType;
  fileUrls?: string[];
}

export interface IMessage {
  _id?: string;
  chatId: string | string;
  senderId: string;
  receiverId: {
    _id: string;
    fullName: string;
    profileImage: string
    email: string
  };
  content: IContent;
  seenBy?: string[];
  deletedBy?: string[];
  unsentBy?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
