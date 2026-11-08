import { ZrExpressClient } from '@terminaldz/zrexpress-sdk';

export default async () => {
  const apiKey = process.env.ZR_API_KEY;
  const tenantId = process.env.ZR_TENANT_ID;
  if (!apiKey || !tenantId) {
    return json(500, { ok: false, message: 'ZR_API_KEY أو ZR_TENANT_ID غير مضبوط في Netlify.' });
  }
  try {
    const zr = new ZrExpressClient({ apiKey, tenantId });
    const profile = await zr.users.getProfile();
    return json(200, {
      ok: true,
      message: 'تم الاتصال بمنصة ZR Express بنجاح.',
      email: profile?.email ?? null,
      memberships: profile?.memberships?.length ?? null
    });
  } catch (error) {
    const status = Number(error?.status ?? error?.statusCode ?? 502);
    return json(status >= 400 && status < 600 ? status : 502, {
      ok: false,
      message: status === 401 ? 'مفتاح API غير صحيح أو غير مفعّل.' : status === 403 ? 'Tenant ID غير صحيح أو لا تملك صلاحية الوصول.' : 'تعذر الاتصال بـ ZR Express. تحقق من بيانات API وصلاحيات الحساب.',
      code: error?.code ?? null
    });
  }
};

function json(statusCode, body) {
  return { statusCode, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }, body: JSON.stringify(body) };
}
