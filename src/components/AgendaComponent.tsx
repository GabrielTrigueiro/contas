import React, { useState, useEffect } from "react";
import { Cliente, Agenda } from "../utils/types";

interface Props {
  agenda: Agenda;
}

const AgendaComponent = ({ agenda }: Props) => {
  const [tempAgenda, setTempAgenda] = useState<Agenda | null>(agenda);

  useEffect(() => {
    setTempAgenda(agenda);
  }, []);

  return (
    <div>
      <h1>Agenda de Produtos</h1>

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
      </div>
    </div>
  );
};

export default AgendaComponent;
