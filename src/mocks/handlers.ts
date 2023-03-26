import { rest } from 'msw';

import orders from './dummy.json';

export const handlers = [
  rest.get('/orders', async (_, res, ctx) => {
    await sleep(200);

    return res(ctx.status(200), ctx.json(orders));
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
