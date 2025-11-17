const API_BASE = "/api";

export const api = {
  auth: {
    register: async (username: string, password: string) => {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    login: async (username: string, password: string) => {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
  },
  clubs: {
    getAll: async () => {
      const res = await fetch(`${API_BASE}/clubs`);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    getById: async (id: string) => {
      const res = await fetch(`${API_BASE}/clubs/${id}`);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    create: async (data: {
      name: string;
      description: string;
      category: string;
      creatorId: string;
    }) => {
      const res = await fetch(`${API_BASE}/clubs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    join: async (clubId: string, userId: string) => {
      const res = await fetch(`${API_BASE}/clubs/${clubId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    getMembers: async (clubId: string) => {
      const res = await fetch(`${API_BASE}/clubs/${clubId}/members`);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
  },
  events: {
    getAll: async () => {
      const res = await fetch(`${API_BASE}/events`);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    getByClub: async (clubId: string) => {
      const res = await fetch(`${API_BASE}/clubs/${clubId}/events`);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    delete: async (eventId: string) => {
      const sessionToken = localStorage.getItem("sessionToken");
      const res = await fetch(`${API_BASE}/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionToken}`,
        },
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
  },
  chat: {
    getMessages: async (clubId: string, limit = 50) => {
      const res = await fetch(`${API_BASE}/clubs/${clubId}/chat?limit=${limit}`);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    sendMessage: async (clubId: string, userId: string, content: string) => {
      const res = await fetch(`${API_BASE}/clubs/${clubId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, content }),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
  },
  notifications: {
    getByUser: async (userId: string) => {
      const res = await fetch(`${API_BASE}/users/${userId}/notifications`);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    markAsRead: async (id: string) => {
      const res = await fetch(`${API_BASE}/notifications/${id}/read`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
  },
  follows: {
    getByUser: async (userId: string) => {
      const res = await fetch(`${API_BASE}/users/${userId}/follows`);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    create: async (userId: string, clubId: string) => {
      const res = await fetch(`${API_BASE}/follows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId: userId, followingId: clubId }),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    delete: async (userId: string, clubId: string) => {
      const res = await fetch(`${API_BASE}/users/${userId}/follows/${clubId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
  },
  search: {
    aiSearch: async (query: string) => {
      const res = await fetch(`${API_BASE}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
  },
};
