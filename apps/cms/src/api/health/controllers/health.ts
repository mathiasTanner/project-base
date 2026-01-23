export default {
  async index(ctx) {
    ctx.body = { ok: true, service: "cms", time: new Date().toISOString() };
  },
};
