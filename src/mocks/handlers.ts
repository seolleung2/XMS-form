import { rest } from 'msw';
import { parseQueryString } from 'utils';

import orders from './dummy.json';

export const handlers = [
  rest.get('/orders', async (req, res, ctx) => {
    const { page = 1, size = 10 } = parseQueryString(req.url.search);

    const start = (Number(page) - 1) * Number(size);
    const end = Number(page) * Number(size);
    const ordersOnCurrentPage = orders
      .sort((a, b) => b.seqNo - a.seqNo)
      .slice(start, end);

    await sleep(200);

    return res(
      ctx.status(200),
      ctx.json({
        data: {
          orders: ordersOnCurrentPage,
          total: orders.length,
        },
      })
    );
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
