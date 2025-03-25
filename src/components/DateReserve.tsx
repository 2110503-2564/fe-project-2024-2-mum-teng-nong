"use client";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import CompanyNameArray from "./CompanyNameArray";

interface DateReserveProps {
  onChange: (date: string, companyId: string) => void;
}

interface CompanyOption {
  id: string;
  name: string;
}

export default function DateReserve({ onChange }: DateReserveProps) {
  const [companyData, setCompanyData] = useState<CompanyOption[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyNames = async () => {
      try {
        setLoading(true);
        const companies = await CompanyNameArray();
        console.log("Fetched companies:", companies);
        setCompanyData(companies);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        console.error("Error fetching company names:", error);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyNames();
  }, []);

  const handleCompanyChange = (e: any) => {
    const companyId = e.target.value as string;
    setSelectedCompanyId(companyId);
    onChange(selectedDate ? selectedDate.format("YYYY-MM-DD") : "", companyId);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    onChange(date ? date.format("YYYY-MM-DD") : "", selectedCompanyId);
  };

  return (
    <div className="bg-slate-100 rounded-lg space-y-4 w-[400px] h-[250px] px-10 py-10 flex flex-col justify-start">
      <FormControl fullWidth>
        <InputLabel id="company-select-label">Select Your Company</InputLabel>
        <Select
          labelId="company-select-label"
          value={selectedCompanyId}
          label="Select Your Company"
          onChange={handleCompanyChange}
          className="bg-white h-[2.5em]"
          variant="standard"
          disabled={loading || !!error}
          aria-labelledby="company-label"
          aria-expanded="false"
          aria-haspopup="listbox"
        >
          <MenuItem value="">
            <em>-- Select a company --</em>
          </MenuItem>
          {loading ? (
            <MenuItem value="">Loading...</MenuItem>
          ) : error ? (
            <MenuItem value="">Error: {error}</MenuItem>
          ) : companyData.length === 0 ? (
            <MenuItem value="">No companies available</MenuItem>
          ) : (
            companyData.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                {company.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="bg-white w-full"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </LocalizationProvider> */}
       <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    className="bg-white w-full" 
                    value={selectedDate}
                    onChange={handleDateChange}
                    minDate={dayjs("2022-05-10")}  
                    maxDate={dayjs("2022-05-14")}
                    shouldDisableDate={(date) => {
                        const allowedDates = ["2022-05-10", "2022-05-11", "2022-05-12", "2022-05-13","2022-05-14"];
                        return !allowedDates.includes(date.format("YYYY-MM-DD"));
                    }}
                />
            </LocalizationProvider>
    </div>
  );
}