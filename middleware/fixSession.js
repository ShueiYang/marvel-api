
// fix passport 0.6V issue to register regenerate & save after the cookieSession middleware initialization

function fixSessionWithPassport (req, res, next) {
    if(req.session && !req.session.regenerate) {
        req.session.regenerate = (done) => {
            done();
        }
    }
    if(req.session && !req.session.save) {
        req.session.save = (done) => {
            done();
        }
    }
    next();
};

module.exports = fixSessionWithPassport;