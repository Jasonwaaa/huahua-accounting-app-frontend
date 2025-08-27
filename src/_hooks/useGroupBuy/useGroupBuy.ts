import useSWR, { SWRResponse } from 'swr';
import getGroupBuys from '@/_db/getGroupBuiy/getGroupBuy';
import { GetGroupBuysQuery } from '@/_types/group-buy';

type GroupBuysResponse = Awaited<ReturnType<typeof getGroupBuys>>;

const useGroupBuy = (query?: GetGroupBuysQuery): SWRResponse<GroupBuysResponse> =>
  useSWR(query ? ['group-buys', query] as const : 'group-buys', () => getGroupBuys(query));

export default useGroupBuy;