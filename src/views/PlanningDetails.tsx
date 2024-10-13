import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Planing } from "../types/planing/planing";
import CustomNavbar from "../components/navbar/navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { formatCurrency } from "../utils/functions/formarCurrency";

const PlaningDetails = () => {
  const { planingId } = useParams();
  const [planing, setPlaning] = useState<Planing | null>(null);

  useEffect(() => {
    const existingPlanings = JSON.parse(
      localStorage.getItem("planings") ?? "[]"
    );
    const selectedPlaning = existingPlanings.find(
      (p: Planing) => p.id === Number(planingId)
    );
    setPlaning(selectedPlaning || null);
  }, [planingId]);

  if (!planing) {
    return <div>Plano não encontrado.</div>;
  }

  return (
    <div>
      <CustomNavbar />
      <div className="p-4">
        <Typography variant="h4" gutterBottom>
          Detalhes do Planejamento
        </Typography>
        <p>
          <strong>ID:</strong> {planing.id}
        </p>
        <p>
          <strong>Data Inicial:</strong> {planing.initialDate}
        </p>
        <p>
          <strong>Data Estimada de Término:</strong> {planing.estimatedEndDate}
        </p>
        <p>
          <strong>Data de Término:</strong> {planing.endDate || "Em aberto"}
        </p>
        <p>
          <strong>Status:</strong> {planing.isOpen ? "Aberto" : "Fechado"}
        </p>
        <p>
          <strong>Preço Total:</strong> R$ {formatCurrency(planing.totalPrice)}
        </p>

        {/* Tabela de Produtos */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell align="right">Preço Total</TableCell>
                <TableCell align="right">Qtd</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planing.products.map((product) => (
                <React.Fragment key={product.id}>
                  <TableRow>
                    <TableCell>{product.type}</TableCell>
                    <TableCell>{product.client?.name}</TableCell>
                    <TableCell align="right">
                      {formatCurrency(
                        product.subItems.reduce(
                          (acc, curr) => acc + curr.price,
                          0
                        )
                      )}
                    </TableCell>
                    <TableCell align="right">{product.qtd}</TableCell>
                  </TableRow>

                  {/* Exibição das subpartes do produto */}
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Table size="small" aria-label="subparts">
                        <TableHead>
                          <TableRow>
                            <TableCell>Parte do Produto</TableCell>
                            <TableCell align="right">Preço</TableCell>
                            <TableCell align="right">Conteúdo</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {product.subItems.map((subItem) => (
                            <TableRow key={subItem.id}>
                              <TableCell>{subItem.subPart}</TableCell>
                              <TableCell align="right">
                                {formatCurrency(subItem.price)}
                              </TableCell>
                              <TableCell align="right">
                                {typeof subItem.content === "string"
                                  ? subItem.content
                                  : `${subItem.content?.name} - ${subItem.content?.faculty}`}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default PlaningDetails;
