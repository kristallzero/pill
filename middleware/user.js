import User from '../models/user.js';

export default async function(req, res, next) {
  req.user = User.findById(req.session.userID);
  next()
}