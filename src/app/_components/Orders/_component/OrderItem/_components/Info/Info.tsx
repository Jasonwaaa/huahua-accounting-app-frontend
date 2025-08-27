import { FC } from "react";
import { Calendar, Clock, MapPin, Phone } from "lucide-react";
import { OrderInfo } from "@/_types/orders";

// 金额安全格式化（兼容 string/number）
const toNumber = (v: unknown): number => {
  if (typeof v === "number") {return Number.isFinite(v) ? v : 0;}
  if (typeof v === "string") {
    const n = Number(v);

    return Number.isFinite(n) ? n : 0;
  }

  return 0;
};
const formatMoney = (v: unknown): string => toNumber(v).toFixed(2);

const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    PENDING: "待确认",
    CONFIRMED: "已确认",
    PREPARING: "制作中",
    READY: "待配送",
    DELIVERING: "配送中",
    DELIVERED: "已送达",
    CANCELLED: "已取消",
  };
  
  return statusMap[status] ?? status;
};

interface Props {
  orderInfo: OrderInfo;
}

const Info: FC<Props> = ({ orderInfo }) => (
  <div className="mb-4">
    {/* 头部信息 */}
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold">订单 #{orderInfo.id}</h3>
        <p className="text-sm">订单号: {orderInfo.orderNumber}</p>
        <p className="text-sm">{new Date(orderInfo.createdAt).toLocaleString("zh-CN")}</p>
      </div>
      <div className="text-right">
        <div className="font-semibold">¥{formatMoney(orderInfo.totalAmount)}</div>
        <div className="text-sm">{getStatusText(orderInfo.orderStatus)}</div>
      </div>
    </div>

    {/* 联系/配送信息网格 */}
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
      <div className="flex items-center gap-2">
        <Phone size={16} />
        <span>{orderInfo.customerName}</span>
        <span>({orderInfo.customerPhone})</span>
      </div>

      <div className="flex items-center gap-2">
        <MapPin size={16} />
        <span className="truncate">{orderInfo.deliveryAddress}</span>
      </div>

      <div className="flex items-center gap-2">
        <Calendar size={16} />
        <span>{new Date(orderInfo.deliveryDate).toLocaleDateString("zh-CN")}</span>
      </div>

      <div className="flex items-center gap-2">
        <Clock size={16} />
        <span>{orderInfo.deliveryTime}</span>
      </div>
    </div>
    {orderInfo.notes && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium mb-1">备注:</h4>
          <p className="text-sm">{orderInfo.notes}</p>
        </div>
      )}
  </div>
);

export default Info;