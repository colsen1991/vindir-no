const jwt = require('jsonwebtoken');
const wadsworth = require('../../logging/wadsworth');
const User = require('../../db/models/user');

function login(req, res) {
  User.findOne({ username: req.body.username }, (error, data) => {
    if (error) {
      wadsworth.logError(error);
      res.sendStatus(500);
    } else if (!data || req.body.password !== data.password) {
      res.sendStatus(401);
    } else {
      const token = jwt.sign({ username: data.username }, req.app.get('credentials').key, { expiresIn: 1440 });
      res.send({
        token,
        username: data.username,
        name: data.name
      });
    }
  });
}

exports.login = login;
