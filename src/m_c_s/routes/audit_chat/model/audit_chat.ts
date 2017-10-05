import { Mongoose, Schema } from 'mongoose';
import { tpa, api } from '../../../foundation';

/** Audit chat entity  */
@tpa.Schema('audit_chat', {
    name: String,
    period: { start: Date, end: Date },
    messages: [{ user: String, timestamp: Date, text: String }],
    approval: { user: String, timestamp: Date, status: String }
})
@api.Path('audit_chat')
export class IoTAuditChat {
    name: string;
    period: {
        start: Date;
        end: Date;
    };
    messages: {
        user: String, 
        timestamp: Date, 
        text: String
    }[];
    approval: {
        user: string,
        timestamp: Date,
        status: string
    };
}

/** chat messages entity  */
@tpa.Schema('audit_chat_message', {
    chatId: Schema.Types.ObjectId,
    user: String, timestamp: Date, text: String
})
@api.Path('audit_chat_message')
export class IoTAuditChatMessage {
    chatId: string;
    user: string;
    timestamp: Date;
    text: string
}

/** init function */
export function init() {
    console.log('Initiating model for audit_chat');
    new IoTAuditChat();
    new IoTAuditChatMessage();
}