import { useState, useEffect } from "react";

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const TaskModal = ({tasks, setTasks, setShowAddTask}) => {
    const [title,setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [recurrence, setRecurrence] = useState({type:"No", days: [""]})
    const [individual, setIndividual] = useState(false)


    const handleSetReccure = (type) => {
        type === "Individual" ? setIndividual(true) : setIndividual(false)
        
    }


    // zum Testen 
    useEffect(
        () => console.log(title, date, time, description, recurrence, individual)
    ),[title, date, time, description, recurrence, individual]

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
            <div className="flex flex-col gap-2">
            <label className="text-slate-200 mb-1 font-medium">Wiederholen?</label>
            <select className="text-slate-200 mb-1 font-medium bg-black/50" onChange={(e) => handleSetReccure(e.target.value)}>
                <option value="No">No</option>
                <option value="Daily">Daily</option>
                <option value="On weekdays">On weekdays</option>
                <option value="On weekends">On weekends</option>
                <option value="Weekly">Weekly</option>
                <option value="Every 2 weeks">Every 2 weeks</option>
                <option value="Monthly">Monthly</option>
                <option value="Every 3 months">Every 3 months</option>
                <option value="Every 6 months">Every 6 months</option>
                <option value="Yearly">Yearly</option>
                <option value="Individual">Individual</option>
            </select>
            {
                individual ? 
                <>
                <div className="flex flex-row gap-2">
                <label className="text-slate-200 mb-1 font-small">Frequency:</label>
                <select className="text-slate-200 mb-1 font-medium bg-black/50">
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                </select>
                </div>

                <div>
                <label className="text-slate-200 mb-1 font-small">Every:</label>
                <input className="text-slate-200 mb-1 font-medium bg-black/50" type="number" max="999" min="1"></input>
                </div>
                </>
                : 
                <></>
            }
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