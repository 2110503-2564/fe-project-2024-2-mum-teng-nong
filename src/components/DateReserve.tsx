"use client"

import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs"

export default function DateReserve() {
    return (
        <div className="bg-slate-100 rounded-lg space-y-4 w-[400px] h-[150px] px-10 py-10 flex flex-col justify-start">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    className="bg-white w-full" 
                    minDate={dayjs("2022-05-10")}  
                    maxDate={dayjs("2022-05-13")}
                    shouldDisableDate={(date) => {
                        const allowedDates = ["2022-05-10", "2022-05-11", "2022-05-12", "2022-05-13"];
                        return !allowedDates.includes(date.format("YYYY-MM-DD"));
                    }}
                />
            </LocalizationProvider>
        </div>
    )
}
