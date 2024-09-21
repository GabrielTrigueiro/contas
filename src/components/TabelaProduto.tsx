import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  IconButton,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
  Button,
  Collapse,
  Tooltip,
} from "@mui/material";
import { Edit, Plus, Trash, View } from "lucide-react";
import { useState } from "react";

import { ParteDoProduto, Produto, tipoDaParteDoProduto } from "../utils/types";
import CustomModal from "./CustomModal";

interface Props {
  products: Produto[];
  onRemove: (id: string) => void;
  handleRemoveSubitem: (produtoIndex: number, subitemId: string) => void;
  handleAddSubitem: (produtoIndex: number) => void;
}

const partesProduto: tipoDaParteDoProduto[] = [
  "Manga Esquerda",
  "Manga Direita",
  "Costas",
  "Peito Esquerdo",
  "Peito Direito",
];

export default function TabelaProduto({
  products,
  onRemove,
  handleAddSubitem,
  handleRemoveSubitem,
}: Readonly<Props>) {
  const [editSubItemsModal, setEditSubItemsModal] = useState(false);
  const [tempProdutoIndex, setTempProdutoIndex] = useState<number | null>(null);
  const [viewSubItemsIndex, setViewSubItemsIndex] = useState<number | null>(
    null
  ); // Novo estado
  const [novoSubitem, setNovoSubitem] = useState<ParteDoProduto>({
    id: "",
    tipoDaParte: partesProduto[0],
    bordado: "",
  });

  const handleSubitemChange = (field: keyof ParteDoProduto, value: any) => {
    setNovoSubitem({
      ...novoSubitem,
      [field]: value,
    });
  };

  const openModal = (produtoIndex: number) => {
    setTempProdutoIndex(produtoIndex);
    setNovoSubitem({
      id: "",
      tipoDaParte: partesProduto[0],
      bordado: "",
    });
    setEditSubItemsModal(true);
  };

  const closeModal = () => {
    setEditSubItemsModal(false);
    setTempProdutoIndex(null);
  };

  const toggleViewSubItems = (produtoIndex: number) => {
    if (viewSubItemsIndex === produtoIndex) {
      setViewSubItemsIndex(null);
    } else {
      setViewSubItemsIndex(produtoIndex);
    }
  };

  return (
    <div>
      {/* Modal para adicionar subitem */}
      <CustomModal
        open={editSubItemsModal}
        handleClose={closeModal}
        handleOpen={() => setEditSubItemsModal(true)}
      >
        <div className="flex flex-col gap-2">
          <Typography variant="subtitle1">Adicionar Subitem:</Typography>
          <div className="flex gap-2">
            <FormControl variant="filled" fullWidth margin="normal">
              <InputLabel>Tipo da Parte</InputLabel>
              <NativeSelect
                value={novoSubitem.tipoDaParte}
                variant="outlined"
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
              onChange={(e) => handleSubitemChange("bordado", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Preço"
              value={novoSubitem.preco}
              onChange={(e) => handleSubitemChange("preco", e.target.value)}
              fullWidth
              margin="normal"
            />
          </div>
          {novoSubitem.bordado === "curso" && (
            <div className="flex gap-2">
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
            </div>
          )}
          <Button
            onClick={() => {
              if (tempProdutoIndex !== null) {
                handleAddSubitem(tempProdutoIndex);
              }
              closeModal();
            }}
          >
            Adicionar Subitem
          </Button>
        </div>
      </CustomModal>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell align="left">Quem solicitou</TableCell>
              <TableCell align="left">Cliente</TableCell>
              <TableCell align="right">Tipo</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row, produtoIndex) => (
              <>
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.client?.name}
                  </TableCell>
                  <TableCell align="left">{row.nomePessoa}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Remover">
                      <IconButton onClick={() => onRemove(row.id)}>
                        <Trash />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Adicionar">
                      <IconButton onClick={() => openModal(produtoIndex)}>
                        <Plus />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Ver Subitem">
                      <IconButton
                        onClick={() => toggleViewSubItems(produtoIndex)}
                      >
                        <View />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>
                    <Collapse
                      in={viewSubItemsIndex === produtoIndex}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Typography variant="subtitle2">Subitens:</Typography>
                      {row.items.map((subitem) => (
                        <div key={subitem.id}>
                          <Typography>{`Parte: ${subitem.tipoDaParte}, Bordado: ${subitem.bordado}`}</Typography>
                          <IconButton
                            onClick={() =>
                              handleRemoveSubitem(produtoIndex, subitem.id)
                            }
                          >
                            <Trash />
                          </IconButton>
                        </div>
                      ))}
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
