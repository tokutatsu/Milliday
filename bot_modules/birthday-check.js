const birthdayList = require('../data/birthday.json');
const tweetData = require('../data/tweet.json');
let tag = tweetData.tag;

const todayBirthdayCheck = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    let tweetText = '';
    for (const list of birthdayList) {
        if (month == list[1] && date == list[2]) {
            tweetText = `本日${month}月${date}日は${list[0]}の誕生日です。\n`
            tag += `#${list[0]}生誕祭`;
            tweet(tweetText);
            tag = tweetData.tag;
            changeIcon(list[3]);
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
        // console.log(`${month} ${date}`);
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
    let tweetText = `${month}${tweetData.tweet.month}`;
    for (const list of birthdayList) {
        if (month == list[1]) {
            tweetText += `${list[0]} ${month}月${Number(list[2])}日\n`;
        }
    }
    tweet(tweetText);
};

module.exports.todayBirthdayCheck = todayBirthdayCheck;
module.exports.tomorrowBirthdayCheck = tomorrowBirthdayCheck;
module.exports.weekBirthdayCheck = weekBirthdayCheck;
module.exports.monthBirthdayCheck = monthBirthdayCheck;