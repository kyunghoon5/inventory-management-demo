'use strict';
const bcrypt = require('bcrypt');
const eventData = require('../data/events/index');

const getAllEvents = async (req, res, next) => {
  try {
    const eventlist = await eventData.getEvents();
    res.send(eventlist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = await eventData.getById(eventId);
    res.send(event);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addEvent = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: 'Username and password are required.' });

    const usernames = await eventData.getEvents();
    const duplicate = usernames.find((obj) => obj.username === username);

    if (duplicate) {
      return res.status(409).send('Username already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const insert = await eventData.creatEvent({
      username: username,
      password: hashedPassword,
    });
    res.send(insert);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const data = req.body;

    const updated = await eventData.updateEvent(eventId, data);
    res.send(updated);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const deletedEvent = await eventData.deleteEvent(eventId);
    res.send(deletedEvent);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllEvents,
  getEvent,
  addEvent,
  updatEvent,
  deleteEvent,
};
