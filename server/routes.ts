import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/clubs", async (_req, res) => {
    try {
      const clubs = await storage.getAllClubs();
      res.json(clubs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch clubs" });
    }
  });

  app.get("/api/clubs/:id", async (req, res) => {
    try {
      const club = await storage.getClub(req.params.id);
      if (!club) {
        return res.status(404).json({ error: "Club not found" });
      }
      res.json(club);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch club" });
    }
  });

  app.post("/api/clubs", async (req, res) => {
    try {
      const club = await storage.createClub(req.body);
      await storage.addClubMember({
        clubId: club.id,
        userId: req.body.creatorId,
        role: "owner",
      });
      await storage.updateClubMemberCount(club.id, 1);
      res.status(201).json(club);
    } catch (error) {
      res.status(500).json({ error: "Failed to create club" });
    }
  });

  app.get("/api/events", async (_req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/clubs/:clubId/events", async (req, res) => {
    try {
      const events = await storage.getEventsByClub(req.params.clubId);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const event = await storage.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to create event" });
    }
  });

  app.get("/api/clubs/:clubId/members", async (req, res) => {
    try {
      const members = await storage.getClubMembers(req.params.clubId);
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch members" });
    }
  });

  app.post("/api/clubs/:clubId/join", async (req, res) => {
    try {
      const { userId } = req.body;
      const existing = await storage.getClubMember(req.params.clubId, userId);
      
      if (existing) {
        return res.status(400).json({ error: "Already a member" });
      }

      const member = await storage.addClubMember({
        clubId: req.params.clubId,
        userId,
        role: "member",
      });

      const club = await storage.getClub(req.params.clubId);
      if (club) {
        await storage.updateClubMemberCount(req.params.clubId, club.memberCount + 1);
      }

      res.status(201).json(member);
    } catch (error) {
      res.status(500).json({ error: "Failed to join club" });
    }
  });

  app.get("/api/clubs/:clubId/chat", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const messages = await storage.getChatMessages(req.params.clubId, limit);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/clubs/:clubId/chat", async (req, res) => {
    try {
      const { userId, content } = req.body;
      const message = await storage.createChatMessage({
        clubId: req.params.clubId,
        userId,
        content,
      });
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.get("/api/users/:userId/notifications", async (req, res) => {
    try {
      const notifications = await storage.getUserNotifications(req.params.userId);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  });

  app.post("/api/notifications", async (req, res) => {
    try {
      const notification = await storage.createNotification(req.body);
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ error: "Failed to create notification" });
    }
  });

  app.patch("/api/notifications/:id/read", async (req, res) => {
    try {
      await storage.markNotificationAsRead(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to mark as read" });
    }
  });

  app.get("/api/users/:userId/follows", async (req, res) => {
    try {
      const follows = await storage.getUserFollows(req.params.userId);
      res.json(follows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch follows" });
    }
  });

  app.post("/api/follows", async (req, res) => {
    try {
      const follow = await storage.createFollow(req.body);
      res.status(201).json(follow);
    } catch (error) {
      res.status(500).json({ error: "Failed to follow club" });
    }
  });

  app.delete("/api/users/:userId/follows/:clubId", async (req, res) => {
    try {
      await storage.deleteFollow(req.params.userId, req.params.clubId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to unfollow club" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
