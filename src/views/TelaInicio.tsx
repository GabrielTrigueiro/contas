import { Button } from "@mui/material";
import CriarAgendaComponent from "../components/CriarAgendaComponent";
import CustomModal from "../components/CustomModal";
import { Agenda } from "../utils/types";
import db from "../data/db.json";
import { useState } from "react";
import ListaDeServicos from "../components/ListaDeServicos";

export default function TelaInicio() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-center m-4">
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Criar planejamento
        </Button>
      </div>

      <ListaDeServicos lista={db.agenda as Agenda[]} />

      {/* <CustomModal
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      >
        <CriarAgendaComponent />
      </CustomModal> */}
    </div>
  );
}
