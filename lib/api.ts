const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface FetchOptions extends RequestInit {
  data?: any;
}

export async function apiFetch(endpoint: string, options: FetchOptions = {}) {
  const { data, ...customConfig } = options;
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...customConfig.headers,
  };

  const config: RequestInit = {
    ...customConfig,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "An error occurred while fetching data.");
    }

    return result;
  } catch (error: any) {
    console.error("API Fetch Error:", error.message);
    throw error;
  }
}

export const authApi = {
  login: (credentials: any) => apiFetch("/api/auth/login", { method: "POST", data: credentials }),
  register: (userData: any) => apiFetch("/api/auth/register", { method: "POST", data: userData }),
};

export const eventApi = {
  getEvents: (page = 1, limit = 10) => apiFetch(`/api/events?page=${page}&limit=${limit}`),
  getEvent: (id: string) => apiFetch(`/api/events/${id}`),
  createEvent: (eventData: any) => apiFetch("/api/events", { method: "POST", data: eventData }),
  getEventRegistrations: (id: string, page = 1, limit = 20) => 
    apiFetch(`/api/events/${id}/registrations?page=${page}&limit=${limit}`),
};

export const registrationApi = {
  register: (eventId: string) => apiFetch("/api/registrations", { method: "POST", data: { eventId } }),
  getMyRegistrations: () => apiFetch("/api/registrations/me"),
  cancelRegistration: (id: string) => apiFetch(`/api/registrations/${id}`, { method: "DELETE" }),
};
