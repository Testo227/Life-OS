import { useState, useEffect } from "react";

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const TaskModal = ({tasks, setTasks, setShowAddTask}) => {
    const [title,setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [recurrence, setRecurrence] = useState({type:"", days: [""]})
    const [reccure, setReccure] = useState(false)

    // zum Testen 
    useEffect(
        () => console.log(title, date, time, description, recurrence)
    ),[title, date, time, description, recurrence]

    return ( 
        
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        {/* Modal Box */}
        <div className="bg-slate-950 w-full max-w-md p-6 rounded-2xl shadow-xl border border-slate-800">
        
        {/* Header */}
        <div className="flex flex-row-reverse mb-4">
            <button onClick={()=>setShowAddTask(false)} className="text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer">✕</button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">

            {/* Titel / Aufgabe */}
            <div className="flex flex-col">
            <label className="text-slate-200 mb-1 font-medium">Titel / Aufgabe</label>
            <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="..."
                className="bg-slate-900 text-slate-100 px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>

            {/* Datum */}
            <div className="flex flex-col">
            <label className="text-slate-200 mb-1 font-medium">Datum</label>
            <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                className="bg-slate-900 text-slate-100 px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>

            {/* Uhrzeit */}
            <div className="flex flex-col">
            <label className="text-slate-200 mb-1 font-medium">Uhrzeit</label>
            <input
                onChange={(e) => setTime(e.target.value)}
                type="time"
                className="bg-slate-900 text-slate-100 px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>

            {/* Beschreibung */}
            <div className="flex flex-col">
            <label className="text-slate-200 mb-1 font-medium">Beschreibung</label>
            <textarea
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional"
                className="bg-slate-900 text-slate-100 px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-24"
            />
            </div>

            {/* Wiederholen / Recurrence (UI nur) */}
            <div className="flex flex-row gap-2">
            <label className="text-slate-200 mb-1 font-medium">Wiederholen?</label>
            <input onChange={(e) => setReccure(e.target.checked)} type="checkbox"></input>
            {reccure ? 
                <div>
                    hi
                </div>

            : <></>}
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
)}
 
export default TaskModal;