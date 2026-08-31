import { faker } from "@faker-js/faker";
import { db } from "@/index";
import { OrganizationsTable, UsersTable } from "@/schema";

/* -------------------------------------------------------- */
/*                          HELPERS                         */
/* -------------------------------------------------------- */

function randomInt(min: number, max: number) {
  return faker.number.int({ min, max });
}

// function roundToClosest9(n: number): number {
//   return n % 10 === 9 ? n : Math.floor(n / 10) * 10 + 9;
// }

/* -------------------------------------------------------- */
/*                      CLEAR DATABASE                      */
/* -------------------------------------------------------- */

async function clearTables() {
  console.log("🧹 Clearing tables...");

  await db.delete(OrganizationsTable);
  await db.delete(UsersTable);

  console.log("✅ Tables cleared");
}

/* -------------------------------------------------------- */
/*                         OrganizationsTable                        */
/* -------------------------------------------------------- */

async function seedOrganizations() {
  console.log("🔃 Seeding OrganizationsTable...");

  const __dummyOrganizations = Array.from({ length: 180 }).map<
    typeof OrganizationsTable.$inferInsert
  >((_, idx) => {
    return {
      code: `${faker.word.noun({ length: { max: 10, min: 3 } }).toUpperCase()}${idx}`,
      name: faker.person.fullName(),
      address: faker.lorem.sentence({ max: 30, min: 10 }),
      email: `${faker.internet.email().split("@")[0]!.toLowerCase()}-${idx}${faker.internet.email().split("@")[1]}`,
      isActive: randomInt(0, 10) > 5,
      pinCode: `${randomInt(700000, 799999)}`,
      gstin:
        randomInt(1, 10) > 5
          ? `${randomInt(1000000000, 11000000000)}`
          : undefined,
      phone:
        randomInt(1, 10) > 5
          ? `${randomInt(1000000000, 11000000000)}`
          : undefined,
      pan:
        randomInt(1, 10) > 5
          ? `${randomInt(1000000000, 11000000000)}`
          : undefined,
      createdAt: faker.date.recent({
        refDate: new Date(Date.now()),
        days: randomInt(5, 10),
      }),
      updatedAt: faker.date.recent({
        refDate: new Date(Date.now()),
        days: randomInt(1, 5),
      }),
    };
  });

  await db.insert(OrganizationsTable).values([...__dummyOrganizations]);

  console.log("✅ OrganizationsTable seeded");
}

/* -------------------------------------------------------- */
/*                         UsersTable                        */
/* -------------------------------------------------------- */

async function seedUsers() {
  console.log("🔃 Seeding UsersTable...");

  const organizations = await db
    .select({ id: OrganizationsTable.id })
    .from(OrganizationsTable);

  const __dummyUsers = Array.from({ length: 180 }).map<
    typeof UsersTable.$inferInsert
  >((_, idx) => {
    return {
      name: faker.person.fullName(),
      email: `${faker.internet.email().split("@")[0]!.toLowerCase()}-${idx}${faker.internet.email().split("@")[1]}`,
      password: faker.internet.password(),
      organizationId: faker.helpers.arrayElement(
        organizations.map((org) => org.id),
      ),
      createdAt: faker.date.recent({
        refDate: new Date(Date.now()),
        days: randomInt(5, 10),
      }),
      updatedAt: faker.date.recent({
        refDate: new Date(Date.now()),
        days: randomInt(1, 5),
      }),
      phone: `${randomInt(1000000000, 11000000000)}`,
      isActive: randomInt(0, 10) > 5,
      role: faker.helpers.arrayElement([
        "SUPER_ADMIN",
        "ADMIN",
        "MR",
        "DISTRIBUTOR",
        "STOCKIST",
        "MANAGER",
      ]),
      status: faker.helpers.arrayElement([
        "ACTIVE",
        "INACTIVE",
        "SUSPENDED",
        "UNDER_VERIFICATION",
      ]),
      avatarUrl: faker.image.avatar(),
      employeeCode: `${faker.word.noun({ length: { max: 10, min: 3 } }).toUpperCase()}${idx}`,
      lastLoginAt: faker.date.recent({
        refDate: new Date(Date.now()),
        days: randomInt(1, 5),
      }),
    };
  });

  await db.insert(UsersTable).values([...__dummyUsers]);

  console.log("✅ UsersTable seeded");
}

/* -------------------------------------------------------- */
/*                           MAIN                           */
/* -------------------------------------------------------- */

export async function seed() {
  try {
    console.log("🚀 SEEDING STARTED");

    await clearTables();

    await seedOrganizations();
    await seedUsers();

    console.log("🎉 SEEDING COMPLETED");

    process.exit(0);
  } catch (err) {
    console.error("❌ SEED FAILED", err);
    process.exit(1);
  }
}

seed();
