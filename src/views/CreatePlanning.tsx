import dayjs, { Dayjs } from "dayjs";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup"; // Importe o Yup para validação

import CustomNavbar from "../components/navbar/navbar";
import { Planing } from "../types/planing/planing";
import ProductTable from "../components/productTable/productTable";
import { Product } from "../types/product/product";
import { ProductSubPart } from "../types/productSubPart/productSubPart";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";

import DataPicker from "../components/datePicker/DatePicker"; // Ajuste o caminho do DataPicker conforme necessário
import { Calendar } from "lucide-react";
import theme from "../core/theme/theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Definindo o esquema de validação
const validationSchema = Yup.object().shape({
  initialDate: Yup.string()
    .required("Data de início é obrigatória")
    .test("is-valid-date", "Data de início inválida", (value) =>
      dayjs(value, "DD/MM/YYYY").isValid()
    ),
  estimatedEndDate: Yup.string()
    .required("Data prevista do término é obrigatória")
    .test("is-valid-date", "Data prevista do término inválida", (value) =>
      dayjs(value, "DD/MM/YYYY").isValid()
    )
    .test(
      "is-after-initial",
      "Data prevista do término deve ser após a data de início",
      function (value) {
        const { initialDate } = this.parent;
        return dayjs(value, "DD/MM/YYYY").isAfter(
          dayjs(initialDate, "DD/MM/YYYY")
        );
      }
    ),
});

const initialValues: Planing = {
  id: null,
  initialDate: "",
  estimatedEndDate: "",
  endDate: "",
  products: [],
  isOpen: false,
  totalPrice: 0,
};

const CreatePlanning = () => {
  const navigate = useNavigate();

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [estimatedDatePickerOpen, setEstimatedDatePickerOpen] = useState(false);
  const [selectedInitialDate, setSelectedInitialDate] = useState<Dayjs | null>(
    null
  );
  const [selectedEstimatedEndDate, setSelectedEstimatedEndDate] =
    useState<Dayjs | null>(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      console.log(values);
      setSubmitting(false);
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  // Função para adicionar um produto
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, { ...newProduct, subItems: [] }]);
  };

  // Função para adicionar uma subparte a um produto
  const handleAddSubPart = (productId: any, newSubPart: ProductSubPart) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, subItems: [...product.subItems, newSubPart] }
          : product
      )
    );
  };

  // Função para remover um produto
  const handleRemoveProduct = (productId: any) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  // Função para remover uma subparte de um produto
  const handleRemoveSubPart = (productId: any, subPartId: any) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              subItems: product.subItems.filter(
                (subPart) => subPart.id !== subPartId
              ),
            }
          : product
      )
    );
  };

  const handleDateChange = (date: Dayjs | null, fieldName: string) => {
    const formattedDate = date ? date.format("DD/MM/YYYY") : "";
    formik.setFieldValue(fieldName, formattedDate);
  };

  // Função para finalizar e salvar o planejamento
  const handleFinishPlanning = () => {
    const newPlanning: Planing = {
      ...formik.values,
      initialDate: selectedInitialDate?.format("DD/MM/YYYY") || "",
      estimatedEndDate: selectedEstimatedEndDate?.format("DD/MM/YYYY") || "",
      id: Date.now(),
      products,
      totalPrice: products.reduce((acc: number, curr: Product) => {
        return (
          acc +
          curr.subItems.reduce(
            (acc, curr) => Number(acc) + Number(curr.price),
            0
          )
        );
      }, 0),
      isOpen: true,
    };

    console.log(newPlanning);

    // Pega o JSON atual ou inicia um novo
    const existingPlanings = JSON.parse(
      localStorage.getItem("planings") ?? "[]"
    );

    // Adiciona o novo planejamento
    existingPlanings.push(newPlanning);

    // Salva no localStorage
    localStorage.setItem("planings", JSON.stringify(existingPlanings));

    navigate("/planing");
  };

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div className="flex flex-col h-screen w-screen">
      <CustomNavbar />
      <ContentBackground>
        <ContentArea>
          <CreatePlanningTitle>Criar planejamento</CreatePlanningTitle>

          {/* Seção de datas */}
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <DateSection>
              {/* Campo para Data de Início */}
              <FormControl error={Boolean(formik.errors.initialDate)} fullWidth>
                <DateField
                  size="small"
                  variant="outlined"
                  label="Data de início *"
                  value={selectedInitialDate}
                  format="DD/MM/YYYY"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="open calendar"
                          onClick={() => setDatePickerOpen(true)}
                          edge="end"
                        >
                          <Calendar />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event) => handleDateChange(event, "initialDate")}
                  FormHelperTextProps={{
                    style: { margin: "1px 10px -5px" },
                  }}
                />
                {formik.errors.initialDate && (
                  <FormHelperText>{formik.errors.initialDate}</FormHelperText>
                )}
                <DataPicker
                  isOpen={datePickerOpen}
                  onClose={() => setDatePickerOpen(false)}
                  onOpen={() => setDatePickerOpen(true)}
                  title="Escolher Data de Início"
                  initialDate={selectedInitialDate}
                  setInitialDate={setSelectedInitialDate}
                  typeOfDatePicker="data"
                />
              </FormControl>

              {/* Campo para Data Prevista de Término */}
              <FormControl
                error={Boolean(formik.errors.estimatedEndDate)}
                fullWidth
              >
                <DateField
                  size="small"
                  variant="outlined"
                  label="Data prevista do término *"
                  value={selectedEstimatedEndDate}
                  format="DD/MM/YYYY"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="open calendar"
                          onClick={() => setEstimatedDatePickerOpen(true)}
                          edge="end"
                        >
                          <Calendar />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event) =>
                    handleDateChange(event, "estimatedEndDate")
                  }
                  FormHelperTextProps={{
                    style: { margin: "1px 10px -5px" },
                  }}
                />
                {formik.errors.estimatedEndDate && (
                  <FormHelperText>
                    {formik.errors.estimatedEndDate}
                  </FormHelperText>
                )}
                <DataPicker
                  isOpen={estimatedDatePickerOpen}
                  onClose={() => setEstimatedDatePickerOpen(false)}
                  onOpen={() => setEstimatedDatePickerOpen(true)}
                  title="Escolher Data Prevista do Término"
                  initialDate={selectedEstimatedEndDate}
                  setInitialDate={setSelectedEstimatedEndDate}
                  typeOfDatePicker="data"
                />
              </FormControl>
            </DateSection>
          </LocalizationProvider>
          {/* Seção de produtos */}
          <ProductTable
            products={products}
            onAddProduct={handleAddProduct}
            onAddSubPart={handleAddSubPart}
            onRemoveProduct={handleRemoveProduct}
            onRemoveSubPart={handleRemoveSubPart}
          />

          {/* Botão de finalizar */}
          <FinishButton onClick={handleFinishPlanning}>
            Finalizar Planejamento
          </FinishButton>
        </ContentArea>
      </ContentBackground>
    </div>
  );
};

export default CreatePlanning;

const DateSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: auto;
`;

const CreatePlanningTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 1rem;
  height: 100%;
`;

const ContentBackground = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
  padding: 1rem;
  margin: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100%;
`;

const FinishButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: auto;
  margin-top: 1rem;

  &:hover {
    background-color: #45a049;
  }
`;
