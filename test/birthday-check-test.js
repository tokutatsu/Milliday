const expect = require('chai').expect;
const check = require('../bot_modules/birthday-check.js');
const birthdayList = require('../data/birthday.json');
let originalConsoleLog;

describe('todayBirthdayCheck()', () => {
    let log = [];
    before(() => {
        originalConsoleLog = console.log;
        console.log = (message) => {
            log[log.length] = message;
        };
        check.todayBirthdayCheck();
    });
    after(() => {
        console.log = originalConsoleLog;
    });
    it('ツイートすることができたか', (done) => {
        setTimeout(() => {
            expect(log[1].statusCode).to.equal(200);
            done();
        }, 6000);
    });
    it('アイコンを変えることができたか', (done) => {
        expect(log[3].statusCode).to.equal(200);
        done();
    });
});

describe('tomorrowBirthdayCheck()', () => {
    let log = [];
    const tomorrow = new Date();
    //明日の日付を取得
    tomorrow.setDate(tomorrow.getDate() + 1);
    const month = tomorrow.getMonth() + 1;
    const date = tomorrow.getDate();

    beforeEach(() => {
        originalConsoleLog = console.log;
        console.log = (message) => {
            log[log.length] = message;
        };
        check.tomorrowBirthdayCheck();
    });
    afterEach(() => {
        console.log = originalConsoleLog;
    });
    it('ツイートすることができたか', (done) => {
        for (const list of birthdayList) {
            if (month == list[1] && date == list[2]) {
                setTimeout(() => {
                    expect(log[1].statusCode).to.equal(200);
                    done();
                }, 2000);
            }
        }
        done();
    });
});

describe('weekBirthdayCheck()', () => {
    let log = [];
    before(() => {
        originalConsoleLog = console.log;
        console.log = (message) => {
            log[log.length] = message;
        };
        check.weekBirthdayCheck();
    });
    after(() => {
        console.log = originalConsoleLog;
    });
    it('ツイートすることができたか', (done) => {
        setTimeout(() => {
            expect(log[1].statusCode).to.equal(200);
            done();
        }, 2000);
    });
});

describe('monthBirthdayCheck()', () => {
    let log = [];
    before(() => {
        originalConsoleLog = console.log;
        console.log = (message) => {
            log[log.length] = message;
        };
        check.monthBirthdayCheck();
    });
    after(() => {
        console.log = originalConsoleLog;
    });
    it('ツイートすることができたか', (done) => {
        setTimeout(() => {
            expect(log[1].statusCode).to.equal(200);
            done();
        }, 2000);
    });
});