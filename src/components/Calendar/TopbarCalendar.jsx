import { useState, useMemo } from "react";


const TopbarCalendar = ({dates, setFilters, filter}) => {

    const uniqueYears = [2025, 2026, 2027, 2028];
    const uniqueMonths = ["Januar", 
                        "Februar", 
                        "März",
                        "April",
                        "Mai",
                        "Juni",
                        "Juli",
                        "August",
                        "September",
                        "Oktober",
                        "November",
                        "Dezember"]

    const handelAddFilter = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        })

        )
    }
    

    return ( 
        <div>
            <div>
                <select value={filter.monthName} 
                    onChange={ (e) => handelAddFilter("monthName", e.target.value)}>
                    {
                        uniqueMonths.map( month =>
                            <option value={month} key={month}>
                            {month}
                            </option>
                        )
                    }
                </select>
            </div>
            <div>
                <select value={filter.year}
                    onChange={(e) => handelAddFilter("year", Number(e.target.value))}>
                    {
                        uniqueYears.map(year =>
                            <option value={year} key={year}>
                                {year}
                            </option>
                        )
                    }
                </select>
            </div>
        </div>
     );
}
 
export default TopbarCalendar;