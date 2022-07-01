import bscrypt from 'bcryptjs';
import { Router } from "express";

import User from '../models/user.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    res.render('reg',
      {
        layout: 'main-light',
        pageTitle: 'Регистрация',
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
      });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Server Error' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, check } = req.body;
    if (password !== check) {
      req.flash('registerError', 'Пароли не совпадают');
      return res.redirect('/auth');
    }
    if (await User.findOne({ email })) {
      req.flash('registerError', 'Эта почта уже используется');
      return res.redirect('/auth');
    }
    const user = new User({
      email,
      password: await bscrypt.hash(password, 12)
    });
    await user.save();

    req.session.userID = user._id;
    req.session.isAuth = true;
    req.session.save(err => {
      if (err) throw new err;
      res.redirect('/');
    });
  } catch (e) {
    console.log(e);
    res.redirect('/auth#login');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('loginError', 'Пользователь не найден');
      return res.status(404).redirect('/auth');
    }
    if (!await bscrypt.compare(password, user.password)) {
      req.flash('loginError', 'Пароль неверный');
      return res.status(400).redirect('/auth');
    }
    
    req.session.userID = user._id;
    req.session.isAuth = true;
    req.session.save(err => {
      if (err) throw err;
      res.redirect('/');
    });
  } catch (e) {
    console.log(e);
    res.redirect('/auth');
  }
});

router.get('/logout', async (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) throw err;
      res.redirect('/');
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Server Error' });
  }
});

export default router;