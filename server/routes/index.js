module.exports = (app) => {
    app.use('/api/v1/task/board', require('./task/board'));
    app.use('/api/v1/task/card', require('./task/card'));
    app.use('/api/v1/task/list', require('./task/list'));
}
