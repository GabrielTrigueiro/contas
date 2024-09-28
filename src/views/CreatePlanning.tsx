import dayjs, { Dayjs } from "dayjs";
import CustomNavbar from "../components/navbar/navbar";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Planing } from "../types/planing/planing";
import DatePickerFormField from "../components/datePickerFormField/DatePickerFormField";
import ProductTable from "../components/productTable/productTable";
import { Product } from "../types/product/product";
import { ProductSubPart } from "../types/productSubPart/productSubPart";

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
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      console.log(values);
      setSubmitting(false);
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleAddSubPart = (productId: any, newSubPart: ProductSubPart) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, subItems: [...product.subItems, newSubPart] }
          : product
      )
    );
  };

  const handleDateChange = (date: Dayjs | null, fieldName: string) => {
    const formattedDate = date ? date.format("DD/MM/YYYY") : "";
    formik.setFieldValue(fieldName, formattedDate);
  };

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <div>
      <CustomNavbar />
      <ContentBackground>
        <ContentArea>
          <CreatePlanningTitle>Criar planejamento</CreatePlanningTitle>

          {/* Seção de datas */}
          <DateSection>
            <DatePickerFormField
              label="Data de início"
              name="initialDate"
              formik={formik}
              handleDateChange={(date: any) =>
                handleDateChange(date, "initialDate")
              }
              selectedDate={dayjs(formik.values.initialDate, "DD/MM/YYYY")}
            />
            <DatePickerFormField
              label="Data prevista do término"
              name="estimatedEndDate"
              formik={formik}
              handleDateChange={(date: any) =>
                handleDateChange(date, "estimatedEndDate")
              }
              selectedDate={dayjs(formik.values.estimatedEndDate, "DD/MM/YYYY")}
            />
          </DateSection>

          {/* Seção de produtos */}
          <ProductTable
            products={products}
            onAddProduct={handleAddProduct}
            onAddSubPart={handleAddSubPart}
          />
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
  width: 400px;
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
`;

const ContentBackground = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
  padding: 1rem;
  margin: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
