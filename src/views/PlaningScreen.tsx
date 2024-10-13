import React, { useEffect, useState } from "react";
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../components/navbar/navbar";
import { Planing } from "../types/planing/planing";

export default function PlaningScreen() {
  const [planings, setPlanings] = useState<Planing[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const existingPlanings = JSON.parse(
      localStorage.getItem("planings") ?? "[]"
    );
    setPlanings(existingPlanings);
  }, []);

  const handleViewDetails = (planingId: any) => {
    navigate(`/planing/${planingId}`);
  };

  return (
    <div>
      <CustomNavbar />
      <Typography variant="h4" gutterBottom>
        Lista de Planos
      </Typography>
      <div className="p-4">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Data Inicial</TableCell>
                <TableCell>Data Estimada de Término</TableCell>
                <TableCell>Data de Término</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Preço Total</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planings.length > 0 ? (
                planings.map((planing) => (
                  <TableRow key={planing.id}>
                    <TableCell>{planing.id}</TableCell>
                    <TableCell>{planing.initialDate}</TableCell>
                    <TableCell>{planing.estimatedEndDate}</TableCell>
                    <TableCell>{planing.endDate || "Em aberto"}</TableCell>
                    <TableCell>
                      {planing.isOpen ? "Aberto" : "Fechado"}
                    </TableCell>
                    <TableCell>R$ {planing.totalPrice}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDetails(planing.id)}
                      >
                        Ver Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Nenhum plano encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
