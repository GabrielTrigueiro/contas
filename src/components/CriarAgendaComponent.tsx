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

import db from "../data/db.json";
import {
  Cliente,
  Produto,
  tipoProduto,
  ParteDoProduto,
  Agenda,
} from "../utils/types";

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

const CriarAgendaComponent: React.FC = () => {
  const [dataInicio, setDataInicio] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [dataPrevistaFim, setDataPrevistaFim] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [dataFim, setDataFim] = useState<string | null>(null);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [tempTipoProduto, setTempTipoProduto] = useState<tipoProduto | null>(
    null
  );
  const [tempCliente, setTempCliente] = useState<Cliente | null>(null);

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [novoProduto, setNovoProduto] = useState<Produto>({
    client: null,
    type: tempTipoProduto,
    items: [],
  });

  const handleAddProduto = () => {
    setProdutos([...produtos, novoProduto]);
    setNovoProduto({
      client: tempCliente,
      type: tipoProdutos[0],
      items: [],
    });
  };

  const handleInputChange = (field: keyof Produto, value: any) => {
    setNovoProduto({
      ...novoProduto,
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
              <Typography>Itens: {produto.items.length}</Typography>
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
