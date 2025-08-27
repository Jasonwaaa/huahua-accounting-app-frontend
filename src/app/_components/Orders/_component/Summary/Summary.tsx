import { FC } from "react";
import { Summary as SummaryType } from "@/_types/orders";

interface Props {
    summary: SummaryType[];
}

const Summary: FC<Props> = ({ summary }) => 
{
    const total = summary.reduce((acc, item) => acc + item.totalAmount, 0);
    const totalQuantity = summary.reduce((acc, item) => acc + item.totalQuantity, 0);

    return (
    <div className="bg-white rounded-lg p-6 max-w-2xl">
      <h2 className="text-xl font-bold mb-4">订单汇总</h2>
      {summary.length === 0 ? (
        <p>暂无订单数据。</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">产品名称</th>
              <th className="border px-4 py-2 text-right">总数量</th>
              <th className="border px-4 py-2 text-right">总金额</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((item) => (
              <tr key={`${item.productId ?? 'null'}|${item.name}`}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2 text-right">{item.totalQuantity}</td>
                <td className="border px-4 py-2 text-right">¥{item.totalAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
            <tfoot>
                <tr className="font-bold">
                <td className="border px-4 py-2 text-right">合计</td>
                <td className="border px-4 py-2 text-right">{totalQuantity}</td>
                <td className="border px-4 py-2 text-right">¥{total.toFixed(2)}</td>
                </tr>
            </tfoot>
        </table>
      )}
    </div>
  );
}

export default Summary;