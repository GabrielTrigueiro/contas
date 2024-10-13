import { useState } from "react";
import { FormControl, FormHelperText } from "@mui/material";
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
      <FormControl fullWidth>
        <DateField
          size="small"
          variant="outlined"
          label={label}
          value={selectedDate}
          format="DD/MM/YYYY"
          onChange={(event) => handleDateChange(event)}
          FormHelperTextProps={{
            style: {
              margin: "1px 10px -5px",
            },
          }}
        />
        {/* {Boolean(getIn(formik.errors, name)) && (
          <FormHelperText>{getIn(formik.errors, name)}</FormHelperText>
        )} */}
      </FormControl>
    </LocalizationProvider>
  );
}
