const twitter = require('twitter');
const schedule = require('node-schedule');
const fs = require('fs');
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

const changeIcon = (characterName) => {
    const icon = fs.readFileSync(`./data/images/${characterName}.png`, { encoding: 'base64' });
    app.post('account/update_profile_image', { image: icon }, (err, tweet) => {
        if (!err) {
            console.log(tweet)
        } else {
            console.log(err);
        }
    });
}

const todayBirthdayCheck = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    let tweetText = '';
    for (const list of birthdayList) {
        if (month == list[1] && date == list[2]) {
            tweetText = `本日${month}月${date}日は${list[0]}の誕生日です。\n`
            tweet(tweetText);
            changeIcon(list[0]);
        }
    }
    if (!tweetText) {
        tweetText = `本日${month}月${date}日が誕生日のアイドルはいません。\n`;
        tweet(tweetText);
        changeIcon('default');
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
        if (month == list[1] && date == list[2]) {
            tweetText = `明日${month}月${date}日は${list[0]}の誕生日です。\n`;
            tweet(tweetText);
        }
    }
};

const weekBirthdayCheck = () => {
    const now = new Date();
    let tweetText = tweetData.tweet.week;
    for (let i = 0; i < 7; i++) {
        const month = now.getMonth() + 1;
        const date = now.getDate();
        console.log(`${month} ${date}`);
        for (const list of birthdayList) {
            if (month == list[1] && date == list[2]) {
                tweetText += `${list[0]} ${month}月${Number(list[2])}日\n`;
            }
        }
        now.setDate(now.getDate() + 1);
    }
    if (tweetText == tweetData.tweet.week) {
        tweet('今週誕生日のアイドルはいません\n');
    } else {
        tweet(tweetText);
    }
};

const monthBirthdayCheck = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    let tweetText = tweetData.tweet.month;
    for (const list of birthdayList) {
        if (month == list[1]) {
            tweetText += `${list[0]} ${month}月${Number(list[2])}日\n`;
        }
    }
    tweet(tweetText);
};

//時間設定の順番(分、時、日、月、曜日)
//毎日0時に実行
job[0] = schedule.scheduleJob('0 0 * * *', todayBirthdayCheck);
//毎日23時30分に実行
job[1] = schedule.scheduleJob('23 30 * * *', tomorrowBirthdayCheck);
//毎週日曜日0時に実行
job[2] = schedule.scheduleJob('0 0 * * 0', weekBirthdayCheck);
job[3] = schedule.scheduleJob('0 0 * * 0', monthBirthdayCheck);