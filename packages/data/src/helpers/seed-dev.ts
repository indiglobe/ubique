import { faker } from "@faker-js/faker";
import { db } from "@/index";
import {
  Table__Users,
  Table__OnroleUserProfile,
  Table__OffroleUserProfile,
  Table__EducationalQualification,
  Table__ProfessionalQualification,
  Table__Experience,
} from "@/schema";
import {
  OFFROLE_USER_ROLE,
  ONROLE_USER_ROLE,
  USER_STATUS,
} from "@repo/utils/db-enums";
import { hashPassword } from "@repo/utils/password";
import { generateEmployeeCode } from "@repo/utils/id";
import { DEFAULT_PASSWORD } from "@repo/utils/const/default-password";
import { YEAR } from "@repo/utils/const/date";

const USER_ROLE = [...ONROLE_USER_ROLE, ...OFFROLE_USER_ROLE];

const TOTAL_USERS = 50;
const ONROLE_PROFILE_COUNT = 30;

/* -------------------------------------------------------- */
/*                          HELPERS                         */
/* -------------------------------------------------------- */

function randomInt(min: number, max: number) {
  return faker.number.int({ min, max });
}

function randomPhone() {
  return faker.string.numeric(10);
}

function randomAlternatePhone(primaryPhone: string) {
  let phone: string;

  do {
    phone = randomPhone();
  } while (phone === primaryPhone);

  return phone;
}

function randomYear(
  min = 2000,
  max = new Date(Date.now() + YEAR * 4).getFullYear(),
) {
  return String(randomInt(min, max));
}

/* -------------------------------------------------------- */
/*                      CLEAR DATABASE                      */
/* -------------------------------------------------------- */

async function clearTables() {
  console.log("🧹 Clearing tables...");

  // Delete child tables before parent tables.
  await db.delete(Table__Experience);
  await db.delete(Table__EducationalQualification);
  await db.delete(Table__ProfessionalQualification);
  await db.delete(Table__OnroleUserProfile);
  await db.delete(Table__OffroleUserProfile);
  await db.delete(Table__Users);

  console.log("✅ Tables cleared");
}

/* -------------------------------------------------------- */
/*                         USERS                            */
/* -------------------------------------------------------- */

async function seedUsers() {
  console.log("🔃 Seeding users...");

  const hashedPassword = await hashPassword(DEFAULT_PASSWORD);

  const users: (typeof Table__Users.$inferInsert)[] = Array.from({
    length: TOTAL_USERS,
  }).map((_, idx) => {
    const fullName = faker.person.fullName();

    const baseUsername = fullName.toLowerCase().replace(/[^a-z0-9]/g, "");

    const role = faker.helpers.arrayElement(USER_ROLE);

    return {
      name: fullName,
      email: `user-${idx + 1}@example.com`,
      username: `${baseUsername}-${idx + 1}`,
      password: hashedPassword,
      phone: randomPhone(),
      organizationId: faker.string.alphanumeric(10).toUpperCase(),
      role,
      status: faker.helpers.arrayElement(USER_STATUS),
      employeeCode: generateEmployeeCode({ role }),
      lastLoginAt: faker.date.recent({
        days: randomInt(1, 30),
      }),
      referrerId: null,
      profilePicture: faker.image.avatar(),
    };
  });

  await db.insert(Table__Users).values(users);

  console.log(`✅ ${users.length} users seeded`);
}

/* -------------------------------------------------------- */
/*                  ONROLE USER PROFILES                    */
/* -------------------------------------------------------- */

async function seedOnroleUserProfiles() {
  console.log("🔃 Seeding on-role user profiles...");

  const users = await db
    .select({
      id: Table__Users.id,
      role: Table__Users.role,
      phone: Table__Users.phone,
    })
    .from(Table__Users);

  const onroleUsers = users
    .filter((user) =>
      (ONROLE_USER_ROLE as readonly string[]).includes(user.role),
    )
    .slice(0, ONROLE_PROFILE_COUNT);

  const profiles: (typeof Table__OnroleUserProfile.$inferInsert)[] =
    onroleUsers.map((user) => {
      const dateOfBirth = faker.date.between({
        from: new Date("1970-01-01T00:00:00.000Z"),
        to: new Date("2005-12-31T23:59:59.000Z"),
      });

      const joiningDate = faker.date.between({
        from: new Date("2018-01-01T00:00:00.000Z"),
        to: new Date(),
      });

      return {
        associatedUserId: user.id,
        dateOfBirth,
        joiningDate,
        alternatePhone: randomAlternatePhone(user.phone),
      };
    });

  if (profiles.length > 0) {
    await db.insert(Table__OnroleUserProfile).values(profiles);
  }

  console.log(`✅ ${profiles.length} on-role profiles seeded`);
}

/* -------------------------------------------------------- */
/*                 OFFROLE USER PROFILES                    */
/* -------------------------------------------------------- */

async function seedOffroleUserProfiles() {
  console.log("🔃 Seeding off-role user profiles...");

  const users = await db
    .select({
      id: Table__Users.id,
      role: Table__Users.role,
    })
    .from(Table__Users);

  const offroleUsers = users.filter((user) =>
    (OFFROLE_USER_ROLE as readonly string[]).includes(user.role),
  );

  // The current off-role schema only contains an ID and metadata.
  const profiles: (typeof Table__OffroleUserProfile.$inferInsert)[] =
    offroleUsers.map(() => ({}));

  if (profiles.length > 0) {
    await db.insert(Table__OffroleUserProfile).values(profiles);
  }

  console.log(`✅ ${profiles.length} off-role profiles seeded`);
}

/* -------------------------------------------------------- */
/*                EDUCATIONAL QUALIFICATIONS                */
/* -------------------------------------------------------- */

async function seedEducationalQualifications() {
  console.log("🔃 Seeding educational qualifications...");

  const profiles = await db
    .select({
      id: Table__OnroleUserProfile.id,
    })
    .from(Table__OnroleUserProfile);

  const qualificationOptions = [
    "Bachelor of Technology",
    "Bachelor of Science",
    "Bachelor of Commerce",
    "Bachelor of Arts",
    "Master of Business Administration",
    "Master of Technology",
    "Master of Science",
    "Master of Computer Applications",
    "Diploma",
    "Higher Secondary",
  ];

  const institutionOptions = [
    "IIT Delhi",
    "IIT Bombay",
    "NIT Trichy",
    "University of Calcutta",
    "Delhi University",
    "Jadavpur University",
    "BITS Pilani",
    "Anna University",
    "Mumbai University",
    "Amity University",
  ];

  const qualifications: (typeof Table__EducationalQualification.$inferInsert)[] =
    [];

  for (const profile of profiles) {
    const count = randomInt(1, 3);

    const selected = faker.helpers.arrayElements(qualificationOptions, count);

    for (const qualification of selected) {
      qualifications.push({
        qualification,
        institution: faker.helpers.arrayElement(institutionOptions),
        year: randomYear(2000, 2025),
        assciatedProfile: profile.id,
      });
    }
  }

  if (qualifications.length > 0) {
    await db.insert(Table__EducationalQualification).values(qualifications);
  }

  console.log(`✅ ${qualifications.length} educational qualifications seeded`);
}

/* -------------------------------------------------------- */
/*               PROFESSIONAL QUALIFICATIONS                */
/* -------------------------------------------------------- */

async function seedProfessionalQualifications() {
  console.log("🔃 Seeding professional qualifications...");

  const profiles = await db
    .select({
      id: Table__OnroleUserProfile.id,
    })
    .from(Table__OnroleUserProfile);

  const qualificationOptions = [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional",
    "Microsoft Azure Administrator",
    "Certified Scrum Master",
    "PMP Certification",
    "Oracle Certified Professional",
    "Cisco CCNA",
    "Certified Information Systems Security Professional",
    "Six Sigma Green Belt",
    "Professional HR Certification",
    "Certified Financial Analyst",
    "ITIL Foundation",
  ];

  const issuerOptions = [
    "Amazon Web Services",
    "Google",
    "Microsoft",
    "Scrum Alliance",
    "Project Management Institute",
    "Oracle",
    "Cisco",
    "ISC2",
    "ASQ",
    "HR Certification Institute",
  ];

  const qualifications: (typeof Table__ProfessionalQualification.$inferInsert)[] =
    [];

  for (const profile of profiles) {
    // Not every employee needs a professional qualification.
    const count = randomInt(0, 3);

    if (count === 0) continue;

    const selected = faker.helpers.arrayElements(qualificationOptions, count);

    for (const qualification of selected) {
      qualifications.push({
        qualification,
        issuer: faker.helpers.arrayElement(issuerOptions),
        year: randomYear(2015, 2026),
        assciatedProfile: profile.id,
      });
    }
  }

  if (qualifications.length > 0) {
    await db.insert(Table__ProfessionalQualification).values(qualifications);
  }

  console.log(`✅ ${qualifications.length} professional qualifications seeded`);
}

/* -------------------------------------------------------- */
/*                       EXPERIENCE                         */
/* -------------------------------------------------------- */

async function seedExperience() {
  console.log("🔃 Seeding experience...");

  const profiles = await db
    .select({
      id: Table__OnroleUserProfile.id,
    })
    .from(Table__OnroleUserProfile);

  const designationOptions = [
    "Software Engineer",
    "Senior Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Project Manager",
    "HR Executive",
    "Business Analyst",
    "UI/UX Designer",
    "DevOps Engineer",
    "Data Analyst",
    "Technical Lead",
  ];

  const experiences: (typeof Table__Experience.$inferInsert)[] = [];

  for (const profile of profiles) {
    const count = randomInt(0, 4);

    for (let i = 0; i < count; i++) {
      const startYear = randomInt(2010, 2023);
      const startMonth = String(randomInt(1, 12)).padStart(2, "0");

      const startDate = `${startYear}-${startMonth}`;

      const isCurrent = i === 0 && faker.datatype.boolean();

      const endYear = Math.min(startYear + randomInt(1, 3), 2026);

      const endMonth = String(randomInt(1, 12)).padStart(2, "0");

      experiences.push({
        company: faker.company.name(),
        designation: faker.helpers.arrayElement(designationOptions),
        startDate,
        endDate: isCurrent ? null : `${endYear}-${endMonth}`,
        description: faker.lorem.sentence().slice(0, 150),
        assciatedProfile: profile.id,
      });
    }
  }

  if (experiences.length > 0) {
    await db.insert(Table__Experience).values(experiences);
  }

  console.log(`✅ ${experiences.length} experiences seeded`);
}

/* -------------------------------------------------------- */
/*                            MAIN                          */
/* -------------------------------------------------------- */

export async function seed() {
  try {
    console.log("🚀 SEEDING STARTED");

    await clearTables();

    await seedUsers();
    await seedOnroleUserProfiles();
    await seedOffroleUserProfiles();
    await seedEducationalQualifications();
    await seedProfessionalQualifications();
    await seedExperience();

    console.log("🎉 SEEDING COMPLETED");

    process.exit(0);
  } catch (err) {
    console.error("❌ SEED FAILED", err);
    process.exit(1);
  }
}

seed();
