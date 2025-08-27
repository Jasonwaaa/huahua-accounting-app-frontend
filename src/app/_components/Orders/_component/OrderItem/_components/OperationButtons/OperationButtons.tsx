import { Pencil, Trash2 } from "lucide-react";
import { FC } from "react";

interface Props {
    onEdit: () => void;
    onDelete: () => void;
}

const OperationButtons :FC<Props> = ({
    onEdit,
    onDelete
}) =>( <div className="mb-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit()}
          className="px-3 py-1 rounded border hover:bg-gray-50 inline-flex items-center gap-1"
          title="编辑"
        >
          <Pencil size={16} />
          编辑
        </button>
        <button
          type="button"
          onClick={() => onDelete()}
          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 inline-flex items-center gap-1"
          title="删除"
        >
          <Trash2 size={16} />
          删除
        </button>
      </div>)

export default OperationButtons;