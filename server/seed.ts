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
      
      await storage.createEvent({
        title: "Basketball Tournament",
        description: "Join us for an exciting 3v3 basketball tournament. All skill levels welcome!",
        clubId: club.id,
        organizerId: user.id,
        eventDate: new Date("2025-11-20T14:00:00"),
        location: "Outdoor Courts",
      });
      
      await storage.createEvent({
        title: "Soccer Practice Session",
        description: "Weekly soccer practice for all members. Bring your cleats and water bottle.",
        clubId: club.id,
        organizerId: user.id,
        eventDate: new Date("2025-11-25T17:30:00"),
        location: "Soccer Field",
      });
      
      console.log("✓ Created sample club and events");
    }

    const adminUser = await storage.getUserByUsername("admin");
    if (!adminUser) {
      const hashedPassword = await hashPassword("admin123");
      await storage.createUser({
        username: "admin",
        password: hashedPassword,
        isAdmin: true,
      });
      console.log("✓ Created admin user (username: admin, password: admin123)");
    }
  } catch (error) {
    console.error("Seed error:", error);
  }
}
