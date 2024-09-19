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
  id: string;
  tipoDaParte: tipoDaParteDoProduto;
  bordado: string;
  nomeDoCurso?: string;
  nomeDaFaculdade?: string;
  pronto?: boolean;
}

export interface Produto {
  id: string;
  client: Cliente | null;
  type: tipoProduto | null;
  items: ParteDoProduto[];
  nomePessoa: string;
}

export interface Agenda {
  dataInicio: string;
  dataPrevistaFim: string;
  dataFim: string | null;
  produtos: Produto[];
  emAberto?: boolean;
}
