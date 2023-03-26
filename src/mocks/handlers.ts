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
  rest.post('/order', async (req, res, ctx) => {
    const body = await req.json();

    try {
      let bodyWithSeqNo;
      if (orders && orders.length > 0) {
        const lastOrder = orders[0];
        const { seqNo } = lastOrder;
        await sleep(200);

        bodyWithSeqNo = {
          ...body,
          seqNo: seqNo + 1,
        };
      } else {
        bodyWithSeqNo = {
          ...body,
          seqNo: 1,
        };
      }

      orders.push(bodyWithSeqNo);
      await sleep(200);
      return res(
        ctx.status(201),
        ctx.json({
          success: true,
          message: '등록이 완료 되었습니다.',
          data: bodyWithSeqNo,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
