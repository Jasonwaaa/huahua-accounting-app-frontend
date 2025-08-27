export type GroupBuyStatus = 'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'CLOSED';

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface ApiOk<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string | number;
}

export interface GroupBuy {
  id: number;
  title: string;
  startDate: string;     // ISO or YYYY-MM-DD
  endDate: string;       // ISO or YYYY-MM-DD
  deliveryDate: string;  // ISO or YYYY-MM-DD
  description?: string | null;
  status: GroupBuyStatus;
  isActive: boolean;
  minQuantity?: number | null;
  maxQuantity?: number | null;
  discountRate?: number | null; // 例：0.85
  adminId: number;
  createdAt: string;
  updatedAt: string;
}

export interface GroupBuyListItem extends GroupBuy {
  _count?: { orders: number };
}

export interface GroupBuyDetail extends GroupBuy {
  admin: { id: number; name: string; email: string };
  _count?: { orders: number };
}

// 请求体
export interface GetGroupBuysQuery {
  page?: number;
  limit?: number;
  status?: GroupBuyStatus;
  isActive?: boolean;
}

export interface CreateGroupBuyRequest {
  title: string;
  startDate: string;
  endDate: string;
  deliveryDate: string;
  description?: string | null;
  status?: GroupBuyStatus;   // 默认 ACTIVE
  isActive?: boolean;        // 默认 true
  minQuantity?: number | null;
  maxQuantity?: number | null;
  discountRate?: number | null; // 例：0.85
  adminId?: number;          // 不传后端默认 1
}

export type UpdateGroupBuyRequest = Partial<CreateGroupBuyRequest>;

// 响应体
export type GetGroupBuysResponse = ApiOk<{
  groupBuys: GroupBuyListItem[];
  pagination: Pagination;
}>;

export type GetGroupBuyDetailResponse = ApiOk<GroupBuyDetail>;

export type CreateGroupBuyResponse = ApiOk<GroupBuy> & { message?: string };

export type UpdateGroupBuyResponse = ApiOk<GroupBuy> & { message?: string };

export type DeleteGroupBuyResponse = { success: true; message: string } | ApiError;