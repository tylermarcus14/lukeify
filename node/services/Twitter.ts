import * as fs from 'fs';
import * as path from 'path';

const config    = require('../config.json');

const twitter   = require('twitter');

const client = new twitter({
    consumer_key: config.twitter.consumerKey,
    consumer_secret: config.twitter.consumerSecret,
    access_token_key: config.twitter.tokenKey,
    access_token_secret: config.twitter.tokenSecret
});

client.get('statuses/user_timeline', {
    screen_name: config.twitter.screenName,
    count: config.twitter.tweetCount
}, (error, tweets, response) => {
    if (error) throw error;
    fs.writeFile(path.join(__dirname, "../../tweets.json"), JSON.stringify(tweets), () => {});
});