import * as fs from 'fs';
import * as path from 'path';

const config = require('../config.json');
const twitter = require('twitter');
const superagent = require('superagent');

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

superagent.get('https://www.instagram.com/graphql/query')
    .query({
        query_id: '17888483320059182',
        variables: JSON.stringify({
            id: "5380311726",
            first: 9
        })
    })
    .on('error', err => {
        console.log(err);
    })
    .then(res => {

        const images = res.body.data.user.edge_owner_to_timeline_media.edges.map(image => {
            return {
                id: image.node.id,
                caption: image.node.edge_media_to_caption.edges[0].node.text,
                shortcode: image.node.shortcode,
                thumb: image.node.thumbnail_resources.pop().src
            }
        });

        fs.writeFile(path.join(__dirname, "../../instas.json"), JSON.stringify(images), () => {});
    });