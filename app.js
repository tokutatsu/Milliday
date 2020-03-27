const schedule = require('node-schedule');
let job = [];
const check = require('./bot_modules/birthday-check.js');

//時間設定の順番(分、時、日、月、曜日)
//毎日0時に実行
job[0] = schedule.scheduleJob('0 0 * * *', check.todayBirthdayCheck);
//毎日23時30分に実行
job[1] = schedule.scheduleJob('30 23 * * *', check.tomorrowBirthdayCheck);
//毎週日曜日0時に実行
job[2] = schedule.scheduleJob('0 0 * * 0', check.weekBirthdayCheck);
job[3] = schedule.scheduleJob('0 0 * * 0', check.monthBirthdayCheck);
//月初め(1日)の0時に実行
job[4] = schedule.scheduleJob('0 0 1 * *', check.monthBirthdayCheck);