import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  IconButton,
} from "@mui/material";
import { Produto } from "../utils/types";
import { Edit, Trash, View } from "lucide-react";

interface Props {
  products: Produto[];
  onRemove: (id: string) => void;
}

export default function TabelaProduto({ products, onRemove }: Props) {
  return (
    <div>
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
            {products.map((row) => (
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
                  <IconButton onClick={() => onRemove(row.id)}>
                    <Trash />
                  </IconButton>
                  <IconButton>
                    <Edit />
                  </IconButton>
                  <IconButton>
                    <View />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
