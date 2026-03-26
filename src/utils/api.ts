export type ApiOk<T> = { ok: true } & T;

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

async function json<T>(res: Response): Promise<T> {
  const data = (await res.json()) as T;
  return data;
}

function authHeader() {
  const token = localStorage.getItem("paperpro_admin_token");
  const h: Record<string, string> = {};
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

export const api = {
  baseUrl: API_BASE,

  async getPublicConfig() {
    const res = await fetch(`${API_BASE}/api/public/config`);
    const data = await json<{ ok: boolean; config: { appName: string; whatsappNumber: string } }>(res);
    if (!data.ok) throw new Error("Failed");
    return data.config;
  },

  async listServices() {
    const res = await fetch(`${API_BASE}/api/public/services`);
    const data = await json<{ ok: boolean; services: any[] }>(res);
    if (!data.ok) throw new Error("Failed");
    return data.services;
  },

  async listProjects() {
    const res = await fetch(`${API_BASE}/api/public/projects`);
    const data = await json<{ ok: boolean; projects: any[] }>(res);
    if (!data.ok) throw new Error("Failed");
    return data.projects;
  },

  async listTestimonials() {
    const res = await fetch(`${API_BASE}/api/public/testimonials`);
    const data = await json<{ ok: boolean; testimonials: any[] }>(res);
    if (!data.ok) throw new Error("Failed");
    return data.testimonials;
  },

  async listBlogPosts() {
    const res = await fetch(`${API_BASE}/api/public/blog`);
    const data = await json<{ ok: boolean; posts: any[] }>(res);
    if (!data.ok) throw new Error("Failed");
    return data.posts;
  },

  async getBlogPost(slug: string) {
    const res = await fetch(`${API_BASE}/api/public/blog/${encodeURIComponent(slug)}`);
    const data = await json<{ ok: boolean; post: any }>(res);
    if (!data.ok) throw new Error("Failed");
    return data.post;
  },

  async trackOrder(code: string) {
    const res = await fetch(`${API_BASE}/api/public/orders/track/${encodeURIComponent(code)}`);
    const data = await json<{ ok: boolean; order: any }>(res);
    if (!data.ok) throw new Error("Failed");
    return data.order;
  },

  async submitEnquiry(form: FormData) {
    const res = await fetch(`${API_BASE}/api/public/enquiries`, { method: "POST", body: form });
    const data = await json<{ ok: boolean; enquiry?: { id: string } }>(res);
    if (!data.ok) throw new Error("Failed");
    return data.enquiry!;
  },

  async adminLogin(email: string, password: string) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await json<{ ok: boolean; token?: string; user?: any }>(res);
    if (!data.ok || !data.token) throw new Error("Invalid credentials");
    localStorage.setItem("paperpro_admin_token", data.token);
    return data.user;
  },

  adminLogout() {
    localStorage.removeItem("paperpro_admin_token");
  },

  async adminGet(path: string) {
    const res = await fetch(`${API_BASE}/api/admin${path}`, { headers: { ...authHeader() } });
    const data = await json<any>(res);
    if (!data.ok) throw new Error(data?.error?.message || "Failed");
    return data;
  },

  async adminPost(path: string, body: any) {
    const res = await fetch(`${API_BASE}/api/admin${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(body)
    });
    const data = await json<any>(res);
    if (!data.ok) throw new Error(data?.error?.message || "Failed");
    return data;
  },

  async adminPatch(path: string, body: any) {
    const res = await fetch(`${API_BASE}/api/admin${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(body)
    });
    const data = await json<any>(res);
    if (!data.ok) throw new Error(data?.error?.message || "Failed");
    return data;
  }
};

