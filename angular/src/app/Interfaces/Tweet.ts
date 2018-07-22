import {TwitterUser} from "./TwitterUser";

export interface Tweet {
    created_at: string;
    id: number;
    id_str: string;
    text: string;
    truncated: boolean;
    entities: any;
    source: string;
    in_reply_to_status_id: number;
    in_reply_to_status_id_str: string;
    in_reply_to_user_id: number;
    in_reply_to_user_id_str: string;
    in_reply_to_screen_name: string;
    user: TwitterUser;
    retweeted_status: any;
    is_quote_status: boolean;
    retweet_count: number;
    favorite_count: number;
    favorited: boolean;
    retweeted: boolean;
}