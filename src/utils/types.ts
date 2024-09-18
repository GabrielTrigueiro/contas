export interface Cliente {
  name: string;
  tipoCliente: "empresa" | "pessoa";
  telefone?: string;
}

export type tipoProduto =
  | "jaleco"
  | "bolso"
  | "bata"
  | "macacao"
  | "coletes"
  | "camisa"
  | "blusa"
  | "patch"
  | "tarja"
  | "outros";

export type tipoDaParteDoProduto =
  | "Manga Esquerda"
  | "Manga Direita"
  | "Costas"
  | "Peito Esquerdo"
  | "Peito Direito";

export interface ParteDoProduto {
  tipoDaParte: tipoDaParteDoProduto;
  bordado: string;
  nomeDoCurso?: string;
  nomeDaFaculdade?: string;
  pronto?: boolean;
}

export interface Produto {
  client: Cliente | null;
  type: tipoProduto | null;
  items: ParteDoProduto[];
}

export interface Agenda {
  dataInicio: string;
  dataPrevistaFim: string;
  dataFim: string | null;
  produtos: Produto[];
  emAberto?: boolean;
}
