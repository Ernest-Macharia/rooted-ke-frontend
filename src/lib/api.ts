import axios from "axios";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const getDestinations = (params: QueryParams = {}) =>
  api.get("/api/destinations/", { params });
export const getDestination = (slug: string) =>
  api.get(`/api/destinations/${slug}/`);

export const getRestaurants = (params: QueryParams = {}) =>
  api.get("/api/restaurants/", { params });
export const getRestaurant = (slug: string) =>
  api.get(`/api/restaurants/${slug}/`);

export const getEvents = (params: QueryParams = {}) =>
  api.get("/api/events/", { params });
export const getEvent = (slug: string) =>
  api.get(`/api/events/${slug}/`);

export const getPackages = (params: QueryParams = {}) =>
  api.get("/api/packages/", { params });
export const getPackage = (slug: string) =>
  api.get(`/api/packages/${slug}/`);

export const getBlogPosts = (params: QueryParams = {}) =>
  api.get("/api/blog/", { params });
export const getBlogPost = (slug: string) =>
  api.get(`/api/blog/${slug}/`);

export const subscribe = (email: string) =>
  api.post("/api/newsletter/subscribe/", { email });

export const submitEnquiry = <TData>(data: TData) =>
  api.post("/api/bookings/enquire/", data);

export const getHomepageData = () => api.get("/api/core/homepage/");
export const getSitePage = (slug: string) =>
  api.get(`/api/core/site-pages/${slug}/`);
export const getLegalPages = () => api.get("/api/core/legal-pages/");
export const getFrontendBootstrap = () => api.get("/api/core/frontend-bootstrap/");

export default api;
