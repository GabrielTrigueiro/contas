import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import {
  Cliente,
  Produto,
  tipoProduto,
  ParteDoProduto,
  tipoDaParteDoProduto,
} from "../utils/types";
import db from "../data/db.json";

const tipoProdutos: tipoProduto[] = [
  "jaleco",
  "bolso",
  "bata",
  "macacao",
  "coletes",
  "camisa",
  "blusa",
  "patch",
  "tarja",
  "outros",
];

const partesProduto: tipoDaParteDoProduto[] = [
  "Manga Esquerda",
  "Manga Direita",
  "Costas",
  "Peito Esquerdo",
  "Peito Direito",
];

const CriarAgendaComponent: React.FC = () => {
  const [dataInicio, setDataInicio] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [dataPrevistaFim, setDataPrevistaFim] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [dataFim, setDataFim] = useState<string | null>(null);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [novoProduto, setNovoProduto] = useState<Produto>({
    client: null,
    type: tipoProdutos[0],
    items: [],
  });

  const [novoSubitem, setNovoSubitem] = useState<ParteDoProduto>({
    tipoDaParte: partesProduto[0],
    bordado: "",
  });

  const handleAddProduto = () => {
    setProdutos([...produtos, novoProduto]);
    setNovoProduto({
      client: null,
      type: tipoProdutos[0],
      items: [],
    });
  };

  const handleAddSubitem = (produtoIndex: number) => {
    const updatedProdutos = [...produtos];
    updatedProdutos[produtoIndex].items.push(novoSubitem);
    setProdutos(updatedProdutos);
    setNovoSubitem({
      tipoDaParte: partesProduto[0],
      bordado: "",
    });
  };

  const handleInputChange = (field: keyof Produto, value: any) => {
    setNovoProduto({
      ...novoProduto,
      [field]: value,
    });
  };

  const handleSubitemChange = (field: keyof ParteDoProduto, value: any) => {
    setNovoSubitem({
      ...novoSubitem,
      [field]: value,
    });
  };

  useEffect(() => {
    setClientes(db.clientes as Cliente[]);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" textAlign={"center"} gutterBottom>
        Novo planejamento
      </Typography>

      {/* Seleção de datas */}
      <div className="flex  gap-2 w-full">
        <TextField
          label="Data de Início"
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Data Prevista de Fim"
          type="date"
          value={dataPrevistaFim}
          onChange={(e) => setDataPrevistaFim(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Data de Fim"
          type="date"
          value={dataFim || ""}
          onChange={(e) => setDataFim(e.target.value || null)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
      </div>

      {/* Seleção do cliente */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Cliente</InputLabel>
        <NativeSelect
          value={novoProduto?.client?.name}
          onChange={(e) =>
            handleInputChange(
              "client",
              clientes.find((cliente) => cliente.name === e.target.value)
            )
          }
        >
          <option value={undefined}>--</option>
          {clientes.map((cliente) => (
            <option key={cliente.name} value={cliente.name}>
              {cliente.name}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

      {/* Seleção do tipo de produto */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Tipo de Produto</InputLabel>
        <NativeSelect
          value={novoProduto.type}
          onChange={(e) =>
            handleInputChange("type", e.target.value as tipoProduto)
          }
        >
          <option value={undefined}>--</option>
          {tipoProdutos.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProduto}
        sx={{ mt: 2 }}
      >
        Adicionar Produto
      </Button>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Produtos Adicionados:</Typography>
        {produtos.length > 0 ? (
          produtos.map((produto, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <Typography>Cliente: {produto?.client?.name}</Typography>
              <Typography>Tipo: {produto.type}</Typography>

              <Typography>Itens:</Typography>
              {produto.items.length > 0 ? (
                produto.items.map((item, idx) => (
                  <Box key={idx} sx={{ ml: 2 }}>
                    <Typography>Parte: {item.tipoDaParte}</Typography>
                    <Typography>Bordado: {item.bordado}</Typography>
                    {item.bordado === "curso" && (
                      <>
                        <Typography>Curso: {item.nomeDoCurso}</Typography>
                        <Typography>
                          Faculdade: {item.nomeDaFaculdade}
                        </Typography>
                      </>
                    )}
                  </Box>
                ))
              ) : (
                <Typography>Nenhum subitem adicionado</Typography>
              )}

              {/* Adicionar novo subitem */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Adicionar Subitem:</Typography>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Tipo da Parte</InputLabel>
                  <NativeSelect
                    value={novoSubitem.tipoDaParte}
                    onChange={(e) =>
                      handleSubitemChange(
                        "tipoDaParte",
                        e.target.value as tipoDaParteDoProduto
                      )
                    }
                  >
                    {partesProduto.map((parte) => (
                      <option key={parte} value={parte}>
                        {parte}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>

                <TextField
                  label="Bordado"
                  value={novoSubitem.bordado}
                  onChange={(e) =>
                    handleSubitemChange("bordado", e.target.value)
                  }
                  fullWidth
                  margin="normal"
                />

                {novoSubitem.bordado === "curso" && (
                  <>
                    <TextField
                      label="Nome do Curso"
                      value={novoSubitem.nomeDoCurso || ""}
                      onChange={(e) =>
                        handleSubitemChange("nomeDoCurso", e.target.value)
                      }
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Nome da Faculdade"
                      value={novoSubitem.nomeDaFaculdade || ""}
                      onChange={(e) =>
                        handleSubitemChange("nomeDaFaculdade", e.target.value)
                      }
                      fullWidth
                      margin="normal"
                    />
                  </>
                )}

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleAddSubitem(index)}
                  sx={{ mt: 2 }}
                >
                  Adicionar Subitem
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>Nenhum produto adicionado</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CriarAgendaComponent;
