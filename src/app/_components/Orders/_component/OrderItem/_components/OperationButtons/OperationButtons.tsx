'use client';
import { Pencil, Trash2 } from "lucide-react";
import { FC } from "react";
import Button from "@/_components/Button";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

const OperationButtons: FC<Props> = ({ onEdit, onDelete }) => (
  <div className="mb-3 flex justify-center gap-2">
    <Button
      type="button"               // 防止触发表单提交
      onClick={onEdit}
      aria-label="编辑订单"
      title="编辑"
      className="inline-flex items-center gap-1 px-3 py-1 rounded border hover:bg-gray-50"
    >
      <Pencil size={16} />
      编辑
    </Button>
    <Button
      type="button"               // 防止触发表单提交
      onClick={onDelete}
      aria-label="删除订单"
      title="删除"
      className="inline-flex items-center gap-1 px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
    >
      <Trash2 size={16} />
      删除
    </Button>
  </div>
);

export default OperationButtons;