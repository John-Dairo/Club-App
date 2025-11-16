import { storage } from "./storage";
import { hashPassword } from "./auth";

export async function seedDatabase() {
  try {
    const demoUser = await storage.getUserByUsername("demo");
    if (!demoUser) {
      const hashedPassword = await hashPassword("password");
      const user = await storage.createUser({
        username: "demo",
        password: hashedPassword,
      });
      console.log("✓ Created demo user (username: demo, password: password)");
      
      const club = await storage.createClub({
        name: "UTD Sports Club",
        description: "Join us for various sports activities including volleyball, basketball, and soccer.",
        category: "sports",
        creatorId: user.id,
      });
      
      await storage.addClubMember({
        clubId: club.id,
        userId: user.id,
        role: "owner",
      });
      
      await storage.updateClubMemberCount(club.id, 1);
      
      await storage.createEvent({
        title: "UTD VOLLEYBALL GAME",
        description: "6v6 Coed Volleyball game",
        clubId: club.id,
        organizerId: user.id,
        eventDate: new Date("2025-10-13T18:00:00"),
        location: "Main Gym",
      });
      
      console.log("✓ Created sample club and event");
    }
  } catch (error) {
    console.error("Seed error:", error);
  }
}
