import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { ArrowDown, ArrowUp } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import db from "../../data/clients.json";
import { Product } from "../../types/product/product";
import { ProductSubPart } from "../../types/productSubPart/productSubPart";
import { ProductType } from "../../types/productType/productType";

const productTypes: Record<ProductType, string> = {
  jaleco: "Jaleco",
  bolso: "Bolso",
  bata: "Bata",
  macacao: "Macaco",
  coletes: "Coletes",
  camisa: "Camisa",
  blusa: "Blusa",
  patch: "Patch",
  tarja: "Tarja",
  outros: "Outros",
};

const AddProductModal = ({ open, onClose, onAddProduct }: any) => {
  const [product, setProduct] = useState<Product | null>({
    client: null,
    type: "" as ProductType,
    id: "",
    qtd: 1,
    totalPrice: 0,
    subItems: [],
  });

  const handleInputChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    // Atualizando o estado do produto
    setProduct((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    let newProduct: Product = {
      ...product!,
      id: uuidv4(),
      totalPrice: 0,
    };
    onAddProduct(newProduct);
    onClose();
  };

  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, bgcolor: "white", margin: "auto", width: 400 }}>
        <Typography variant="h6">Adicionar Produto</Typography>

        {/* Seletor de Cliente */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="client-select-label">Cliente</InputLabel>
          <Select
            name="client"
            value={product?.client?.name || ""}
            label="Cliente"
            onChange={(e) => {
              const selectedClient = db.clients.find(
                (client) => client.name === e.target.value
              );
              setProduct((prev: any) => ({
                ...prev,
                client: selectedClient || null,
              }));
            }}
          >
            {db.clients.map((client: any) => (
              <MenuItem key={client.name} value={client.name}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Seletor de Tipo de Produto */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="type-select-label">Tipo de Produto</InputLabel>
          <Select
            name="type"
            value={product?.type || ""}
            label="Tipo de Produto"
            onChange={handleInputChange}
          >
            {Object.keys(productTypes).map((type) => (
              <MenuItem key={type} value={type as ProductType}>
                {productTypes[type as ProductType]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button onClick={handleAddProduct} variant="contained" sx={{ mt: 2 }}>
          Adicionar Produto
        </Button>
      </Box>
    </Modal>
  );
};

const AddSubPartModal = ({ open, onClose, onAddSubPart, product }: any) => {
  const [subPart, setSubPart] = React.useState({
    id: new Date().getTime(),
    subPart: "Manga Esquerda",
    price: 0,
    content: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSubPart((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubPart = () => {
    onAddSubPart(product.id, subPart);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, bgcolor: "white", margin: "auto", width: 400 }}>
        <Typography variant="h6">Adicionar Subparte</Typography>
        <TextField
          label="Parte do Produto"
          name="subPart"
          value={subPart.subPart}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Preço"
          name="price"
          value={subPart.price}
          onChange={handleInputChange}
          fullWidth
        />
        <Button onClick={handleAddSubPart} variant="contained" sx={{ mt: 2 }}>
          Adicionar Subparte
        </Button>
      </Box>
    </Modal>
  );
};

export default function ProductTable({
  products,
  onAddProduct,
  onAddSubPart,
}: any) {
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openSubPartModal, setOpenSubPartModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>
      <Button
        onClick={() => setOpenProductModal(true)}
        variant="contained"
        sx={{ mb: 2, width: 400, margin: "auto" }}
      >
        Adicionar Produto
      </Button>

      <TableContainer component={Paper} sx={{ width: 800 }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Produto</TableCell>
              <TableCell align="right">Cliente</TableCell>
              <TableCell align="right">Preço Total</TableCell>
              <TableCell align="right">Quantidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: Product) => (
              <React.Fragment key={product.id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() =>
                        setOpen({ ...open, [product.id]: !open[product.id] })
                      }
                    >
                      {open[product.id] ? <ArrowUp /> : <ArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell align="right">{product.client?.name}</TableCell>
                  <TableCell align="right">{product.totalPrice}</TableCell>
                  <TableCell align="right">{product.qtd}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setCurrentProduct(product);
                        setOpenSubPartModal(true);
                      }}
                    >
                      Adicionar Subparte
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{ paddingBottom: 0, paddingTop: 0 }}
                  >
                    <Collapse
                      in={open[product.id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          Subpartes
                        </Typography>
                        <Table size="small" aria-label="subparts">
                          <TableHead>
                            <TableRow>
                              <TableCell>Parte do Produto</TableCell>
                              <TableCell align="right">Preço</TableCell>
                              <TableCell align="right">Conteúdo</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {product.subItems.map((subItem: ProductSubPart) => (
                              <TableRow key={subItem.id}>
                                <TableCell>{subItem.subPart}</TableCell>
                                <TableCell align="right">
                                  {subItem.price}
                                </TableCell>
                                {subItem.content && (
                                  <TableCell align="right">
                                    {typeof subItem.content === "string"
                                      ? subItem.content
                                      : subItem.content.name}
                                  </TableCell>
                                )}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddProductModal
        open={openProductModal}
        onClose={() => setOpenProductModal(false)}
        onAddProduct={onAddProduct}
      />
      {currentProduct && (
        <AddSubPartModal
          open={openSubPartModal}
          onClose={() => setOpenSubPartModal(false)}
          onAddSubPart={onAddSubPart}
          product={currentProduct}
        />
      )}
    </>
  );
}
