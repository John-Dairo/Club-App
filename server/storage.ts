import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { eq, desc, and } from "drizzle-orm";
import * as schema from "@shared/schema";
import type {
  User,
  InsertUser,
  Club,
  Event,
  ClubMember,
  ChatMessage,
  Notification,
  Follow,
} from "@shared/schema";
import ws from "ws";

neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllClubs(): Promise<Club[]>;
  getClub(id: string): Promise<Club | undefined>;
  createClub(club: Omit<typeof schema.insertClubSchema._type, "id">): Promise<Club>;
  updateClubMemberCount(clubId: string, count: number): Promise<void>;
  
  getAllEvents(): Promise<Event[]>;
  getEventsByClub(clubId: string): Promise<Event[]>;
  createEvent(event: Omit<typeof schema.insertEventSchema._type, "id">): Promise<Event>;
  deleteEvent(id: string): Promise<void>;
  
  getClubMembers(clubId: string): Promise<(ClubMember & { user: User })[]>;
  addClubMember(member: typeof schema.insertClubMemberSchema._type): Promise<ClubMember>;
  getClubMember(clubId: string, userId: string): Promise<ClubMember | undefined>;
  
  getChatMessages(clubId: string, limit?: number): Promise<(ChatMessage & { user: User })[]>;
  createChatMessage(message: typeof schema.insertChatMessageSchema._type): Promise<ChatMessage>;
  
  getUserNotifications(userId: string): Promise<Notification[]>;
  createNotification(notification: typeof schema.insertNotificationSchema._type): Promise<Notification>;
  markNotificationAsRead(id: string): Promise<void>;
  
  getUserFollows(userId: string): Promise<(Follow & { club: Club })[]>;
  createFollow(follow: typeof schema.insertFollowSchema._type): Promise<Follow>;
  deleteFollow(userId: string, clubId: string): Promise<void>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(schema.users).values(insertUser).returning();
    return result[0];
  }

  async getAllClubs(): Promise<Club[]> {
    return db.select().from(schema.clubs).orderBy(desc(schema.clubs.createdAt));
  }

  async getClub(id: string): Promise<Club | undefined> {
    const result = await db.select().from(schema.clubs).where(eq(schema.clubs.id, id));
    return result[0];
  }

  async createClub(club: Omit<typeof schema.insertClubSchema._type, "id">): Promise<Club> {
    const result = await db.insert(schema.clubs).values(club).returning();
    return result[0];
  }

  async updateClubMemberCount(clubId: string, count: number): Promise<void> {
    await db.update(schema.clubs).set({ memberCount: count }).where(eq(schema.clubs.id, clubId));
  }

  async getAllEvents(): Promise<Event[]> {
    return db.select().from(schema.events).orderBy(desc(schema.events.eventDate));
  }

  async getEventsByClub(clubId: string): Promise<Event[]> {
    return db.select().from(schema.events).where(eq(schema.events.clubId, clubId)).orderBy(desc(schema.events.eventDate));
  }

  async createEvent(event: Omit<typeof schema.insertEventSchema._type, "id">): Promise<Event> {
    const result = await db.insert(schema.events).values(event).returning();
    return result[0];
  }

  async deleteEvent(id: string): Promise<void> {
    await db.delete(schema.events).where(eq(schema.events.id, id));
  }

  async getClubMembers(clubId: string): Promise<(ClubMember & { user: User })[]> {
    const result = await db
      .select()
      .from(schema.clubMembers)
      .innerJoin(schema.users, eq(schema.clubMembers.userId, schema.users.id))
      .where(eq(schema.clubMembers.clubId, clubId));
    
    return result.map((row) => ({
      ...row.club_members,
      user: row.users,
    }));
  }

  async addClubMember(member: typeof schema.insertClubMemberSchema._type): Promise<ClubMember> {
    const result = await db.insert(schema.clubMembers).values(member).returning();
    return result[0];
  }

  async getClubMember(clubId: string, userId: string): Promise<ClubMember | undefined> {
    const result = await db
      .select()
      .from(schema.clubMembers)
      .where(and(
        eq(schema.clubMembers.clubId, clubId),
        eq(schema.clubMembers.userId, userId)
      ));
    return result[0];
  }

  async getChatMessages(clubId: string, limit = 50): Promise<(ChatMessage & { user: User })[]> {
    const result = await db
      .select()
      .from(schema.chatMessages)
      .innerJoin(schema.users, eq(schema.chatMessages.userId, schema.users.id))
      .where(eq(schema.chatMessages.clubId, clubId))
      .orderBy(desc(schema.chatMessages.createdAt))
      .limit(limit);
    
    return result.map((row) => ({
      ...row.chat_messages,
      user: row.users,
    })).reverse();
  }

  async createChatMessage(message: typeof schema.insertChatMessageSchema._type): Promise<ChatMessage> {
    const result = await db.insert(schema.chatMessages).values(message).returning();
    return result[0];
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return db.select().from(schema.notifications).where(eq(schema.notifications.userId, userId)).orderBy(desc(schema.notifications.createdAt));
  }

  async createNotification(notification: typeof schema.insertNotificationSchema._type): Promise<Notification> {
    const result = await db.insert(schema.notifications).values(notification).returning();
    return result[0];
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await db.update(schema.notifications).set({ isRead: true }).where(eq(schema.notifications.id, id));
  }

  async getUserFollows(userId: string): Promise<(Follow & { club: Club })[]> {
    const result = await db
      .select()
      .from(schema.follows)
      .innerJoin(schema.clubs, eq(schema.follows.followingId, schema.clubs.id))
      .where(eq(schema.follows.followerId, userId));
    
    return result.map((row) => ({
      ...row.follows,
      club: row.clubs,
    }));
  }

  async createFollow(follow: typeof schema.insertFollowSchema._type): Promise<Follow> {
    const result = await db.insert(schema.follows).values(follow).returning();
    return result[0];
  }

  async deleteFollow(userId: string, clubId: string): Promise<void> {
    await db
      .delete(schema.follows)
      .where(and(
        eq(schema.follows.followerId, userId),
        eq(schema.follows.followingId, clubId)
      ));
  }
}

export const storage = new DbStorage();
