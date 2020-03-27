const assert = require('assert').strict;
const should = require('chai').should();
const expect = require('chai').expect;
const bot = require('../bot_modules/bot.js');
let originalConsoleLog;
let log = [];

describe('tweet()', () => {
    beforeEach(() => {
        originalConsoleLog = console.log;
        console.log = (message) => {
            log[log.length] = message;
        };
    });
    afterEach(() => {
        console.log = originalConsoleLog;
    });
    it('ツイートすることができたか', (done) => {
        bot.tweet('test');
        setTimeout(() => {
            expect(log[1].statusCode).to.equal(200);
            done();
        }, 1000);
    });
});
