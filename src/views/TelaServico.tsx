import { useParams } from "react-router-dom";

const TelaServico = () => {
  const { id } = useParams(); // Pega o id da URL

  return (
    <div>
      <h1>Histórico da Agenda {id}</h1>
      {/* Renderize as informações da agenda aqui */}
    </div>
  );
};

export default TelaServico;
