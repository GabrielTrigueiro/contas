import { v4 as uuid } from "uuid";
import { Agenda } from "../utils/types";
import CardDeServico from "./CardDeServico";

interface Props {
  lista: Agenda[];
}

export default function ListaDeServicos({ lista }: Readonly<Props>) {
  return (
    <div className="flex flex-col items-center justify-center max-h-svh overflow-y-scroll">
      <h1 className="text-2xl font-bold text-center mb-4">
        Histórico de serviços
      </h1>
      <div className="w-full max-w-md grid grid-cols-1 gap-4 p-4 text-center">
        {lista.map((agenda) => (
          <CardDeServico key={uuid()} agenda={agenda} />
        ))}
      </div>
    </div>
  );
}
