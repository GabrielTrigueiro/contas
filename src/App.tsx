import { Button } from "@mui/material";
import AgendaComponent from "./components/AgendaComponent";
import db from "./data/db.json";
import { Agenda } from "./utils/types";
import CustomModal from "./components/CustomModal";
import { useState } from "react";
import CriarAgendaComponent from "./components/CriarAgendaComponent";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <Button variant="contained" onClick={() => setOpen(true)}>
        Criar Agenda
      </Button>
      {db.agenda.map((agenda, index) => (
        <AgendaComponent key={index} agenda={agenda as Agenda} />
      ))}
      <CustomModal
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      >
        <CriarAgendaComponent />
      </CustomModal>
    </div>
  );
}

export default App;
