import axios from 'axios';
import { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_DB_URL;

const ScheduleCalendarAPI = () => {
const [scheduleCal, setScheduleCal] = useState([])


const scheduleAPI = async () => {
  return await axios
  .get(`${BASE_URL}schedule`)
  .then((response)=>{
    setScheduleCal(response.data)
  })
  .catch((err)=>console.log(err))
}

useEffect(()=>{ scheduleAPI()},[])

  return {scheduleCal}
};

export default ScheduleCalendarAPI;
