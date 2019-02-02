const twitter = require('twitter');
const schedule = require('node-schedule');
const app = new twitter(require('./token.json'));
const birthdayList = require('./data/birthday.json');
const tweetData = require('./data/tweet.json');
const tag = tweetData.tag;
let job = [];

const tweet = (tweetText) => {
    app.post('statuses/update', { status: `${tweetText}${tag}` }, (err, tweet, res) => {
        if (!err) {
            console.log(tweet);
        } else {
            console.log(err);
        }
    });
};

const todayBirthdayCheck = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    let tweetText = '';
    for (const list of birthdayList) {
        if (month == list[1] && date == list[2]) {
            tweetText = `本日${list[1]}月${list[2]}日は${list[0]}の誕生日です。\n`
            tweet(tweetText);
        }
    }
    if (!tweetText) {
        tweetText = `本日${month}月${date}日が誕生日のアイドルはいません。\n`;
        tweet(tweetText);
    }
};

const tomorrowBirthdayCheck = () => {
    const tomorrow = new Date();
    //明日の日付を取得
    tomorrow.setDate(tomorrow.getDate() + 1);
    const month = tomorrow.getMonth() + 1;
    const date = tomorrow.getDate();
    let tweetText = '';
    for (const list of birthdayList) {
        if (month != list[1] && date == list[2]) {
            tweetText = `明日${list[1]}月${list[2]}日は${list[0]}の誕生日です。\n`;
            tweet(tweetText);
        }
    }
};

const monthBirthdayCheck = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    let tweetText = tweetData.tweet.month;
    for (const list of birthdayList) {
        if (month == list[1]) {
            tweetText += `${list[0]} ${list[1]}月${list[2]}日\n`;
        }
    }
    tweet(tweetText);
};

//時間設定の順番(分、時、日、月、曜日)
//毎日0時に実行
job[0] = schedule.scheduleJob('0 0 * * *', todayBirthdayCheck);
//毎日0時に実行
job[1] = schedule.scheduleJob('0 0 * * *', tomorrowBirthdayCheck);
//毎週日曜日0時に実行
job[2] = schedule.scheduleJob('0 0 * * 0', monthBirthdayCheck);