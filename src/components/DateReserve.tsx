"use client"

import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Select, MenuItem, TextField, Button } from '@mui/material'

export default function DateReserve() {
    return (
        <div className="bg-slate-100 rounded-lg space-y-4 w-[400px] h-[400px] px-10 py-10 flex flex-col justify-start">
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white w-full" />
            </LocalizationProvider>

            <Select
                variant="standard"
                name="venue"
                id="venue"
                className="h-[2.5em] w-full"
                aria-labelledby="venue-label"
                aria-expanded="false" 
                aria-haspopup="listbox"
            >
                <MenuItem value="Bloom" aria-labelledby="venue-label">The Bloom Pavilion</MenuItem>
                <MenuItem value="Spark">Spark Space</MenuItem>
                <MenuItem value="GrandTable">The Grand Table</MenuItem>
            </Select>

            <TextField
                variant="standard"
                label="Name-Lastname"
                name="Name-Lastname"
                className="h-[2.5em] w-full"
            />

            <TextField
                variant="standard"
                label="Contact-Number"
                name="Contact-Number"
                className="h-[2.5em] w-full"
            />
        </div>
    )
}
