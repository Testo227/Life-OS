import { useState, useMemo, useRef, useEffect } from "react";

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const Calendar = () => {
    const today = new Date();
    
    
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedYear, setSelectedYear] = useState(today.getFullYear())
    

    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay()
    const LastDayOfMonth = new Date(selectedYear, selectedMonth+1 , 0).getDay()
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
    const lastDayOfPrevMonth = new Date(selectedYear, selectedMonth, 0).getDate()

    


    const monthOptions = monthNames.map((month, index) => ({
        name: month,
        value: index
    }))

    
    console.log([...Array(firstDayOfMonth).keys()])
    

    const handleTodayChange = () => {
        setSelectedMonth(today.getMonth())
        setSelectedYear(today.getFullYear())
    }
    
    const handleBeginCal = () => {
        const ZeroMonday = (firstDayOfMonth + 6) % 7
        const days = []
        
        for (let i = ZeroMonday -1; i >=0; i--){
            days.push(lastDayOfPrevMonth - i)
        }
        return days 
    }

    const handleEndCal = () => {
        const ZeroMonday = (LastDayOfMonth + 6) % 7
        const numNextDays = 6 - ZeroMonday
        const days = []

        for (let i = 1; i <= numNextDays; i++){
            days.push(i)
        }
        return days
    }
    
    const [daysOfPrevMonthYear, setDaysOfPrevMonthYear] = useState(() => handleBeginCal())
    const [daysOfFolMonthYear, setDaysOfFolMonthYear] = useState(() => handleEndCal())

    useEffect(() => {
        // wird automatisch aufgerufen, wenn selectedMonth sich ändert
        setDaysOfPrevMonthYear(handleBeginCal())
        }, [selectedMonth, selectedYear])

    useEffect(() => {
        // wird automatisch aufgerufen, wenn selectedMonth sich ändert
        setDaysOfFolMonthYear(handleEndCal())
        }, [selectedMonth, selectedYear])
   
    



    return ( 
        <div>
            <div className="flex gap-2">
                <select  value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                    {monthOptions.map( (pair) =>
                        <option key={pair.value} value={pair.value}>{pair.name}</option>
                    )}
                </select>
                <div className="flex">
                    <div onClick={() => setSelectedYear(selectedYear - 1)} className="hover:cursor-pointer">⬅️</div>
                    <div>{selectedYear}</div>
                    <div onClick={() => setSelectedYear(selectedYear + 1)} className="hover:cursor-pointer">➡️</div>
                </div>
                <button onClick={() => handleTodayChange()} className="hover:cursor-pointer">Today</button>
                <button className="hover:cursor-pointer">+ Neuer Eintrag</button>
            </div>
            <div className="flex flex-col">
                <div className="grid grid-cols-7">
                    {
                        daysOfWeek.map((day) =>
                            <div>{day}</div>
                        )
                    }
                </div>
                <div className="grid grid-cols-7">
                    {
                        daysOfPrevMonthYear.map((day) => <div key={day}>{day}</div>)
                    }
                    {
                        [...Array(daysInMonth).keys()].map((day) => <div key={day+1}>{day+1}</div>)
                    }
                    {
                        daysOfFolMonthYear.map((day) => <div key={day}>{day}</div>)
                    }
                </div>
            </div>
        </div>
     );
}
 
export default Calendar ;