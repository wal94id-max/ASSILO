import { ZrExpressClient } from '@terminaldz/zrexpress-sdk';

export default async (event) => {
  if (event.httpMethod !== 'GET') return json(405, { ok: false, message: 'Method not allowed' });
  const apiKey = process.env.ZR_API_KEY;
  const tenantId = process.env.ZR_TENANT_ID;
  if (!apiKey || !tenantId) return json(500, { ok: false, message: 'ZR credentials are missing.' });
  try {
    const zr = new ZrExpressClient({ apiKey, tenantId });
    const level = event.queryStringParameters?.level === 'commune' ? 'commune' : 'wilaya';
    const result = await zr.territories.search({ pageNumber: 1, pageSize: 100, advancedFilter: { field: 'level', operator: 'eq', value: level } });
    return json(200, { ok: true, items: result?.items ?? [], totalCount: result?.totalCount ?? null });
  } catch (error) {
    return json(502, { ok: false, message: 'تعذر جلب الولايات والبلديات من ZR Express.', code: error?.code ?? null });
  }
};
function json(statusCode, body) { return { statusCode, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }, body: JSON.stringify(body) }; }
