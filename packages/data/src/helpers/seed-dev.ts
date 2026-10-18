import { faker } from "@faker-js/faker";
import { db } from "@/index";
import { Table__Users } from "@/schema";
import { USER_ROLE, USER_STATUS } from "@repo/utils/db-enums";
import { hashPassword } from "@repo/utils/password";
import { generateEmployeeCode } from "@repo/utils/id";
import { DEFAULT_PASSWORD } from "@repo/utils/const/default-password";

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

  await db.delete(Table__Users);

  console.log("✅ Tables cleared");
}

/* -------------------------------------------------------- */
/*                         Table__Users                        */
/* -------------------------------------------------------- */

async function seedUsers() {
  console.log("🔃 Seeding Table__Users...");

  const hashedPassword = await hashPassword(DEFAULT_PASSWORD);

  const __dummyUsers = Array.from({ length: 20 }).map<
    typeof Table__Users.$inferInsert
  >((_, idx) => {
    const fullName = faker.person.fullName();
    const userName = `${fullName.toLowerCase().split(" ").join("")}-${idx}`;
    const role = faker.helpers.arrayElement(USER_ROLE);

    return {
      name: fullName,
      email: `${userName}@email.com`,
      username: `${userName}`,
      password: hashedPassword,
      phone: `${randomInt(1000000000, 11000000000)}`,
      isActive: randomInt(0, 10) > 5,
      role: role,
      status: faker.helpers.arrayElement(USER_STATUS),
      avatarUrl: faker.image.avatar(),
      employeeCode: generateEmployeeCode({ role }),
      lastLoginAt: faker.date.recent({
        refDate: new Date(Date.now()),
        days: randomInt(1, 5),
      }),
    };
  });

  await db.insert(Table__Users).values([...__dummyUsers]);

  console.log("✅ Table__Users seeded");
}

/* -------------------------------------------------------- */
/*                           MAIN                           */
/* -------------------------------------------------------- */

export async function seed() {
  try {
    console.log("🚀 SEEDING STARTED");

    await clearTables();

    await seedUsers();

    console.log("🎉 SEEDING COMPLETED");

    process.exit(0);
  } catch (err) {
    console.error("❌ SEED FAILED", err);
    process.exit(1);
  }
}

seed();
