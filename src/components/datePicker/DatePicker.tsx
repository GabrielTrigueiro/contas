import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateCalendar,
  DateField,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import {
  Container,
  SecondContainer,
  StyledDivCalendar,
  StyledDivPrimaryCalendar,
  StyledDivTextCalendar,
} from "./styles";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import DefaultModal, { IModalProps } from "../defaultModal/defaultModal";

interface IDataPicker extends IModalProps {
  initialDate: Dayjs | null | undefined;
  setInitialDate: any;
  typeOfDatePicker: string;
}

type TDataPicker = Omit<IDataPicker, "children">;

export default function DataPicker(props: Readonly<TDataPicker>) {
  const { isOpen, onClose, onOpen, title, typeOfDatePicker } = props;

  return (
    <DefaultModal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
    >
      <DatePickerModal {...props} typeOfDatePicker={typeOfDatePicker} />
    </DefaultModal>
  );
}

const DatePickerModal = (props: Readonly<TDataPicker>) => {
  const {
    initialDate: propInitialDate,
    setInitialDate,
    onClose,
    typeOfDatePicker,
  } = props;

  const [initialDate, setLocalInitialDate] = useState<Dayjs | null | undefined>(
    propInitialDate
  );

  useEffect(() => {
    if (typeOfDatePicker === "mes" && !initialDate) {
      setLocalInitialDate(dayjs().startOf("month"));
    }
  }, [typeOfDatePicker, initialDate]);

  const handleEnviarClick = () => {
    setInitialDate(initialDate);
    onClose();
  };

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <SecondContainer>
          <StyledDivPrimaryCalendar>
            <StyledDivTextCalendar>
              <DateField
                size={"small"}
                variant={"standard"}
                label="Data Inicial"
                value={initialDate}
                format="DD/MM/YYYY"
                onChange={(value) => setLocalInitialDate(value)}
                minDate={dayjs("1950-01-01")}
                maxDate={dayjs("2006-12-31")}
              />
            </StyledDivTextCalendar>
            <StyledDivCalendar>
              <DateCalendar
                value={initialDate}
                onChange={(value) => setLocalInitialDate(value)}
                minDate={dayjs("1950-01-01")}
                maxDate={dayjs("2006-12-31")}
              />
            </StyledDivCalendar>
          </StyledDivPrimaryCalendar>
        </SecondContainer>
        <Button
          sx={{ width: "10svw", marginTop: "30px" }}
          component="label"
          variant="contained"
          onClick={handleEnviarClick}
        >
          Enviar
        </Button>
      </LocalizationProvider>
    </Container>
  );
};
