import { faker } from "@faker-js/faker";
import { db } from "@/index";
import {
  Table__Users,
  Table__EmployeeProfile,
  Table__PartnerProfile,
  Table__EducationalQualification,
  Table__ProfessionalQualification,
  Table__Experience,
  Table__ManagerialRelationships,
  Table__District,
  Table__State,
} from "@/schema";
import { PARTNER_ROLE, EMPLOYEE_ROLE, USER_STATUS } from "@repo/utils/db-enums";
import { hashPasswordSync } from "@repo/utils/password";
import { generateEmployeeCode } from "@repo/utils/id";
import { DEFAULT_PASSWORD } from "@repo/utils/const/default-password";
import { eq } from "drizzle-orm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE] as const;

type UserRole = (typeof USER_ROLE)[number];

const EMPLOYEE_PROFILE_COUNT = 30;

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

function randomYear(min = 2000, max = new Date().getFullYear()) {
  return String(randomInt(min, max));
}

function randomMonth() {
  return String(randomInt(1, 12)).padStart(2, "0");
}

function randomDate(from: Date, to: Date) {
  return faker.date.between({ from, to });
}

/* -------------------------------------------------------- */
/*                     CLEAR DATABASE                      */
/* -------------------------------------------------------- */

async function clearTables() {
  console.log("🧹 Clearing tables...");

  // Delete child tables before parent tables.
  await db.delete(Table__ManagerialRelationships);
  await db.delete(Table__Experience);
  await db.delete(Table__EducationalQualification);
  await db.delete(Table__ProfessionalQualification);
  await db.delete(Table__EmployeeProfile);
  await db.delete(Table__PartnerProfile);
  await db.delete(Table__District);
  await db.delete(Table__State);
  await db.delete(Table__Users);

  console.log("✅ Tables cleared");
}

/* -------------------------------------------------------- */
/*                           USERS                          */
/* -------------------------------------------------------- */

async function seedUsers() {
  console.log("🔃 Seeding users...");

  const hashedPassword = hashPasswordSync(DEFAULT_PASSWORD);

  const roleDistribution: Record<UserRole, number> = {
    SUPER_ADMIN: 1,
    ADMIN: 2,
    ZSM: 3,
    RSM: 5,
    MANAGER: 7,
    ASM: 12,
    MR: 20,
    STOCKIST: 5,
    SUB_STOCKIST: 3,
    DISTRIBUTOR: 4,
    SUB_DISTRIBUTOR: 3,
  };

  const users: (typeof Table__Users.$inferInsert)[] = [];

  let index = 0;

  for (const [role, count] of Object.entries(roleDistribution)) {
    for (let i = 0; i < count; i++) {
      index++;

      const fullName = faker.person.fullName();
      const baseUsername = fullName.toLowerCase().replace(/[^a-z0-9]/g, "");

      users.push({
        name: fullName,
        email: `user-${index}@example.com`,
        username: `${baseUsername}-${index}`,
        password: hashedPassword,
        phone: randomPhone(),
        role: role as UserRole,
        status: faker.helpers.arrayElement(USER_STATUS),
        employeeCode: generateEmployeeCode({
          role: role as UserRole,
          existingEmployeeCount: i,
        }),
        lastLoginAt: faker.date.recent({
          days: randomInt(1, 30),
        }),
        reportingManagerId: null,
        profilePicture: faker.image.avatar(),
      });
    }
  }

  await db.insert(Table__Users).values(users);

  console.log(`✅ ${users.length} users seeded`);
}

/* -------------------------------------------------------- */
/*                   STATES AND DISTRICTS                   */
/* -------------------------------------------------------- */

async function seedStatesAndDistricts() {
  console.log("🔃 Seeding states and districts...");

  const stateDistrictMap = {
    "West Bengal": [
      "Kolkata",
      "Howrah",
      "Hooghly",
      "Nadia",
      "North 24 Parganas",
      "South 24 Parganas",
      "Darjeeling",
      "Bardhaman",
    ],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
    Delhi: ["New Delhi", "Central Delhi", "North Delhi", "South Delhi"],
    Karnataka: ["Bengaluru Urban", "Mysuru", "Mangaluru", "Belagavi"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"],
    Bihar: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  } as const;

  const stateNames = Object.keys(stateDistrictMap);

  await db.insert(Table__State).values(
    stateNames.map((name) => ({
      name,
    })),
  );

  const states = await db
    .select({
      id: Table__State.id,
      name: Table__State.name,
    })
    .from(Table__State);

  const districts: (typeof Table__District.$inferInsert)[] = [];

  for (const state of states) {
    const districtNames =
      stateDistrictMap[state.name as keyof typeof stateDistrictMap];

    if (!districtNames) continue;

    for (const districtName of districtNames) {
      districts.push({
        name: districtName,
        stateId: state.id,
      });
    }
  }

  await db.insert(Table__District).values(districts);

  const insertedDistricts = await db
    .select({
      id: Table__District.id,
      name: Table__District.name,
      stateId: Table__District.stateId,
    })
    .from(Table__District);

  console.log(`✅ ${states.length} states seeded`);
  console.log(`✅ ${insertedDistricts.length} districts seeded`);

  return insertedDistricts;
}

/* -------------------------------------------------------- */
/*                  EMPLOYEE USER PROFILES                    */
/* -------------------------------------------------------- */

async function seedEmployeeUserProfiles() {
  console.log("🔃 Seeding on-role user profiles...");

  const users = await db
    .select({
      id: Table__Users.id,
      role: Table__Users.role,
      phone: Table__Users.phone,
    })
    .from(Table__Users);

  const employeeUsers = faker.helpers
    .shuffle(
      users.filter((user) =>
        (EMPLOYEE_ROLE as readonly string[]).includes(user.role),
      ),
    )
    .slice(0, EMPLOYEE_PROFILE_COUNT);

  const profiles: (typeof Table__EmployeeProfile.$inferInsert)[] =
    employeeUsers.map((user) => {
      const dateOfBirth = randomDate(
        new Date("1970-01-01T00:00:00.000Z"),
        new Date("2005-12-31T23:59:59.000Z"),
      );

      const joiningDate = randomDate(
        new Date("2018-01-01T00:00:00.000Z"),
        new Date(),
      );

      return {
        associatedUserId: user.id,
        dateOfBirth,
        joiningDate,
        alternatePhone: randomAlternatePhone(user.phone),
      };
    });

  if (profiles.length > 0) {
    await db.insert(Table__EmployeeProfile).values(profiles);
  }

  console.log(`✅ ${profiles.length} on-role profiles seeded`);
}

/* -------------------------------------------------------- */
/*                  PARTNER USER PROFILES                   */
/* -------------------------------------------------------- */

async function seedPartnerUserProfiles() {
  console.log("🔃 Seeding off-role user profiles...");

  const users = await db
    .select({
      id: Table__Users.id,
      role: Table__Users.role,
    })
    .from(Table__Users);

  const partnerUsers = users.filter((user) =>
    (PARTNER_ROLE as readonly string[]).includes(user.role),
  );

  const districts = await db
    .select({
      id: Table__District.id,
    })
    .from(Table__District);

  if (districts.length === 0 && partnerUsers.length > 0) {
    throw new Error("No districts available for partner profiles");
  }

  const partnerCategories = Table__PartnerProfile.category.enumValues;

  const profiles: (typeof Table__PartnerProfile.$inferInsert)[] =
    partnerUsers.map((user) => {
      const district = faker.helpers.arrayElement(districts);

      return {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        postOffice: `${faker.location.city()} Post Office`,
        policeStation: `${faker.location.city()} Police Station`,
        districtId: district.id,
        pinCode: faker.string.numeric(6),
        category: faker.helpers.arrayElement(partnerCategories),
        categoryDetails: faker.lorem.sentence().slice(0, 200),
        contactPersonName: faker.person.fullName(),
        contactPersonEmail: faker.internet.email(),
        contactPersonPhone: randomPhone(),
        idProofUrl: `https://example.com/documents/id-proof-${user.id}.pdf`,
        drugLicenseUrl: `https://example.com/documents/drug-license-${user.id}.pdf`,
        effectiveFrom: randomDate(
          new Date("2018-01-01T00:00:00.000Z"),
          new Date(),
        ),
      };
    });

  if (profiles.length > 0) {
    await db.insert(Table__PartnerProfile).values(profiles);
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
      id: Table__EmployeeProfile.id,
    })
    .from(Table__EmployeeProfile);

  const qualificationOptions = [
    "Bachelor of Pharmacy (B.Pharm)",
    "Master of Pharmacy (M.Pharm)",
    "Doctor of Pharmacy (Pharm.D)",
    "Diploma in Pharmacy (D.Pharm)",
    "Bachelor of Science in Nursing",
    "Bachelor of Science in Chemistry",
    "Bachelor of Science in Biotechnology",
    "Bachelor of Science in Microbiology",
    "Bachelor of Science in Biochemistry",
    "Master of Science in Biotechnology",
    "Master of Science in Microbiology",
    "Master of Science in Biochemistry",
    "Master of Science in Clinical Research",
    "Master of Business Administration (Pharmaceutical Management)",
    "Master of Business Administration (Marketing)",
    "Bachelor of Business Administration",
    "Bachelor of Commerce",
    "Bachelor of Science in Life Sciences",
    "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
    "Master of Public Health (MPH)",
  ];

  const institutionOptions = [
    "Jadavpur University",
    "University of Calcutta",
    "Bengal College of Pharmaceutical Sciences",
    "Institute of Pharmacy, Jalpaiguri",
    "Delhi Institute of Pharmaceutical Sciences and Research",
    "Bombay College of Pharmacy",
    "Manipal College of Pharmaceutical Sciences",
    "Jamia Hamdard University",
    "National Institute of Pharmaceutical Education and Research",
    "Birla Institute of Technology and Science, Pilani",
    "Banaras Hindu University",
    "University of Mumbai",
    "Anna University",
    "Amity University",
    "SRM Institute of Science and Technology",
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
        associatedProfileId: profile.id,
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
      id: Table__EmployeeProfile.id,
    })
    .from(Table__EmployeeProfile);

  const qualificationOptions = [
    "Registered Pharmacist",
    "Good Manufacturing Practices (GMP) Certification",
    "Good Clinical Practice (GCP) Certification",
    "Good Laboratory Practice (GLP) Certification",
    "Pharmacovigilance Certification",
    "Clinical Research Certification",
    "Drug Regulatory Affairs Certification",
    "Quality Assurance Certification",
    "Quality Control in Pharmaceutical Industry",
    "Medical Representative Training Certification",
    "Pharmaceutical Sales and Marketing Certification",
    "Pharmaceutical Product Management Certification",
    "Medical Coding Certification",
    "Clinical Data Management Certification",
    "ISO 9001 Quality Management Certification",
    "ISO 13485 Medical Devices Quality Management",
    "Certificate in Pharmaceutical Production",
    "Certificate in Hospital and Clinical Pharmacy",
    "Certified Medical Representative",
    "Advanced Certificate in Drug Safety and Pharmacovigilance",
  ];

  const issuerOptions = [
    "Pharmacy Council of India",
    "State Pharmacy Council",
    "National Institute of Pharmaceutical Education and Research",
    "Indian Pharmaceutical Association",
    "Indian Society for Clinical Research",
    "Central Drugs Standard Control Organisation",
    "Quality Council of India",
    "Indian Council of Medical Research",
    "National Skill Development Corporation",
    "International Society of Pharmacovigilance",
    "Institute of Clinical Research India",
    "Internal Training and Development Department",
  ];

  const qualifications: (typeof Table__ProfessionalQualification.$inferInsert)[] =
    [];

  for (const profile of profiles) {
    const count = randomInt(0, 3);

    if (count === 0) continue;

    const selected = faker.helpers.arrayElements(qualificationOptions, count);

    for (const qualification of selected) {
      qualifications.push({
        qualification,
        issuer: faker.helpers.arrayElement(issuerOptions),
        year: randomYear(2015, 2026),
        associatedProfileId: profile.id,
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
      id: Table__EmployeeProfile.id,
    })
    .from(Table__EmployeeProfile);

  const designationOptions = [
    "Medical Representative",
    "Senior Medical Representative",
    "Territory Sales Executive",
    "Territory Business Executive",
    "Area Sales Manager",
    "Area Business Manager",
    "Regional Sales Manager",
    "Regional Business Manager",
    "Zonal Sales Manager",
    "Zonal Business Manager",
    "National Sales Manager",
    "Business Development Executive",
    "Pharmaceutical Sales Executive",
    "Product Executive",
    "Product Manager",
    "Pharmaceutical Marketing Manager",
    "Brand Manager - Pharmaceuticals",
    "Medical Affairs Executive",
    "Medical Science Liaison",
    "Pharmacovigilance Associate",
    "Drug Safety Associate",
    "Clinical Research Associate",
    "Clinical Trial Coordinator",
    "Quality Assurance Executive",
    "Quality Control Analyst",
    "Production Pharmacist",
    "Regulatory Affairs Executive",
    "Regulatory Affairs Manager",
    "Research and Development Scientist",
    "Microbiologist - Pharmaceutical Manufacturing",
    "Warehouse and Inventory Executive",
    "Supply Chain Executive",
    "Pharmaceutical Distribution Manager",
    "Hospital Sales Executive",
    "Institutional Sales Manager",
    "Sales and Distribution Manager",
  ];

  const experiences: (typeof Table__Experience.$inferInsert)[] = [];

  for (const profile of profiles) {
    const count = randomInt(0, 4);

    for (let i = 0; i < count; i++) {
      const startYear = randomInt(2010, 2024);
      const startMonth = randomMonth();

      const startDate = `${startYear}-${startMonth}`;

      const isCurrent = i === 0 && faker.datatype.boolean();

      const endYear = Math.min(startYear + randomInt(1, 3), 2026);

      const endMonth = randomMonth();

      experiences.push({
        company: faker.helpers.arrayElement([
          "Sun Pharmaceutical Industries Ltd.",
          "Cipla Limited",
          "Dr. Reddy's Laboratories",
          "Lupin Limited",
          "Zydus Lifesciences",
          "Torrent Pharmaceuticals",
          "Alkem Laboratories",
          "Mankind Pharma",
          "Abbott India Limited",
          "Glenmark Pharmaceuticals",
          "Intas Pharmaceuticals",
          "Aurobindo Pharma",
          "Alembic Pharmaceuticals",
          "Biocon Limited",
          "Emcure Pharmaceuticals",
          "Ipca Laboratories",
          "Ajanta Pharma",
          "Aristo Pharmaceuticals",
          "Micro Labs Limited",
          "Franco-Indian Pharmaceuticals",
        ]),
        designation: faker.helpers.arrayElement(designationOptions),
        startDate,
        endDate: isCurrent ? null : `${endYear}-${endMonth}`,
        description: faker.helpers.arrayElement([
          "Managed pharmaceutical product promotion and maintained relationships with doctors and healthcare professionals.",
          "Handled territory sales operations, prescription generation, and achievement of monthly sales targets.",
          "Developed business relationships with hospitals, clinics, pharmacies, and pharmaceutical distributors.",
          "Coordinated product launches, medical campaigns, and brand promotion activities.",
          "Monitored adverse drug reactions and supported pharmacovigilance reporting activities.",
          "Ensured compliance with pharmaceutical quality standards and regulatory requirements.",
          "Managed pharmaceutical inventory, stock movement, and distributor coordination.",
          "Conducted product presentations and scientific discussions with healthcare professionals.",
          "Supported clinical research activities, documentation, and trial coordination.",
          "Worked on pharmaceutical production, quality control, and standard operating procedures.",
          "Analyzed territory performance, market trends, competitor activities, and sales reports.",
          "Managed key accounts and institutional sales across hospitals and healthcare organizations.",
        ]),
        associatedProfileId: profile.id,
      });
    }
  }

  if (experiences.length > 0) {
    await db.insert(Table__Experience).values(experiences);
  }

  console.log(`✅ ${experiences.length} experiences seeded`);
}

/* -------------------------------------------------------- */
/*                  MANAGERIAL RELATIONSHIPS                */
/* -------------------------------------------------------- */

async function seedManagerialRelationships() {
  console.log("🔃 Seeding managerial relationships...");

  const users = await db
    .select({
      id: Table__Users.id,
      role: Table__Users.role,
    })
    .from(Table__Users);

  const reportingHierarchy: Record<string, string[]> = {
    ADMIN: ["SUPER_ADMIN"],
    ZSM: ["ADMIN"],
    RSM: ["ZSM"],
    MANAGER: ["RSM"],
    ASM: ["MANAGER"],
    MR: ["ASM"],
  };

  // Group users by role.
  const usersByRole = new Map<string, typeof users>();

  for (const user of users) {
    const existing = usersByRole.get(user.role) ?? [];

    existing.push(user);

    usersByRole.set(user.role, existing);
  }

  const assignments: {
    userId: (typeof users)[number]["id"];
    managerId: (typeof users)[number]["id"];
  }[] = [];

  for (const [subordinateRole, managerRoles] of Object.entries(
    reportingHierarchy,
  )) {
    const subordinates = faker.helpers.shuffle(
      usersByRole.get(subordinateRole) ?? [],
    );

    const managers = managerRoles.flatMap(
      (role) => usersByRole.get(role) ?? [],
    );

    if (managers.length === 0) {
      console.log(`⚠️ No manager available for ${subordinateRole}`);
      continue;
    }

    // Distribute subordinates across eligible managers.
    const shuffledManagers = faker.helpers.shuffle(managers);

    subordinates.forEach((subordinate, index) => {
      const manager = shuffledManagers[index % shuffledManagers.length];

      if (!manager) return;

      assignments.push({
        userId: subordinate.id,
        managerId: manager.id,
      });
    });
  }

  const now = new Date();

  const relationships: (typeof Table__ManagerialRelationships.$inferInsert)[] =
    assignments.map((assignment) => ({
      managerId: assignment.managerId,
      subordinateId: assignment.userId,
      assignedAt: now,
      effectiveFrom: now,
      effectiveTo: null,
    }));

  if (relationships.length > 0) {
    await db.insert(Table__ManagerialRelationships).values(relationships);
  }

  // Keep the users.reportingManagerId field synchronized.
  for (const assignment of assignments) {
    await db
      .update(Table__Users)
      .set({
        reportingManagerId: assignment.managerId,
      })
      .where(eq(Table__Users.id, assignment.userId));
  }

  console.log(`✅ ${assignments.length} managerial relationships seeded`);
}

/* -------------------------------------------------------- */
/*                            MAIN                          */
/* -------------------------------------------------------- */

export async function seed() {
  try {
    console.log("🚀 SEEDING STARTED");

    await clearTables();

    // Users first because other records depend on them.
    await seedUsers();

    // Geographic master data before partner profiles.
    await seedStatesAndDistricts();

    // User profiles.
    await seedEmployeeUserProfiles();
    await seedPartnerUserProfiles();

    // Employee qualifications and experience.
    await seedEducationalQualifications();
    await seedProfessionalQualifications();
    await seedExperience();

    // Reporting hierarchy.
    await seedManagerialRelationships();

    console.log("🎉 SEEDING COMPLETED");
    process.exit();
  } catch (err) {
    console.error("❌ SEED FAILED", err);
    process.exitCode = 1;
    throw err;
  }
}

seed();
