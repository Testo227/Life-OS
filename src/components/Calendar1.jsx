import { useState } from "react";
import 'boxicons'


const Calendar = () => {

    const daysOfWeek = ["So","Mo", "Di", "Mi", "Do", "Fr", "Sa", ]
    const monthsOfYear = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", 'Dezember']
    const currentDate = new Date()

    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
    const [currentYear, setCurrenYear] = useState(currentDate.getFullYear())

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth-1 ))
        setCurrenYear((prevYear) => (currentMonth === 0 ? prevYear-1 : prevYear))
    }

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth+1 ))
        setCurrenYear((prevYear) => (currentMonth === 11 ? prevYear+1 : prevYear))
    }


    return ( 
        <div className="m-0 p-0 box-border outline font-sans w-full h-screen bg-[#2c3542]">
            <div className="w-6/10 bg-[#le242d] p-3">
                <h1 className="">Kalender</h1>
                <div className="">
                    <h2 className="">{monthsOfYear[currentMonth]}</h2>
                    <h2 className="">{currentYear}</h2>
                    <div className="flex">
                        <p onClick={prevMonth}>⬅️</p>
                        <p onClick={nextMonth}>➡️</p>
                    </div>
                </div>
                <div className="grid grid-cols-7">
                    {
                        daysOfWeek.map(day =>
                            <span key={day}>{day}</span>
                        )
                    }
                </div>
                <div className="grid grid-cols-7">
                    {
                        [...Array(firstDayOfMonth).keys()].map((_,i) => <span key={`empty-${i}`}></span>)
                    }
                    {
                        [...Array(daysInMonth).keys()].map((day) => <span key={day+1}>{day+1}</span>)
                    }
                </div>
            </div>
            <div className="">
                <div>
                    <div>Zeit</div>
                    <input type="number" name="hours" min={0} max={24}></input>
                    <input type="number" name="minute" min={0} max={60}></input>
                </div>
                <textarea placeholder="..."></textarea>
                <button className="">Hinzufuegen</button>
                <button>Schliessen</button>
                <div className="">
                    <div>
                        <div>10.01.2026</div>
                        <div>09:30</div>
                    </div>
                    <div>Meeting with Joe</div>
                    <div>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Calendar;