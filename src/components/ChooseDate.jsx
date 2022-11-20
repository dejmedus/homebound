import React, { useState } from "react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";

const ChooseDate = () => {
  const curDate = new Date();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [roundtrip, setRoundtrip] = useState(false);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-4 items-center'>
        <label className='w-24 dark:text-zinc-50' htmlFor="roundtrip">Roundtrip?</label>
        <input className='rounded dark:text-zinc-900' id='roundtrip' value={roundtrip} type="checkbox" name="roundtrip" onChange={() => setRoundtrip(!roundtrip)} />
      </div>
      <div className='flex gap-9 items-center'>
        <label className='w-32 dark:text-zinc-50' htmlFor="startDate">Leave: </label>
        <DatePicker id='startDate' name='startDate' value={startDate} className='rounded w-28 dark:text-zinc-900' selected={startDate} onChange={(date) => date >= curDate ? setStartDate(date) : null}/>
      </div>
      {roundtrip === true
        ?
        <div className='flex gap-9 items-center'>
          <label className='w-32 dark:text-zinc-50' htmlFor="endDate">Return: </label>
          <DatePicker id='endDate' name='endDate' value={endDate} className='rounded w-28 dark:text-zinc-900' selected={endDate} onChange={(date) => date > startDate && date >= curDate ? setEndDate(date) : null} />
        </div>
        : null
      }
    </div>
  );
}

export default ChooseDate