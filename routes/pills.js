import { Router } from "express";

import User from '../models/user.js';
import Pill from '../models/pill.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const user = await req.user.populate('pills').select('email').lean();
    const strPills = JSON.stringify(user.pills);

    res.render('index', { title: 'Pill', ...user, strPills });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Server Error' });
  }
});

router.post('/add', async (req, res) => {
  try {
    const pill = new Pill(req.body);
    await pill.save();
    await User.findByIdAndUpdate(req.session.userID, { $push: { pills: pill } });
    res.send({ id: pill._id });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Server Error' });
  }
});

router.delete('/remove', async (req, res) => {
  try {
    const user = await req.user;
    if (!user.pills.find(pill => pill == req.query.id)) return res.status(404).send({error: 'Pill Not Found'});
    await Pill.findByIdAndDelete(req.query.id);
    await User.findByIdAndUpdate(req.session.userID, {$pull: {pills: req.query.id}});
    res.status(200).send({});
  } catch(e) {
    console.log(e);
    res.status(500).send({error: 'Server Error'});
  }
});

router.patch('/edit', async(req, res) => {
  try {
    const user = await req.user;
    if (!user.pills.find(pill => pill == req.query.id)) return res.status(404).send({error: 'Pill Not Found'});
    await Pill.findByIdAndUpdate(req.query.id, req.body);
    res.status(200).send({});
  } catch (e) {
    console.log(e);
    res.status(500).send({error: 'Server Error'});
  }
});
export default router;