const expect = require('chai').expect;
const check = require('../bot_modules/birthday-check.js');
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
        }, 8000);
    });
    it('アイコンを変えることができたか', (done) => {
        expect(log[3].statusCode).to.equal(200);
        done();
    });
});

// describe('tomorrowBirthdayCheck()', () => {
//     let log = [];
//     beforeEach(() => {
//         originalConsoleLog = console.log;
//         console.log = (message) => {
//             log[log.length] = message;
//         };
//         check.tomorrowBirthdayCheck();
//     });
//     afterEach(() => {
//         console.log = originalConsoleLog;
//     });
//     it('ツイートすることができたか', (done) => {
//         setTimeout(() => {
//             expect(log[1].statusCode).to.equal(200);
//             done();
//         }, 4000);
//     });
// });

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
        }, 3000);
    });
});

// describe('monthBirthdayCheck()', () => {
//     let log = [];
//     beforeEach(() => {
//         originalConsoleLog = console.log;
//         console.log = (message) => {
//             log[log.length] = message;
//         };
//     });
//     afterEach(() => {
//         console.log = originalConsoleLog;
//     });
//     it('アイコンを変えることができたか', (done) => {
//         bot.changeIcon('test')
//         setTimeout(() => {
//             expect(log[1].statusCode).to.equal(200);
//             done();
//         }, 5000);
//     });
// });