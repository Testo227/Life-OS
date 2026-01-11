import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const Calendar = () => {
    const today = new Date();
    
    
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([
        {id: 1,
        title: "Rueckentraining",
        date: "2026-01-11",
        time: "18:30",
        description: "Ruecken wird auseinander genommen",
        recurrence: {type: "weekly", days: [0]},
        completed: false},
        {id: 2,
        title: "Brustraining",
        date: "2025-12-31",
        time: "18:30",
        description: "Ruecken wird auseinander genommen",
        recurrence: {type: "weekly", days: [0]},
        completed: false},
        {id: 3,
        title: "Brustraining",
        date: "2026-01-29",
        time: "18:30",
        description: "Ruecken wird auseinander genommen",
        recurrence: {type: "weekly", days: [0]},
        completed: false},
        {id: 4,
        title: "Brustraining",
        date: "2026-02-01",
        time: "18:30",
        description: "Ruecken wird auseinander genommen",
        recurrence: {type: "weekly", days: [0]},
        completed: false},
        {id: 5,
        title: "Auto schrotten",
        date: "2026-01-11",
        time: "20:30",
        description: "Ruecken wird auseinander genommen",
        recurrence: {type: "weekly", days: [0]},
        completed: false},
        {id: 6,
        title: "Auto waschen",
        date: "2026-01-11",
        time: "19:30",
        description: "Ruecken wird auseinander genommen",
        recurrence: {type: "weekly", days: [0]},
        completed: false}
    ])

    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay()
    const LastDayOfMonth = new Date(selectedYear, selectedMonth+1 , 0).getDay()
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
    const lastDayOfPrevMonth = new Date(selectedYear, selectedMonth, 0).getDate()

    


    const monthOptions = monthNames.map((month, index) => ({
        name: month,
        value: index
    }))

    

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

    // Get the rendering Tasks for Performance
    const [toRenderTasks, setToRenderTasks] = useState({prevMonth:[], thisMonth:[], nextMonth:[]})

    //for thisMonth
    const handleRenderTasks = () => {
        const thisMonthTasks = [];
        const prevMonthTasks = [];
        const nextMonthTasks = [];

        const thisFirstWeekday =
            (new Date(selectedYear, selectedMonth, 1).getDay() + 6) % 7;

        const thisLastWeekday = 
            (new Date(selectedYear,selectedMonth+1,0).getDay() + 6) % 7;

        const prevMonthYear = new Date(selectedYear, selectedMonth, 0);
        const nextMonthYear = new Date(selectedYear, selectedMonth+1, 1)
        const isShownPrev = thisFirstWeekday !== 0;
        const isShownNext = thisLastWeekday !== 6;
        const prevMonthLastDay = prevMonthYear.getDate();
        const minPrevDay = prevMonthLastDay - thisFirstWeekday + 1;
        const visibleNextDays = isShownNext ? 6 - thisLastWeekday : 0;

        tasks.forEach(task => {
            if (!task.date) return;

            const dateObj = new Date(task.date);
            const day = dateObj.getDate();
            const month = dateObj.getMonth();
            const year = dateObj.getFullYear();

            // THIS MONTH
            if (year === selectedYear && month === selectedMonth) {
            thisMonthTasks.push({ ...task, day });
            }

            // PREV MONTH (nur sichtbare Tage)
            if (
            year === prevMonthYear.getFullYear() &&
            month === prevMonthYear.getMonth() &&
            isShownPrev &&
            day >= minPrevDay
            ) {
            prevMonthTasks.push({ ...task, day });
            }

            //Next Month (nur sichtbare Tage)
            if (
            year === nextMonthYear.getFullYear() &&
            month === nextMonthYear.getMonth() &&
            isShownNext &&
            day <= visibleNextDays
            ) {
            nextMonthTasks.push({ ...task, day });
            }
        });

        setToRenderTasks({
            prevMonth: prevMonthTasks,
            thisMonth: thisMonthTasks,
            nextMonth: nextMonthTasks
        });
        };

    useEffect(() => {
        handleRenderTasks()
    },[selectedMonth, selectedYear])

    ///////////////////////////////////////////



    useEffect(() => {
        // wird automatisch aufgerufen, wenn selectedMonth sich ändert
        setDaysOfPrevMonthYear(handleBeginCal())
        }, [selectedMonth, selectedYear])

    useEffect(() => {
        // wird automatisch aufgerufen, wenn selectedMonth sich ändert
        setDaysOfFolMonthYear(handleEndCal())
        }, [selectedMonth, selectedYear])
   
    



    return ( 
        <div className="flex w-full h-full items-center justify-center pt-4 pb-8 px-8">
            <div className="flex flex-[4] flex-col">
                <div className="flex flex-wrap gap-2 p-2 items-center mb-4">
                    {/*<select className="bg-slate-800 text-slate-100 px-3 py-1 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"  value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                        {monthOptions.map( (pair) =>
                            <option key={pair.value} value={pair.value}>{pair.name}</option>
                        )}
                    </select>*/}
                    <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                        <button onClick={() => setSelectedMonth(selectedMonth === 0 ? 11: selectedMonth - 1)} className="text-slate-100 hover:text-indigo-400 transition-colors"><ChevronLeft size={20} /></button>
                        <span className="text-slate-100 font-medium w-24 text-center">{monthNames[selectedMonth]}</span>
                        <button onClick={() => setSelectedMonth(selectedMonth === 11 ? 0 : selectedMonth + 1)} className="text-slate-100 hover:text-indigo-400 transition-colors"><ChevronRight size={20} /></button>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                        <button onClick={() => setSelectedYear(selectedYear - 1)} className="text-slate-100 hover:text-indigo-400 transition-colors"><ChevronLeft size={20} /></button>
                        <span className="text-slate-100 font-medium">{selectedYear}</span>
                        <button onClick={() => setSelectedYear(selectedYear + 1)} className="text-slate-100 hover:text-indigo-400 transition-colors"><ChevronRight size={20} /></button>
                    </div>
                    <button onClick={() => handleTodayChange()} className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-500 transition-colors">Today</button>
                    <button onClick={()=> setShowAddTask(true)} className="bg-slate-800 text-slate-100 px-3 py-1 rounded-lg border border-slate-700 hover:border-indigo-500 transition-all">+ Neuer Eintrag</button>
                </div>
                <div className="flex flex-col">
                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {
                            daysOfWeek.map((day) =>
                                <div className="text-center text-slate-200 font-medium uppercase text-sm tracking-wider">{day}</div>
                            )
                        }
                    </div>
                    <div className="grid grid-cols-7 gap-4 p-2 h-[1100px] overflow-y-auto  ">
                        {
                            daysOfPrevMonthYear.map((day) => <div className="h-[200px] flex flex-col items-start justify-start p-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-400 hover:border-indigo-500 transition-all duration-200" key={day}>
                                <span className="font-medium text-sm">{day}</span>
                                <ul className="mt-1 flex flex-col gap-1 overflow-y-auto w-full scrollbar-thin scrollbar-thumb-orange-500/40 scrollbar-track-slate-900">
                                {toRenderTasks.prevMonth
                                    .filter(task => task.day === day)
                                    .sort((a, b) => a.time.localeCompare(b.time))
                                    .map(task => (
                                    <li 
                                        onClick={() => setShowAddTask(true)}
                                        key={task.id}
                                        className="text-xs flex justify-between w-full p-1 rounded-md bg-orange-500/20 hover:bg-orange-500/40 text-orange-400 transition-colors"
                                    >
                                        <span className="truncate font-medium">{task.title}</span>
                                        <span className="ml-2 text-slate-400">{task.time}</span> 
                                    </li>
                                    ))}
                                </ul>
                            </div>)
                        }
                        {
                            [...Array(daysInMonth).keys()].map((day) => <div className="h-[200px] flex flex-col items-start justify-start p-2 rounded-lg border border-slate-700 text-slate-100 hover:border-indigo-500 transition-all duration-200" key={day+1}>
                                <span className="font-medium text-sm">{day+1}</span>
                                <ul className="mt-1 flex flex-col gap-1 overflow-y-auto w-full">
                                {toRenderTasks.thisMonth
                                    .filter(task => task.day === day + 1)
                                    .sort((a, b) => a.time.localeCompare(b.time))
                                    .map(task => (
                                    <li 
                                        onClick={() => setShowAddTask(true)}
                                        key={task.id}
                                        className="text-xs flex justify-between w-full p-1 rounded-md bg-orange-500/20 hover:bg-orange-500/40 text-orange-400 transition-colors"
                                    >
                                        <span className="truncate font-medium">{task.title}</span>
                                        <span className="ml-2 text-slate-400">{task.time}</span> 
                                    </li>
                                    ))}
                                </ul>
                            </div>)
                        }
                        {
                            daysOfFolMonthYear.map((day) => <div className="h-[200px] flex flex-col items-start justify-start p-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-400 hover:border-indigo-500 transition-all duration-200" key={day}>
                                <span className="font-medium text-sm">{day}</span>
                                <ul className="mt-1 flex flex-col gap-1 overflow-y-auto w-full">
                                {toRenderTasks.nextMonth
                                    .filter(task => task.day === day)
                                    .sort((a, b) => a.time.localeCompare(b.time))
                                    .map(task => (
                                    <li 
                                        onClick={() => setShowAddTask(true)}
                                        key={task.id}
                                        className="text-xs flex justify-between w-full p-1 rounded-md bg-orange-500/20 hover:bg-orange-500/40 text-orange-400 transition-colors"
                                    >
                                        <span className="truncate font-medium">{task.title}</span>
                                        <span className="ml-2 text-slate-400">{task.time}</span> 
                                    </li>
                                    ))}
                                </ul>
                            </div>)
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-[1] flex-col p-4 rounded-xl shadow-inner overflow-y-auto">
                <h3 className="text-slate-100 font-semibold text-lg mb-4">Tasks</h3>
                <ul className="flex flex-col gap-3">
                    {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="flex items-start gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800 hover:border-indigo-500 transition-colors"
                    >
                        {/* Abhaken Kreis (UI only) */}
                        <button
                        className="mt-1 w-5 h-5 rounded-full border-2 border-slate-500 flex items-center justify-center 
                                    hover:border-indigo-500 hover:bg-indigo-500/10 transition-all"
                        >
                        {/* Häkchen nur optisch */}
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 opacity-0 hover:opacity-100 transition-opacity" />
                        </button>

                        {/* Content */}
                        <div className="flex flex-col flex-1">
                        {/* Title + Description */}
                        <div className="flex items-start justify-between gap-4">
                            <span className="text-slate-100 font-medium truncate">
                            {task.title}
                            </span>

                            {task.description && (
                            <span className="text-slate-400 text-sm max-w-[45%] text-right line-clamp-3">
                                {task.description}
                            </span>
                            )}
                        </div>

                        {/* Date + Time */}
                        <div className="flex gap-4 text-slate-300 text-sm mt-0.5">
                            <span>{task.date}</span>
                            <span>{task.time}</span>
                        </div>

                        {/* Recurrence */}
                        {task.recurrence && (
                            <span className="text-indigo-400 text-xs mt-1">
                            Wiederholt: {task.recurrence.type}
                            </span>
                        )}
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
            {showAddTask ? (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    {/* Modal Box */}
    <div className="bg-slate-950 w-full max-w-md p-6 rounded-2xl shadow-xl border border-slate-800">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-slate-100 text-lg font-semibold">Neuen Eintrag erstellen</h2>
        <button onClick={()=>setShowAddTask(false)} className="text-slate-400 hover:text-indigo-500 transition-colors">✕</button>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4">

        {/* Titel / Aufgabe */}
        <div className="flex flex-col">
          <label className="text-slate-200 mb-1 font-medium">Titel / Aufgabe</label>
          <input
            type="text"
            placeholder="Aufgabe eingeben..."
            className="bg-slate-900 text-slate-100 px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Datum */}
        <div className="flex flex-col">
          <label className="text-slate-200 mb-1 font-medium">Datum</label>
          <input
            type="date"
            className="bg-slate-900 text-slate-100 px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Uhrzeit */}
        <div className="flex flex-col">
          <label className="text-slate-200 mb-1 font-medium">Uhrzeit</label>
          <input
            type="time"
            className="bg-slate-900 text-slate-100 px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Beschreibung */}
        <div className="flex flex-col">
          <label className="text-slate-200 mb-1 font-medium">Beschreibung</label>
          <textarea
            placeholder="Optional"
            className="bg-slate-900 text-slate-100 px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-24"
          />
        </div>

        {/* Wiederholen / Recurrence (UI nur) */}
        <div className="flex flex-col">
          <label className="text-slate-200 mb-1 font-medium">Wiederholen?</label>

          {/* Dropdown */}
          <select className="bg-slate-900 text-slate-100 px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2">
            <option>Nie</option>
            <option>Täglich</option>
            <option>Jeden Wochentag (Mo–Fr)</option>
            <option>Jeden Samstag</option>
            <option>Immer am ersten des Monats</option>
            <option>Immer am letzten des Monats</option>
            <option>Alle 2 Wochen</option>
          </select>

          {/* Dynamische Wochentags-Checkboxes (nur UI) */}
          <div className="flex gap-2 flex-wrap">
            {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
              <label key={day} className="flex items-center gap-1 text-slate-100">
                <input type="checkbox" className="accent-indigo-500 w-4 h-4" />
                {day}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={() => setShowAddTask(false)} className="px-4 py-2 rounded-lg bg-slate-800 text-slate-100 hover:bg-slate-700 transition-colors">
            Abbrechen
          </button>
          <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors">
            Speichern
          </button>
        </div>

      </div>
    </div>
  </div>
) : null}
        </div>
     );
}
 
export default Calendar ;