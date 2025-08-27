import { GetGroupBuysResponse, GetGroupBuysQuery, GroupBuyListItem } from '@/_types/group-buy';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3456';

const buildQuery = (query?: GetGroupBuysQuery): string => {
  if (!query) {return '';}
  const params = new URLSearchParams();
  if (query.page != null) {params.set('page', String(query.page));}
  if (query.limit != null) {params.set('limit', String(query.limit));}
  if (query.status) {params.set('status', query.status);}
  if (typeof query.isActive === 'boolean') {params.set('isActive', String(query.isActive));}
  const s = params.toString();

  return s ? `?${s}` : '';
};

const getGroupBuys = async (query?: GetGroupBuysQuery): Promise<GroupBuyListItem[]> => {
  const url = `${API_BASE_URL}/api/group-buys${buildQuery(query)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch group buys');
  }

  const result = (await response.json()) as GetGroupBuysResponse;

  return result.data.groupBuys;
};

export default getGroupBuys;