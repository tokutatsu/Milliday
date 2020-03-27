const twitter = require('twitter');
const fs = require('fs');
const bot = new twitter(require('../token/token.json'));

const tweet = (tweetText) => {
    bot.post('statuses/update', { status: `${tweetText}${tag}` }, (err, tweet, res) => {
        if (!err) {
            console.log(tweet);
        } else {
            console.log(err);
        }
    });
};

const changeIcon = (characterName) => {
    const icon = fs.readFileSync(`../data/icon/${characterName}.png`, { encoding: 'base64' });
    bot.post('account/update_profile_image', { image: icon }, (err, tweet) => {
        if (!err) {
            console.log(tweet)
        } else {
            console.log(err);
        }
    });
};

module.exports.tweet = tweet;
module.exports.changeIcon = changeIcon;