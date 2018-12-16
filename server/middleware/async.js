// Right now we have 2 approaches for checking async 
// 1st express-async-errors 
// 2nd this function

module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch (ex) {
            next(ex);
        }
    }
}