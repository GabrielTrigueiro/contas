import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data/db.json"; // Ajuste o caminho conforme necessário
import { Agenda } from "../utils/types"; // Certifique-se de que você tem o tipo Agenda definido

const TelaServico = () => {
  const { id } = useParams(); // Pega o id da URL
  const [agenda, setAgenda] = useState<Agenda | null>(null);

  useEffect(() => {
    const foundAgenda = data.agenda.find((agenda) => agenda.id === id);
    if (foundAgenda) {
      setAgenda(foundAgenda as Agenda);
    }
  }, [id]);

  if (!agenda) {
    return <div>Nenhuma agenda encontrada com o ID {id}.</div>;
  }

  return (
    <div>
      <h1>Histórico da Agenda {id}</h1>
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

export default TelaServico;
