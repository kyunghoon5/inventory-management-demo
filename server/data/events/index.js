'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getEvents = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('events');
    const eventsList = await pool.request().query(sqlQueries.eventslist);

    return eventsList.recordset.map((obj) => {
      return {
        id: obj.id,
        username: obj.username,
        password: obj.password,
        refreshToken: obj.refreshToken
      };
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (eventId) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('events');
    const event = await pool
      .request()
      .input('eventId', sql.Int, eventId)
      .query(sqlQueries.eventbyId);
    return event.recordset;
  } catch (error) {
    return error.message;
  }
};

const creatEvent = async (eventdata) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('events');
    const insertEvent = await pool
      .request()
      .input('username', sql.NVarChar(255), eventdata.username)
      .input('password', sql.NVarChar(255), eventdata.password)
      .input('refreshToken', sql.NVarChar(255), eventdata.refreshToken)
      .query(sqlQueries.registerEvent);
    return insertEvent.recordset;
  } catch (error) {
    return error.message;
  }
};

const saveRefreshToken = async (eventUsername,eventdata) => {

  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('events');
    const updateEvent = await pool
      .request()
      .input('refreshToken', sql.NVarChar(255), eventdata)
      .input('eventUsername', sql.NVarChar(255), eventUsername)
      .query(sqlQueries.updateEvent);
    return updateEvent.recordset;
  } catch (error) {
    return error.message;
  }
};

const updateEvent = async (eventId, data) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('events');
    const update = await pool
      .request()
      .input('eventId', sql.Int, eventId)
      .input('user_name', sql.NVarChar(255), data.user_name)
      .input('notes', sql.NVarChar(255), data.notes)
      .input('title', sql.NVarChar(255), data.title)
      .input('start_date', sql.DateTime, data.start_date)
      .input('end_date', sql.DateTime, data.end_date)
      .input('allDay', sql.NVarChar(255), data.allDay)
      .input('dept', sql.NVarChar(255), data.dept)
      .query(sqlQueries.updateEvent);
    return update.recordset;
  } catch (error) {
    return error.message;
  }
};

const deleteEvent = async (eventId) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('events');
    const deleteEvent = await pool
      .request()
      .input('eventId', sql.Int, eventId)
      .query(sqlQueries.deleteEvent);
    return deleteEvent.recordset;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getEvents,
  getById,
  creatEvent,
  updateEvent,
  deleteEvent,
  saveRefreshToken,
};
