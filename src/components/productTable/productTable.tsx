import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import db from "../../data/clients.json";
import { Product } from "../../types/product/product";
import {
  Course,
  ProductSubPart,
} from "../../types/productSubPart/productSubPart";
import { ProductType } from "../../types/productType/productType";
import DefaultModal from "../defaultModal/defaultModal";
import { ProductPartType } from "../../types/productPartType/productPartType";
import { formatCurrency } from "../../utils/functions/formarCurrency";

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

// Convertendo o ProductPartType em um array
const productPartTypes: ProductPartType[] = [
  "Manga Esquerda",
  "Manga Direita",
  "Costas",
  "Peito Esquerdo",
  "Peito Direito",
];

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
    setProduct(null);
  };

  return (
    <DefaultModal
      isOpen={open}
      onClose={onClose}
      title="Adicionar Produto"
      onOpen={() => {}}
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-row gap-2">
          {/* Seletor de Cliente */}
          <FormControl fullWidth sx={{ width: 200 }}>
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
          <FormControl fullWidth sx={{ width: 200 }}>
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
        </div>

        <Button
          disabled={!product?.client || !product?.type}
          onClick={handleAddProduct}
          variant="contained"
          sx={{ m: "auto" }}
        >
          Adicionar Produto
        </Button>
      </div>
    </DefaultModal>
  );
};

const AddSubPartModal = ({ open, onClose, onAddSubPart, product }: any) => {
  const [subPart, setSubPart] = React.useState({
    id: uuidv4(),
    subPart: "",
    price: 0,
    content: "",
  });

  const [isCourse, setIsCourse] = React.useState(false); // Controla o estado do checkbox
  const [curso, setCurso] = React.useState<Course | null>(null); // Controla o estado do objeto curso

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSubPart((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (e: any) => {
    const { name, value } = e.target;
    setCurso((prev) =>
      prev ? { ...prev, [name]: value } : { name: "", faculty: "" }
    );
  };

  const handleAddSubPart = () => {
    const finalSubPart = {
      ...subPart,
      content: isCourse ? curso : subPart.content,
    };
    onAddSubPart(product.id, finalSubPart);
    onClose();
    setSubPart({
      id: uuidv4(),
      subPart: "", // Reinicializa a subparte para vazio
      price: 0,
      content: "",
    });
    setCurso(null);
    setIsCourse(false);
  };

  return (
    <DefaultModal
      isOpen={open}
      onClose={onClose}
      title="Adicionar parte"
      onOpen={() => {}}
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-row gap-2">
          {/* Seletor de Parte do Produto */}
          <FormControl fullWidth sx={{ width: 200 }}>
            <InputLabel id="part-type-select-label">
              Parte do Produto
            </InputLabel>
            <Select
              name="subPart"
              value={subPart.subPart} // Valor do select
              label="Parte do Produto"
              onChange={handleInputChange}
            >
              {/* Opção vazia para garantir que nenhuma subparte seja selecionada inicialmente */}
              <MenuItem value="">
                <em>Selecione uma parte</em>
              </MenuItem>
              {productPartTypes.map((partType) => (
                <MenuItem key={partType} value={partType}>
                  {partType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Preço"
            name="price"
            value={subPart.price}
            onChange={handleInputChange}
            sx={{ width: 200 }}
          />
        </div>

        {/* Checkbox para indicar se o campo será preenchido por um curso */}
        <FormControlLabel
          control={
            <Checkbox
              checked={isCourse}
              onChange={(e) => setIsCourse(e.target.checked)}
            />
          }
          label="Conteúdo é um curso"
        />

        {/* Renderiza diferentes campos com base no valor do checkbox */}
        {isCourse ? (
          <div className="flex flex-row gap-2">
            <TextField
              label="Nome do Curso"
              name="name"
              value={curso?.name ?? ""}
              onChange={handleCourseChange}
              sx={{ width: 200 }}
            />
            <TextField
              label="Universidade"
              name="faculty"
              value={curso?.faculty ?? ""}
              onChange={handleCourseChange}
              sx={{ width: 200 }}
            />
          </div>
        ) : (
          <TextField
            label="Nome"
            name="content"
            value={subPart.content}
            onChange={handleInputChange}
            sx={{ width: 200 }}
          />
        )}

        <Button
          disabled={
            !subPart.subPart || !subPart.price || (!subPart.content && !curso)
          }
          onClick={handleAddSubPart}
          variant="contained"
          sx={{ m: "auto" }}
        >
          Adicionar Subparte
        </Button>
      </div>
    </DefaultModal>
  );
};

export default function ProductTable({
  products,
  onAddProduct,
  onAddSubPart,
  onRemoveProduct,
  onRemoveSubPart,
}: any) {
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openSubPartModal, setOpenSubPartModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});

  const total = useMemo(() => {
    return products.reduce((acc: number, curr: Product) => {
      return (
        acc +
        curr.subItems.reduce((acc, curr) => Number(acc) + Number(curr.price), 0)
      );
    }, 0);
  }, [products]);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Total: {formatCurrency(total)}</h1>
        <Button
          onClick={() => setOpenProductModal(true)}
          variant="contained"
          sx={{ width: 200, backgroundColor: "#000" }}
        >
          Adicionar Produto
        </Button>
      </div>

      <TableContainer component={Paper} sx={{ width: 800 }}>
        <Table aria-label="collapsible table">
          <TableHead className="bg-black">
            <TableRow>
              <TableCell />
              <TableCell sx={{ color: "white" }}>Produto</TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Cliente
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Preço Total
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Qtd
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Opções
              </TableCell>
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
                  <TableCell align="right">
                    {formatCurrency(
                      product.subItems.reduce(
                        (acc, curr) => Number(acc) + Number(curr.price),
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell align="right">{product.qtd}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setCurrentProduct(product);
                        setOpenSubPartModal(true);
                      }}
                    >
                      <Plus />
                    </IconButton>
                    <IconButton
                      onClick={() => onRemoveProduct(product.id)}
                      aria-label="remover produto"
                    >
                      <Trash2 />
                    </IconButton>
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
                              <TableCell align="right">Opções</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {product.subItems.map((subItem: ProductSubPart) => (
                              <TableRow key={subItem.id}>
                                <TableCell>{subItem.subPart}</TableCell>
                                <TableCell align="right">
                                  {formatCurrency(subItem.price)}
                                </TableCell>
                                {subItem.content && (
                                  <TableCell align="right">
                                    {typeof subItem.content === "string" ? (
                                      subItem.content
                                    ) : (
                                      <div>
                                        {subItem.content.name} -{" "}
                                        {subItem.content.faculty}
                                      </div>
                                    )}
                                  </TableCell>
                                )}
                                <TableCell align="right">
                                  <IconButton
                                    onClick={() =>
                                      onRemoveSubPart(product.id, subItem.id)
                                    }
                                    aria-label="remover subparte"
                                  >
                                    <Trash2 />
                                  </IconButton>
                                </TableCell>
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
