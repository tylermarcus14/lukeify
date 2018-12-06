import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const config = require('../../config.json');
const twitter = require('twitter');
const superagent = require('superagent');

const services = {
    /**
     *
     */
    twitter: async function() {
        // Twitter
        const client = new twitter({
            consumer_key: config.twitter.consumerKey,
            consumer_secret: config.twitter.consumerSecret,
            access_token_key: config.twitter.tokenKey,
            access_token_secret: config.twitter.tokenSecret
        });

        client.get('statuses/user_timeline', {
            screen_name: config.twitter.screenName,
            count: config.twitter.tweetCount
        }, (error, tweets) => {
            if (error) throw error;
            fs.writeFile(path.join(__dirname, "../../cached/tweets.json"), JSON.stringify(tweets), () => {});
        });
    },

    /**
     *
     */
    instagram: async function() {
        /**
         * For a given cookie name, get its value.
         *
         * @param key
         * @param cookies
         * @returns {string}
         */
        const getCookieValueFromKey = function(key, cookies) {
            const cookie = cookies.find(c => c.indexOf(key) !== -1);
            if (!cookie) {
                throw new Error('No key found.');
            }
            return (RegExp(key + '=(.*?);', 'g').exec(cookie))[1];
        };

        /**
         * Generates the instagram request signature by md5 hashing a bunch of random variables together.
         *
         * @param rhxGis
         * @param csrfToken
         * @param queryVariables
         *
         * @returns {string}
         */
        const generateRequestSignature = function(rhxGis, queryVariables) {
            const magicString = `${rhxGis}:${queryVariables}`;
            return crypto
                .createHash('md5')
                .update(magicString, 'utf8')
                .digest("hex");
        };

        try {
            const userAgent         = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5';
            const initResponse      = await superagent.get('https://www.instagram.com/').set('User-Agent', userAgent);

            const rhxGis            = (RegExp('"rhx_gis":"([a-f0-9]{32})"', 'g')).exec(initResponse.text)[1];
            const csrfTokenCookie   = getCookieValueFromKey('csrftoken', initResponse.header['set-cookie']);

            const queryVariables = JSON.stringify({
                id: config.instagram.userId,
                first: config.instagram.postCount
            });

            const res = await superagent.get('https://www.instagram.com/graphql/query/')
                .query({
                    query_hash: '42323d64886122307be10013ad2dcc44',
                    variables: queryVariables
                })
                .set({
                    'Cookie': `rur=FRC; csrftoken=${csrfTokenCookie}; ig_pr=1`,
                    'User-Agent': userAgent,
                    'X-Instagram-Gis': generateRequestSignature(rhxGis, queryVariables)
                });

            const images = res.body.data.user.edge_owner_to_timeline_media.edges.map(image => {
                return {
                    id: image.node.id,
                    caption: image.node.edge_media_to_caption.edges[0].node.text,
                    shortcode: image.node.shortcode,
                    thumb: image.node.thumbnail_resources.pop().src,
                    likes: image.node.edge_media_preview_like.count
                }
            });

            fs.writeFile(path.join(__dirname, "../../cached/instas.json"), JSON.stringify(images), () => {});

        } catch (e) {
            console.log(e.message);
        }
    },

    /**
     *
     */
    github: async function() {
        try {
            const eventRes = await superagent.get('https://api.github.com/users/lukeify/events');
            const pushEvent = eventRes.body.find(event => event.type === "PushEvent");

            const commitRes = await superagent.get(pushEvent.payload.commits[0].url);
            const commit = commitRes.body;

            let commitMessage = commit.commit.message;
            if (commit.commit.message.indexOf("Signed-off-by") !== -1) {
                commitMessage = commitMessage.split("\n\n")[0];
            }

            let github = {
                commit: {
                    url: commit.html_url,
                    message: commitMessage
                },
                sha: commit.sha,
                repoName: pushEvent.repo.name,
                createdAt: pushEvent.created_at
            };

            fs.writeFile(path.join(__dirname, "../../cached/github.json"), JSON.stringify(github), () => {});

        } catch (e) {
            console.log(e);
        }
    }
};

/**
 * This file is to be called from a cron service every 15 minutes as needed. When called, it retrieves my latest tweets
 * from twitter, my latest photos from instagram, and my latest commit from github.
 */
(async () => {
    await services.twitter();
    await services.instagram();
    await services.github();
})();
