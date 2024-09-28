import { useState } from "react";
import { FormControl } from "@mui/material";
import { LocalizationProvider, DateField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getIn } from "formik";

interface IDatePickerFormField {
  formik: any;
  selectedDate: any;
  handleDateChange: any;
  name: string;
  label: string;
}

export default function DatePickerFormField({
  formik,
  handleDateChange,
  selectedDate,
  name,
  label,
}: Readonly<IDatePickerFormField>) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormControl error={Boolean(getIn(formik.errors, name))} fullWidth>
        <DateField
          size="small"
          variant="outlined"
          label={label}
          value={selectedDate}
          format="DD/MM/YYYY"
          onChange={(event) => {
            console.log(event);
            handleDateChange(event);
          }}
          FormHelperTextProps={{
            style: {
              margin: "1px 10px -5px ",
            },
          }}
        />
      </FormControl>
    </LocalizationProvider>
  );
}
