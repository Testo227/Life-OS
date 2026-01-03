
import { useState } from "react";

//Components
import DayBox from "./DayBox";
import TopbarCalendar from "./TopbarCalendar";


// Beispieldaten Kalender spaeter aus Supabase
const generateDatesForYears = () => {
  const dates = [];
  const start = new Date(2025, 0, 1); // 01.01.2025
  const end = new Date(2027, 0, 1);   // 01.01.2027 (exklusiv)

  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();

    // ISO-Format YYYY-MM-DD
    const iso = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    dates.push({
      year,
      month,
      monthName: d.toLocaleString('de-DE', { month: 'long' }),
      day,
      dayName: d.toLocaleString('de-DE', { weekday: 'long' }),
      iso
    });
  }

  return dates;
};



const Calendar = () => {

    const today = new Date();

    const [dates, setDates] = useState(generateDatesForYears())
    const [filter, setFilters] = useState(
        {year: today.getFullYear() , 
        month: '', 
        monthName: today.toLocaleString('de-DE', { month: 'long' }),
        day: '' ,
        dayName: ''})

    return ( 
        <div className="flex flex-col w-full">
            <div>
                <TopbarCalendar dates={dates} filter={filter} setFilters={setFilters}></TopbarCalendar>
            </div>
            <div className="grid grid-cols-7 gap-2 mt-4">
                {dates.map(date =>
                    date.year === filter.year && date.monthName === filter.monthName
                    ? <DayBox key={date.iso} date={date} />
                    : null
                )}
            </div>
        </div>
            
        );
}
 
export default Calendar;