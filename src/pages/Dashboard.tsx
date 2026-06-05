import { useState } from "react";

import searchSvg from "../assets/search.svg";
import { CATEGORIES } from "../utils/categories";

import { formatCurrency } from "../utils/formatCurrency";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { RefundItem, type RefundItemProps } from "../components/RefundItem";
import { Pagination } from "../components/Pagination";

const REFUND_EXAMPLE = {
  id: "123",
  name: "Felipe Mendes",
  category: "Alimentação",
  amount: formatCurrency(50.5),
  categoryImg: CATEGORIES["transport"].icon,
}

export function Dashboard() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [refunds, setRefunds] = useState<RefundItemProps[]>([REFUND_EXAMPLE]);

  function fetchRefunds(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(name);
  }

  function handlePagination(action: "next" | "previous") {
    setPage((prevPage) => {
      if (action === "next" && prevPage < totalPages) {
        return prevPage + 1;
      }

      if (action === "previous" && prevPage > 1) {
        return prevPage - 1;
      }

      return prevPage;
    });
  }

  return (
    <div className="bg-gray-500 rounded-xl p-10 md:min-w-3xl">
      <h1 className="text-gray-100 font-bold text-xl flex-1">
        Solicitacões
      </h1>

      <form 
        onSubmit={fetchRefunds}
        className="flex flex-1 items-center justify-between pb-6 border-b border-gray-400 md:flex-row gap-2 mt-6"
      >
        <Input 
          placeholder="Pesquisar pelo nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button variant="icon" type="submit">
          <img src={searchSvg} alt="ícone de pesquisar" className="w-5" />
        </Button>
      </form>

      <div className="flex flex-col gap-4 my-6 max-h-85.5 overflow-y-scroll pr-2">
        {
          refunds.map((item) => (
            <RefundItem key={item.id} data={item} href={`/refund/${item.id}`} />
          ))
        }
      </div>

      <Pagination 
        current={page}
        total={totalPages}
        onNext={() => handlePagination("next")}
        onPrevious={() => handlePagination("previous")}
      />
    </div>
  );
}