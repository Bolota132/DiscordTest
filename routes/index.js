var express = require('express');
var router = express.Router();

var League = require('../League');

router.route('/')
.get( (req, res, next) => {
    res.redirect(webtester.slack.com)
})

router.route('/slack')
.post( League.saybot)

module.exports = router;
