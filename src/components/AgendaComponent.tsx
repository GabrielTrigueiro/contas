import { useState, useEffect } from "react";
import { Agenda } from "../utils/types";
import { formatDateToDDMMYYYY } from "../utils/formatData";
import { formatCurrency } from "../utils/formarCurrency";

interface Props {
  agenda: Agenda;
}

const AgendaComponent = ({ agenda }: Props) => {
  const [tempAgenda, setTempAgenda] = useState<Agenda | null>(agenda);

  // calcula o valor total
  const total = agenda.produtos.reduce(
    (acc, curr) => acc + curr.items.reduce((acc, curr) => acc + curr.preco!, 0),
    0
  );

  // Lógica para definir a cor da borda
  const hoje = new Date();
  const dataPrevistaFim = new Date(agenda.dataPrevistaFim);
  const umDiaAntes = new Date(dataPrevistaFim);
  umDiaAntes.setDate(dataPrevistaFim.getDate() - 1);

  let borderColor = "border-blue-500"; // Dentro do prazo
  if (agenda.emAberto) {
    if (hoje > dataPrevistaFim) {
      borderColor = "border-red-500"; // Prazo final já passou
    } else if (hoje >= umDiaAntes && hoje <= dataPrevistaFim) {
      borderColor = "border-yellow-500"; // Um dia antes do prazo
    }
  }

  const IndicatorIcon = () => {
    if (hoje > dataPrevistaFim) {
      return <span className="text-red-500">❌</span>;
    } else if (hoje >= umDiaAntes && hoje <= dataPrevistaFim) {
      return <span className="text-yellow-500">⚠️</span>;
    }
    return <span className="text-blue-500">🫠</span>;
  };

  useEffect(() => {
    setTempAgenda(agenda);
  }, []);

  return (
    <div
      className={`rounded-lg bg-white p-4 shadow-md border-2 ${borderColor} flex gap-2 justify-between hover:bg-slate-100 cursor-pointer hover:shadow-lg`}
    >
      <p>{formatCurrency(total)}</p>
      <p className="text-lg">
        {formatDateToDDMMYYYY(agenda.dataInicio)} -{" "}
        {formatDateToDDMMYYYY(agenda.dataPrevistaFim)}
      </p>
      <IndicatorIcon />
      {/* <h1>Agenda de Produtos</h1>

      <div>
        <h2>
          Agenda de {new Date(agenda.dataInicio).toLocaleDateString()} até{" "}
          {new Date(agenda.dataPrevistaFim).toLocaleDateString()}
        </h2>
        <ul>
          {agenda.produtos.map((produto, prodIndex) => (
            <li key={prodIndex}>
              <strong>Cliente:</strong> {produto?.client?.name} (
              {produto?.client?.tipoCliente})<br />
              <strong>Produto:</strong> {produto.type}
              <br />
              <strong>Partes:</strong>
              <ul>
                {produto.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <strong>{item.tipoDaParte}:</strong> {item.bordado}{" "}
                    {item.pronto ? "(Pronto)" : "(Em andamento)"}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default AgendaComponent;
