// DateReserve.tsx
"use client"

import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import dayjs from "dayjs"
import { useState, useEffect } from "react"
import CompanyNameArray from "./CompanyNameArray"

export default function DateReserve() {
    const [companyNames, setCompanyNames] = useState<string[]>([])
    const [selectedCompany, setSelectedCompany] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCompanyNames = async () => {
            try {
                setLoading(true)
                const names = await CompanyNameArray()
                console.log('Fetched company names:', names)
                setCompanyNames(names)
                // Removed the automatic selection of first company
            } catch (error) {
                const errorMsg = error instanceof Error ? error.message : 'Unknown error'
                console.error('Error fetching company names:', error)
                setError(errorMsg)
            } finally {
                setLoading(false)
            }
        }
        fetchCompanyNames()
    }, [])

    return (
        <div className="bg-slate-100 rounded-lg space-y-4 w-[400px] h-[250px] px-10 py-10 flex flex-col justify-start">
            <InputLabel id="company-select-label">Select Your Company</InputLabel>
            <Select
                labelId="company-select-label"
                value={selectedCompany}
                label="Select Your Company"
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="bg-white h-[2.5em]"
                variant="standard"
                disabled={loading || !!error}
                aria-labelledby="company-label"
                aria-expanded="false"
                aria-haspopup="listbox"
                displayEmpty // Allows showing a placeholder when value is empty
            >
                {loading ? (
                    <MenuItem value="">Loading...</MenuItem>
                ) : error ? (
                    <MenuItem value="">Error: {error}</MenuItem>
                ) : (
                    <>
                        <MenuItem value="" disabled>
                            Company
                        </MenuItem>
                        {companyNames.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </>
                )}
            </Select>

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