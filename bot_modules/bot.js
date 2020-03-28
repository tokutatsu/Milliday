const twitter = require('twitter');
const fs = require('fs');
const path = require('path');
const bot = new twitter(require('../token/token.json'));
const tweetData = require('../data/tweet.json');
let tag = tweetData.tag;

const tweet = (tweetText) => {
    bot.post('statuses/update', { status: `${tweetText}${tag}` }, (err, tweet, res) => {
        if (!err) {
            console.log(tweet);
        } else {
            console.log(err);
        }
        console.log({ statusCode: res.statusCode });
    });
};

const changeIcon = (characterName) => {
    const icon = fs.readFileSync(path.resolve(__dirname, `../data/icon/${characterName}.png`), { encoding: 'base64' });  // 絶対パスでのbot.jsからのiconまでのパス
    bot.post('account/update_profile_image', { image: icon }, (err, tweet, res) => {
        if (!err) {
            console.log(tweet)
        } else {
            console.log(err);
        }
        console.log({ statusCode: res.statusCode });
    });
};

module.exports.tweet = tweet;
module.exports.changeIcon = changeIcon;