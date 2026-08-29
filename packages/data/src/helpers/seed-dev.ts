import { faker } from "@faker-js/faker";
import { db } from "@/index";
import { Organizations } from "@/schema";

/* -------------------------------------------------------- */
/*                          HELPERS                         */
/* -------------------------------------------------------- */

// function randomInt(min: number, max: number) {
//   return faker.number.int({ min, max });
// }

// function roundToClosest9(n: number): number {
//   return n % 10 === 9 ? n : Math.floor(n / 10) * 10 + 9;
// }

/* -------------------------------------------------------- */
/*                      CLEAR DATABASE                      */
/* -------------------------------------------------------- */

async function clearTables() {
  console.log("🧹 Clearing tables...");

  await db.delete(Organizations);

  console.log("✅ Tables cleared");
}

/* -------------------------------------------------------- */
/*                         Organizations                        */
/* -------------------------------------------------------- */

async function seedOrganizations() {
  console.log("🔃 Seeding Organizations...");

  const __dummyUsers = Array.from({ length: 180 }).map<
    typeof Organizations.$inferInsert
  >(() => {
    return {
      code: faker.word.noun({ length: { max: 10, min: 3 } }).toUpperCase(),
      name: faker.word.noun({ length: { max: 10, min: 3 } }),
      address: faker.lorem.sentence({ max: 30, min: 10 }),
    };
  });

  await db.insert(Organizations).values([...__dummyUsers]);

  const users = await db.select().from(Organizations);

  const updatedUsers = users.map<typeof Organizations.$inferInsert>((u) => {
    return {
      ...u,
      referrerId:
        users[Math.floor(Math.random() * users.length)]?.id === u.id
          ? undefined
          : users[Math.floor(Math.random() * users.length)]?.id,
    };
  });

  await db.delete(Organizations);

  await db.insert(Organizations).values([...updatedUsers]);

  console.log("✅ Organizations seeded");
}

/* -------------------------------------------------------- */
/*                           MAIN                           */
/* -------------------------------------------------------- */

export async function seed() {
  try {
    console.log("🚀 SEEDING STARTED");

    await clearTables();

    await seedOrganizations();

    console.log("🎉 SEEDING COMPLETED");

    process.exit(0);
  } catch (err) {
    console.error("❌ SEED FAILED", err);
    process.exit(1);
  }
}

seed();
