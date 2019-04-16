import {Component, OnInit} from '@angular/core';
import {LukeifyService} from '../Services/LukeifyService';
import {Tweet} from '../Interfaces/Tweet';

@Component({
    'selector': 'lukeify-twitter-feed',
    'template': `
        <h1>Recent tweets</h1>
        <div *ngFor="let tweet of tweets" class="individual-tweet">
            <div class="twitter-deets">
                <a [href]="profileUrl(tweet.user.screen_name)" target="_blank">
                    <img [src]="tweet.user.profile_image_url_https | sanitize:'url'"
                         width="42" height="42" alt="twitter icon" />
                </a>

                <span class="tweet-time">
                    <a [href]="tweetUrl(tweet) | sanitize:'url'" target="_blank">
                        {{ humanReadableDelta(tweet.created_at) }}
                    </a>
                </span>

                <div class="is-a-retweet" *ngIf="tweet.retweeted"></div>
            </div>

            <div class="twitter-text">
                <p class="title">
                    <a [href]="profileUrl(tweet.user.screen_name) | sanitize:'url'" target="_blank">
                        {{ tweet.user.name }}
                    </a>
                    <a [href]="profileUrl(tweet.user.screen_name) | sanitize:'url'" target="_blank">
                        @{{ tweet.user.screen_name }}
                    </a>
                </p>
                <p class="body" [innerHTML]="richText(tweet.text) | sanitize:'html'"></p>

                <div class="tweet-actions">
                    <div class="intent reply">
                        <a [href]="replyUrl(tweet.id_str) | sanitize:'url'" target="_blank" title="Reply"></a>
                    </div>

                    <div class="intent retweet">
                        <a [href]="retweetUrl(tweet.id_str) | sanitize:'url'" target="_blank" title="Retweet"></a>
                    </div>

                    <div class="intent like">
                        <a [href]="likeUrl(tweet.id_str) | sanitize:'url'" target="_blank" title="Like"></a>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class TwitterFeedComponent implements OnInit {

    public tweets: Tweet[] = [];

    constructor(public lukeifyService: LukeifyService) {}

    public ngOnInit(): void {
        this.lukeifyService.getTweets().subscribe(tweets => {
            this.tweets = tweets;
        });
    }

    /**
     * Returns the URL to access this tweet from.
     *
     * @returns {string}
     */
    public tweetUrl(tweet: Tweet): string {
        return 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str;
    }
    /**
     * Returns the URL to reply to this tweet from.
     *
     * @returns {string}
     */
    public replyUrl(id_str: string): string {
        return 'https://twitter.com/intent/tweet?in_reply_to=' + id_str;
    }

    /**
     * Returns the URL to retweet to this tweet from.
     *
     * @returns {string}
     */
    public retweetUrl(id_str: string): string {
        return 'https://twitter.com/intent/retweet?tweet_id=' + id_str;
    }

    /**
     * Returns the URL to like this tweet from.
     *
     * @returns {string}
     */
    public likeUrl(id_str: string): string {
        return 'https://twitter.com/intent/like?tweet_id=' + id_str;
    }

    /**
     * Returns the URL to go to a user.
     *
     * @param {string} screen_name
     *
     * @returns {string}
     */
    public profileUrl(screen_name: string): string {
        return 'https://twitter.com/' + screen_name;
    }

    /**
     * Calculates a human-readable delta for the tweet's time. If the tweet was made recently, show the
     * duration between now and the tweet's time of creation, if it is older than a day, show the day the tweet
     * was made.
     *
     * @param {string} created_at - The date & time the tweet was created at.
     *
     * @returns {string}
     */
    public humanReadableDelta(created_at: string): string {
        const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const tweetDate: Date = new Date(created_at);
        const now: Date = new Date();

        const delta: number = Math.abs(now.getTime() - tweetDate.getTime()) / 1000;

        // to debug
        if (delta < 60) {
            return '< 1m';
        } else if (delta < 60 * 60) {
            return Math.round(delta / 60).toString() + 'm';
        } else if (delta < 24 * 60 * 60) {
            return Math.round(delta / 60 / 60).toString() + 'h';
        } else {
            return tweetDate.getDate() + ' ' + months[tweetDate.getMonth()];
        }
    }

    /**
     * Returns a rich text string of the tweet text, with links, hashtags, and mentions parsed.
     *
     * @parse {string} text - The text of the tweet.
     *
     * @returns {string}
     */
    public richText(text: string): string {
        const links: RegExp = /https?:\/\/t.co\/\S+/gi;
        text = text.replace(links, match => `<a href="${match}" target="_blank">${match}</a>`);

        const hashtags: RegExp = /#([_a-z0-9]+)/gi;
        text = text.replace(hashtags, match => {
            return `<a href="https://twitter.com/search?q=${match.substr(1)}" target="_blank">${match}</a>`;
        });

        const mentions: RegExp = /@([_a-z0-9]+)/gi;
        return text.replace(mentions, match => {
            return `<a href="https://twitter.com/${match.substr(1)}" target="_blank">${match}</a>`;
        });
    }
}
