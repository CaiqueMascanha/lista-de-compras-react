"use client";

import { ChangeEvent, useState } from "react";
import { produtosTypes } from "./types/produtosType";

export default function Home() {
  const [list, setList] = useState<produtosTypes[]>([]);
  const [produtoNome, setProdutoNome] = useState<string>("");
  const [produtoPreco, setPrdutoPreco] = useState<number>(0);
  const [produtoQuantidade, setProdutoQuantidade] = useState<number>(0);

  let total = 0;
  let qtdProdutos = list.length;
  for (let i in list) {
    total += list[i].preco * list[i].quantidade;
    qtdProdutos;
  }
  const totalFormatado = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(total);

  const adicionarProduto = () => {
    if (!produtoNome) return;
    setList([
      ...list,
      {
        nome: produtoNome,
        preco: produtoPreco,
        quantidade: produtoQuantidade,
        jaPegou: false,
      },
    ]);
    setProdutoNome("");
    setPrdutoPreco(0);
    setProdutoQuantidade(0);
  };

  const editarPreco = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const produtoAlterado = [...list];
    produtoAlterado[index].preco = +e.target.value;
    setList(produtoAlterado);
  };

  const editarQuantidade = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const produtoAlterado = [...list];
    produtoAlterado[index].quantidade = +e.target.value;
    setList(produtoAlterado);
  };

  const editarJaPegou = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const produtoAlterado = [...list];
    produtoAlterado[index].jaPegou = !produtoAlterado[index].jaPegou;
    setList(produtoAlterado);
  };

  return (
    <div className="w-screen h-screen bg-white text-black ">
      <h1 className="text-center p-5 text-5xl uppercase sha">
        Lista de Compras!
      </h1>

      <div className="flex flex-row-reverse justify-between items-center">
        <div className="flex justify-end mr-16">
          <table className="shadow-2xl rounded-lg text-xl">
            <tbody>
              <tr>
                <td className="px-4 py-2">Quantidade:</td>
                <td className="px-4 py-2">{qtdProdutos}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Total a Pagar:</td>
                <td className="px-4 py-2">R$ {totalFormatado}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="ml-48">
          <input
            className="bg-indigo-300 h-9 rounded-lg w-60 border-2 border-black shadow-md text-lg pl-2"
            type="text"
            value={produtoNome}
            onChange={(e) => setProdutoNome(e.target.value)}
            placeholder="Digite o nome do Produto"
          />
          <input
            className="ml-5 bg-indigo-300 h-9 rounded-lg w-32 border-2 border-black shadow-md text-lg pl-2"
            type="number"
            value={produtoPreco}
            min={0}
            onChange={(e) => setPrdutoPreco(+e.target.value)}
            placeholder="Digite o preço"
          />
          <input
            className="ml-5 bg-indigo-300 h-9 rounded-lg w-32 border-2 border-black shadow-md text-lg pl-2"
            type="number"
            min={0}
            value={produtoQuantidade}
            onChange={(e) => setProdutoQuantidade(+e.target.value)}
            placeholder="Digite a quantidade"
          />
          <button
            onClick={adicionarProduto}
            className="ml-5 bg-indigo-300 h-9 rounded-lg w-24 border-2 border-black shadow-md text-lg px-2"
          >
            Adicionar
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center mt-16 text-left">
        <table className="rounded-3xl shadow-2xl">
          <thead>
            <tr className="uppercase">
              <th className="py-2 px-5">Produto</th>
              <th className="py-2 px-5">Preço</th>
              <th className="py-2 px-5">Quantidade</th>
              <th className="py-2 px-5">Já pegou?</th>
              <th className="py-2 px-5">Total</th>
            </tr>
          </thead>
          <tbody>
            {list.map((produto, index) => (
              <tr key={index}>
                <td className="py-2 px-5">{produto.nome}</td>
                <td className="py-2 px-5">
                  <input
                    type="number"
                    min={0}
                    value={produto.preco}
                    onChange={(e) => editarPreco(e, index)}
                  />
                </td>
                <td className="py-2 px-5">
                  <input
                    type="number"
                    min={0}
                    value={produto.quantidade}
                    onChange={(e) => editarQuantidade(e, index)}
                  />
                </td>
                <td className="py-2 px-5">
                  <input
                    type="checkbox"
                    checked={produto.jaPegou}
                    onChange={(e) => editarJaPegou(e, index)}
                    name=""
                    id=""
                  />
                </td>
                <td className="py-2 px-5">
                  R${" "}
                  {new Intl.NumberFormat("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(produto.preco * produto.quantidade)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
