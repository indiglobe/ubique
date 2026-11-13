import { faker } from "@faker-js/faker";
import { db } from "@/index";
import {
  Table__Users,
  Table__EmployeeProfile,
  Table__EducationalQualification,
  Table__ProfessionalQualification,
  Table__Experience,
  Table__ManagerialRelationships,
  Table__State,
  Table__District,
  Table__PartnerProfile,
  Table__PartnerBusinessDetails,
  Table__PartnerAddress,
  Table__PartnerBankDetails,
  Table__PartnerContactPerson,
  Table__PartnerDocument,
  Table__PartnerAssignedPersonnel,
  Table__PartnerCoverageArea,
  Table__PartnerDistributionFacility,
} from "@/schema";
import { PARTNER_ROLE, EMPLOYEE_ROLE, USER_STATUS } from "@repo/utils/db-enums";
import { hashPassword } from "@repo/utils/password";
import { generateEmployeeCode, id } from "@repo/utils/id";
import { DEFAULT_PASSWORD } from "@repo/utils/const/default-password";
import { YEAR } from "@repo/utils/const/date";
import { eq } from "drizzle-orm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE];

const ONROLE_PROFILE_COUNT = 30;
const PARTNER_PROFILE_COUNT = 30;

/* -------------------------------------------------------- */
/*                          HELPERS                         */
/* -------------------------------------------------------- */

function randomInt(min: number, max: number) {
  return faker.number.int({ min, max });
}

function randomPhone() {
  return faker.string.numeric({
    length: 10,
    allowLeadingZeros: false,
  });
}

function randomIndianPhone() {
  return `${randomInt(6, 9)}${faker.string.numeric(9)}`;
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

function randomId() {
  return id().toUpperCase();
}

function randomDateString(date: Date) {
  return date.toISOString().slice(0, 10);
}

function randomPinCode() {
  return String(randomInt(100000, 999999));
}

function randomAccountNumber() {
  return faker.string.numeric({ length: 14 });
}

function randomIFSC() {
  return `${faker.string.alpha({ length: 4, casing: "upper" })}0${faker.string.numeric(6)}`;
}

function randomGSTIN(stateCode: string) {
  const pan = `${faker.string.alpha({ length: 5, casing: "upper" })}${faker.string.numeric(4)}${faker.string.alpha({ length: 1, casing: "upper" })}`;

  return `${stateCode}${pan}1Z${faker.string.alphanumeric({ length: 1, casing: "upper" })}`;
}

function randomDocumentNumber(prefix: string) {
  return `${prefix}-${faker.string.alphanumeric({
    length: 10,
    casing: "upper",
  })}`;
}

function randomDocumentUrl(partnerId: string, documentType: string) {
  return `https://example.com/seed-documents/${partnerId}/${documentType.toLowerCase().replaceAll("_", "-")}.pdf`;
}

/* -------------------------------------------------------- */
/*                       LOCATION DATA                      */
/* -------------------------------------------------------- */

const stateDistricts = [
  {
    name: "West Bengal",
    code: "19",
    districts: [
      "Kolkata",
      "Howrah",
      "Hooghly",
      "North 24 Parganas",
      "South 24 Parganas",
      "Nadia",
      "Murshidabad",
      "Bardhaman",
      "Birbhum",
      "Darjeeling",
      "Jalpaiguri",
      "Malda",
    ],
  },
  {
    name: "Maharashtra",
    code: "27",
    districts: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
      "Thane",
      "Kolhapur",
      "Aurangabad",
      "Solapur",
    ],
  },
  {
    name: "Karnataka",
    code: "29",
    districts: [
      "Bengaluru Urban",
      "Mysuru",
      "Mangaluru",
      "Belagavi",
      "Hubballi",
      "Dharwad",
      "Tumakuru",
    ],
  },
  {
    name: "Tamil Nadu",
    code: "33",
    districts: [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Salem",
      "Tiruchirappalli",
      "Erode",
      "Tirunelveli",
    ],
  },
  {
    name: "Delhi",
    code: "07",
    districts: [
      "New Delhi",
      "Central Delhi",
      "North Delhi",
      "South Delhi",
      "East Delhi",
      "West Delhi",
    ],
  },
  {
    name: "Uttar Pradesh",
    code: "09",
    districts: [
      "Lucknow",
      "Kanpur Nagar",
      "Varanasi",
      "Prayagraj",
      "Agra",
      "Meerut",
      "Ghaziabad",
      "Gautam Buddha Nagar",
    ],
  },
  {
    name: "Bihar",
    code: "10",
    districts: [
      "Patna",
      "Gaya",
      "Muzaffarpur",
      "Bhagalpur",
      "Darbhanga",
      "Purnia",
    ],
  },
  {
    name: "Odisha",
    code: "21",
    districts: [
      "Khordha",
      "Cuttack",
      "Puri",
      "Sambalpur",
      "Ganjam",
      "Balasore",
    ],
  },
] as const;

const partnerNames = [
  "Eastern Pharma Distributors",
  "Medicare Wholesale Agency",
  "Aarav Healthcare Supplies",
  "Bengal Medical Corporation",
  "LifeCare Pharma Solutions",
  "Sunrise Drug Distributors",
  "PrimeMed Healthcare",
  "Wellness Pharma Agency",
  "National Medical Suppliers",
  "CarePoint Distributors",
  "Reliable Pharma Traders",
  "MedPlus Distribution",
  "HealthFirst Pharma",
  "Apex Medical Agencies",
  "Global Healthcare Distributors",
  "CityMed Pharma Services",
  "United Drug Corporation",
  "Evergreen Healthcare",
  "TrustMed Distributors",
  "BlueCross Pharma Agency",
  "MediWorld Suppliers",
  "Advanced Pharma Links",
  "CureWell Distribution",
  "OmniCare Medical Traders",
  "Sterling Pharma Corporation",
  "LifeLine Drug House",
  "MedAxis Distributors",
  "WellSpring Pharma",
  "National Healthcare Links",
  "PrimeCare Drug Agency",
];

const bankNames = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "Kotak Mahindra Bank",
  "Indian Bank",
];

const contactDesignations = [
  "Proprietor",
  "Managing Partner",
  "Director",
  "General Manager",
  "Operations Manager",
  "Sales Manager",
  "Accounts Manager",
  "Business Development Manager",
];

const ubiquePersonnelDesignations = [
  "Territory Sales Manager",
  "Area Sales Manager",
  "Regional Sales Manager",
  "Business Development Executive",
  "Distribution Manager",
  "Relationship Manager",
];

const facilityTypes = [
  "WAREHOUSE",
  "DISTRIBUTION_CENTER",
  "STOCK_POINT",
  "WHOLESALE_STORAGE",
  "COLD_STORAGE",
];

const facilityDetails = [
  "Pharmaceutical products are stored under controlled environmental conditions.",
  "Facility supports regional distribution and inventory management.",
  "Equipped with product storage racks and dispatch handling facilities.",
  "Maintains batch-wise inventory and expiry tracking.",
  "Supports pharmaceutical stock management and local distribution.",
];

/* -------------------------------------------------------- */
/*                      CLEAR DATABASE                      */
/* -------------------------------------------------------- */

async function clearTables() {
  console.log("🧹 Clearing tables...");

  await db.delete(Table__ManagerialRelationships);

  await db.delete(Table__PartnerDistributionFacility);
  await db.delete(Table__PartnerCoverageArea);
  await db.delete(Table__PartnerAssignedPersonnel);
  await db.delete(Table__PartnerDocument);
  await db.delete(Table__PartnerContactPerson);
  await db.delete(Table__PartnerBankDetails);
  await db.delete(Table__PartnerAddress);
  await db.delete(Table__PartnerBusinessDetails);

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

  const hashedPassword = await hashPassword(DEFAULT_PASSWORD);

  const roleDistribution: Record<(typeof USER_ROLE)[number], number> = {
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
  } as const;

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
        role: role as (typeof USER_ROLE)[number],
        status: faker.helpers.arrayElement(USER_STATUS),
        employeeCode: generateEmployeeCode({
          role: role as (typeof USER_ROLE)[number],
          existingEmployeeCount: i + 1,
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
/*                  STATES AND DISTRICTS                    */
/* -------------------------------------------------------- */

async function seedStatesAndDistricts() {
  console.log("🔃 Seeding states and districts...");

  const states = stateDistricts.map((state) => ({
    id: randomId(),
    name: state.name,
  }));

  await db.insert(Table__State).values(states);

  const districts: (typeof Table__District.$inferInsert)[] = [];

  stateDistricts.forEach((state, index) => {
    const stateId = states[index]!.id;

    state.districts.forEach((districtName) => {
      districts.push({
        id: randomId(),
        name: districtName,
        stateId,
      });
    });
  });

  await db.insert(Table__District).values(districts);

  console.log(`✅ ${states.length} states seeded`);
  console.log(`✅ ${districts.length} districts seeded`);
}

/* -------------------------------------------------------- */
/*                  ONROLE USER PROFILES                    */
/* -------------------------------------------------------- */

async function seedEmployeeProfiles() {
  console.log("🔃 Seeding on-role user profiles...");

  const users = await db
    .select({
      id: Table__Users.id,
      role: Table__Users.role,
      phone: Table__Users.phone,
    })
    .from(Table__Users);

  const onroleUsers = users
    .filter((user) => (EMPLOYEE_ROLE as readonly string[]).includes(user.role))
    .slice(0, ONROLE_PROFILE_COUNT);

  const profiles: (typeof Table__EmployeeProfile.$inferInsert)[] =
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
    await db.insert(Table__EmployeeProfile).values(profiles);
  }

  console.log(`✅ ${profiles.length} on-role profiles seeded`);
}

/* -------------------------------------------------------- */
/*               EDUCATIONAL QUALIFICATIONS                 */
/* -------------------------------------------------------- */

async function seedEducationalQualifications() {
  console.log("🔃 Seeding educational qualifications...");

  const profiles = await db
    .select({
      id: Table__EmployeeProfile.id,
    })
    .from(Table__EmployeeProfile);

  const qualificationOptions = [
    "Bachelor of Pharmacy",
    "Master of Pharmacy",
    "Doctor of Pharmacy",
    "Bachelor of Science",
    "Master of Science",
    "Bachelor of Commerce",
    "Master of Business Administration",
    "Bachelor of Business Administration",
    "Diploma in Pharmacy",
    "Higher Secondary",
  ];

  const institutionOptions = [
    "Jadavpur University",
    "University of Calcutta",
    "Bengal College of Pharmaceutical Sciences",
    "Delhi University",
    "Mumbai University",
    "Banaras Hindu University",
    "Anna University",
    "Manipal Academy of Higher Education",
    "Jamia Hamdard",
    "BITS Pilani",
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
    "Certified Pharmaceutical Sales Professional",
    "Pharmaceutical Marketing Certification",
    "Good Manufacturing Practices Certification",
    "Good Distribution Practices Certification",
    "Drug Regulatory Affairs Certification",
    "Medical Representative Training",
    "Pharmacovigilance Certification",
    "Supply Chain Management Certification",
    "Inventory Management Certification",
    "Business Development Certification",
  ];

  const issuerOptions = [
    "Pharmacy Council of India",
    "Indian Pharmaceutical Association",
    "National Institute of Pharmaceutical Education and Research",
    "Institute of Good Manufacturing Practices India",
    "Indian Institute of Management",
    "Central Drugs Standard Control Organisation",
    "Pharmaceutical Management Institute",
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
/*                        EXPERIENCE                        */
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
    "Area Sales Manager",
    "Regional Sales Manager",
    "Territory Sales Manager",
    "Pharmaceutical Sales Executive",
    "Pharmacy Manager",
    "Distribution Manager",
    "Business Development Executive",
    "Marketing Executive",
    "Supply Chain Executive",
    "Operations Manager",
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
/*                    PARTNER PROFILES                      */
/* -------------------------------------------------------- */

async function seedPartnerProfiles() {
  console.log("🔃 Seeding partner profiles...");

  const categories = [
    "PROPRIETORSHIP",
    "PARTNERSHIP",
    "PRIVATE_LIMITED",
    "TRUST_NGO_OTHER",
  ] as const;

  const partners: (typeof Table__PartnerProfile.$inferInsert)[] = partnerNames
    .slice(0, PARTNER_PROFILE_COUNT)
    .map((name) => {
      const category = faker.helpers.arrayElement(categories);

      return {
        id: randomId(),
        name,
        category,
        categoryDetails:
          category === "TRUST_NGO_OTHER"
            ? faker.helpers.arrayElement([
                "Registered healthcare trust",
                "Non-government healthcare organization",
                "Other registered business entity",
              ])
            : null,
        effectiveFrom: faker.date.between({
          from: new Date("2018-01-01"),
          to: new Date(),
        }),
      };
    });

  if (partners.length > 0) {
    await db.insert(Table__PartnerProfile).values(partners);
  }

  console.log(`✅ ${partners.length} partner profiles seeded`);

  return partners;
}

/* -------------------------------------------------------- */
/*                 PARTNER BUSINESS DETAILS                 */
/* -------------------------------------------------------- */

async function seedPartnerBusinessDetails() {
  console.log("🔃 Seeding partner business details...");

  const registeredAddresses = await db
    .select({
      partnerProfileId: Table__PartnerAddress.partnerProfileId,
      stateName: Table__State.name,
    })
    .from(Table__PartnerAddress)
    .innerJoin(
      Table__District,
      eq(Table__PartnerAddress.districtId, Table__District.id),
    )
    .innerJoin(Table__State, eq(Table__District.stateId, Table__State.id))
    .where(eq(Table__PartnerAddress.addressType, "REGISTERED"));

  const stateCodeByPartner = new Map(
    registeredAddresses.map((address) => [
      address.partnerProfileId,
      stateDistricts.find((state) => state.name === address.stateName)?.code ??
        "19",
    ]),
  );

  const partners = await db
    .select({
      id: Table__PartnerProfile.id,
    })
    .from(Table__PartnerProfile);

  const businessDetails: (typeof Table__PartnerBusinessDetails.$inferInsert)[] =
    partners.map((partner) => ({
      partnerProfileId: partner.id,
      gstin: randomGSTIN(stateCodeByPartner.get(partner.id) ?? "19"),
      yearOfEstablishment: randomInt(1995, 2024),
    }));

  if (businessDetails.length > 0) {
    await db.insert(Table__PartnerBusinessDetails).values(businessDetails);
  }

  console.log(`✅ ${businessDetails.length} partner business details seeded`);
}

/* -------------------------------------------------------- */
/*                    PARTNER ADDRESSES                     */
/* -------------------------------------------------------- */

async function seedPartnerAddresses() {
  console.log("🔃 Seeding partner addresses...");

  const partners = await db
    .select({
      id: Table__PartnerProfile.id,
    })
    .from(Table__PartnerProfile);

  const districts = await db
    .select({
      id: Table__District.id,
      name: Table__District.name,
      stateId: Table__District.stateId,
      stateName: Table__State.name,
    })
    .from(Table__District)
    .innerJoin(Table__State, eq(Table__District.stateId, Table__State.id));

  if (districts.length === 0) {
    throw new Error("No districts found. Seed states and districts first.");
  }

  const addresses: (typeof Table__PartnerAddress.$inferInsert)[] = [];

  for (const partner of partners) {
    const registeredDistrict = faker.helpers.arrayElement(districts);
    const correspondenceDistrict = faker.helpers.arrayElement(districts);

    for (const [addressType, district] of [
      ["REGISTERED", registeredDistrict],
      ["CORRESPONDENCE", correspondenceDistrict],
    ] as const) {
      addresses.push({
        partnerProfileId: partner.id,
        addressType,
        address: `${faker.location.streetAddress()}, ${district.name}`,
        postOffice: `${district.name} Post Office`,
        policeStation: `${district.name} Police Station`,
        districtId: district.id,
        pinCode: randomPinCode(),
      });
    }
  }

  if (addresses.length > 0) {
    await db.insert(Table__PartnerAddress).values(addresses);
  }

  console.log(`✅ ${addresses.length} partner addresses seeded`);
}

/* -------------------------------------------------------- */
/*                  PARTNER BANK DETAILS                    */
/* -------------------------------------------------------- */

async function seedPartnerBankDetails() {
  console.log("🔃 Seeding partner bank details...");

  const partners = await db
    .select({
      id: Table__PartnerProfile.id,
    })
    .from(Table__PartnerProfile);

  const bankDetails: (typeof Table__PartnerBankDetails.$inferInsert)[] = [];

  for (const partner of partners) {
    const count = randomInt(1, 2);

    for (let i = 0; i < count; i++) {
      bankDetails.push({
        partnerProfileId: partner.id,
        bankName: faker.helpers.arrayElement(bankNames),
        accountNumber: randomAccountNumber(),
        ifscCode: randomIFSC(),
        branch: `${faker.location.city()} Main Branch`,
        isPrimary: i === 0,
      });
    }
  }

  if (bankDetails.length > 0) {
    await db.insert(Table__PartnerBankDetails).values(bankDetails);
  }

  console.log(`✅ ${bankDetails.length} partner bank details seeded`);
}

/* -------------------------------------------------------- */
/*                 PARTNER CONTACT PERSONS                  */
/* -------------------------------------------------------- */

async function seedPartnerContactPersons() {
  console.log("🔃 Seeding partner contact persons...");

  const partners = await db
    .select({
      id: Table__PartnerProfile.id,
    })
    .from(Table__PartnerProfile);

  const contacts: (typeof Table__PartnerContactPerson.$inferInsert)[] = [];

  for (const partner of partners) {
    const count = randomInt(1, 2);

    for (let i = 0; i < count; i++) {
      const name = faker.person.fullName();

      contacts.push({
        partnerProfileId: partner.id,
        name,
        designation: faker.helpers.arrayElement(contactDesignations),
        email: faker.internet.email(),
        mobileNumber: randomIndianPhone(),
        isPrimary: i === 0,
      });
    }
  }

  if (contacts.length > 0) {
    await db.insert(Table__PartnerContactPerson).values(contacts);
  }

  console.log(`✅ ${contacts.length} partner contact persons seeded`);
}

/* -------------------------------------------------------- */
/*                   PARTNER DOCUMENTS                     */
/* -------------------------------------------------------- */

async function seedPartnerDocuments() {
  console.log("🔃 Seeding partner documents...");

  const partners = await db
    .select({
      id: Table__PartnerProfile.id,
    })
    .from(Table__PartnerProfile);

  const documentTypes = [
    "ID_PROOF",
    "DRUG_LICENSE",
    "GST_CERTIFICATE",
  ] as const;

  const documents: (typeof Table__PartnerDocument.$inferInsert)[] = [];

  for (const partner of partners) {
    for (const documentType of documentTypes) {
      const expiryDate =
        documentType === "DRUG_LICENSE"
          ? new Date(randomDateString(faker.date.future({ years: 3 })))
          : null;

      documents.push({
        partnerProfileId: partner.id,
        documentType,
        documentUrl: randomDocumentUrl(partner.id, documentType),
        documentNumber: randomDocumentNumber(documentType),
        expiryDate,
      });
    }
  }

  if (documents.length > 0) {
    await db.insert(Table__PartnerDocument).values(documents);
  }

  console.log(`✅ ${documents.length} partner documents seeded`);
}

/* -------------------------------------------------------- */
/*              PARTNER ASSIGNED PERSONNEL                  */
/* -------------------------------------------------------- */

async function seedPartnerAssignedPersonnel() {
  console.log("🔃 Seeding partner assigned personnel...");

  const partners = await db
    .select({
      id: Table__PartnerProfile.id,
    })
    .from(Table__PartnerProfile);

  const personnel: (typeof Table__PartnerAssignedPersonnel.$inferInsert)[] = [];

  for (const partner of partners) {
    const count = randomInt(1, 3);

    for (let i = 0; i < count; i++) {
      const name = faker.person.fullName();

      personnel.push({
        partnerProfileId: partner.id,
        name,
        designation: faker.helpers.arrayElement(ubiquePersonnelDesignations),
        mobileNumber: randomIndianPhone(),
        email: faker.internet.email(),
        isPrimary: i === 0,
      });
    }
  }

  if (personnel.length > 0) {
    await db.insert(Table__PartnerAssignedPersonnel).values(personnel);
  }

  console.log(`✅ ${personnel.length} assigned personnel seeded`);
}

/* -------------------------------------------------------- */
/*                  PARTNER COVERAGE AREAS                  */
/* -------------------------------------------------------- */

async function seedPartnerCoverageAreas() {
  console.log("🔃 Seeding partner coverage areas...");

  const partners = await db
    .select({
      id: Table__PartnerProfile.id,
    })
    .from(Table__PartnerProfile);

  const districts = await db
    .select({
      id: Table__District.id,
      name: Table__District.name,
      stateId: Table__State.id,
      stateName: Table__State.name,
    })
    .from(Table__District)
    .innerJoin(Table__State, eq(Table__District.stateId, Table__State.id));

  if (districts.length === 0) {
    throw new Error("No districts found. Seed states and districts first.");
  }

  const coverageAreas: (typeof Table__PartnerCoverageArea.$inferInsert)[] = [];

  for (const partner of partners) {
    const count = randomInt(2, Math.min(5, districts.length));
    const selectedDistricts = faker.helpers.arrayElements(districts, count);

    for (const district of selectedDistricts) {
      coverageAreas.push({
        partnerProfileId: partner.id,
        areaName: district.name,
        districtId: district.id,
        stateId: district.stateId,
      });
    }

    const selectedState = faker.helpers.arrayElement(stateDistricts);

    coverageAreas.push({
      partnerProfileId: partner.id,
      areaName: `${selectedState.name} Regional Coverage`,
      districtId: null,
      stateId: null,
    });
  }

  if (coverageAreas.length > 0) {
    await db.insert(Table__PartnerCoverageArea).values(coverageAreas);
  }

  console.log(`✅ ${coverageAreas.length} partner coverage areas seeded`);
}

/* -------------------------------------------------------- */
/*             PARTNER DISTRIBUTION FACILITIES              */
/* -------------------------------------------------------- */

async function seedPartnerDistributionFacilities() {
  console.log("🔃 Seeding partner distribution facilities...");

  const partners = await db
    .select({
      id: Table__PartnerProfile.id,
    })
    .from(Table__PartnerProfile);

  const districts = await db
    .select({
      id: Table__District.id,
      name: Table__District.name,
    })
    .from(Table__District);

  if (districts.length === 0) {
    throw new Error("No districts found. Seed states and districts first.");
  }

  const facilities: (typeof Table__PartnerDistributionFacility.$inferInsert)[] =
    [];

  for (const partner of partners) {
    const count = randomInt(1, 3);

    for (let i = 0; i < count; i++) {
      const district = faker.helpers.arrayElement(districts);
      const facilityType = faker.helpers.arrayElement(facilityTypes);
      const hasColdStorage =
        facilityType === "COLD_STORAGE" || faker.datatype.boolean();

      facilities.push({
        partnerProfileId: partner.id,
        facilityName: `${faker.company.name()} ${facilityType.replaceAll("_", " ")}`,
        facilityType,
        address: `${faker.location.streetAddress()}, ${district.name}`,
        districtId: district.id,
        pinCode: randomPinCode(),
        storageCapacity: `${randomInt(500, 10000)} ${faker.helpers.arrayElement(["sq. ft.", "sq. m.", "boxes"])}`,
        hasColdStorage,
        details: faker.helpers.arrayElement(facilityDetails),
      });
    }
  }

  if (facilities.length > 0) {
    await db.insert(Table__PartnerDistributionFacility).values(facilities);
  }

  console.log(`✅ ${facilities.length} partner distribution facilities seeded`);
}

/* -------------------------------------------------------- */
/*                  PARTNER SEED ORCHESTRATOR               */
/* -------------------------------------------------------- */

async function seedPartnerData() {
  console.log("🔃 Seeding partner data...");

  await seedPartnerProfiles();
  await seedPartnerAddresses();
  await seedPartnerBusinessDetails();
  await seedPartnerBankDetails();
  await seedPartnerContactPersons();
  await seedPartnerDocuments();
  await seedPartnerAssignedPersonnel();
  await seedPartnerCoverageAreas();
  await seedPartnerDistributionFacilities();

  console.log("✅ Partner data seeding completed");
}

/* -------------------------------------------------------- */
/*                 MANAGERIAL RELATIONSHIPS                 */
/* -------------------------------------------------------- */

async function seedManagerials() {
  console.log("🔃 Seeding reporting managers...");

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

  const usersByRole = new Map<string, typeof users>();

  for (const user of users) {
    const existing = usersByRole.get(user.role) ?? [];
    existing.push(user);
    usersByRole.set(user.role, existing);
  }

  const assignments: {
    managerId: (typeof users)[number]["id"];
    subordinateId: (typeof users)[number]["id"];
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

    const shuffledManagers = faker.helpers.shuffle(managers);

    subordinates.forEach((subordinate, index) => {
      const manager = shuffledManagers[index % shuffledManagers.length];

      if (!manager) return;

      assignments.push({
        managerId: manager.id,
        subordinateId: subordinate.id,
      });
    });
  }

  if (assignments.length > 0) {
    await db.insert(Table__ManagerialRelationships).values(
      assignments.map((assignment) => ({
        managerId: assignment.managerId,
        subordinateId: assignment.subordinateId,
        assignedAt: new Date(),
        effectiveFrom: new Date(),
        effectiveTo: null,
      })),
    );

    for (const assignment of assignments) {
      await db
        .update(Table__Users)
        .set({
          reportingManagerId: assignment.managerId,
        })
        .where(eq(Table__Users.id, assignment.subordinateId));
    }
  }

  console.log(`✅ ${assignments.length} reporting manager assignments seeded`);
}

/* -------------------------------------------------------- */
/*                            MAIN                          */
/* -------------------------------------------------------- */

export async function seed() {
  try {
    console.log("🚀 SEEDING STARTED");

    await clearTables();

    await seedUsers();
    await seedStatesAndDistricts();

    await seedEmployeeProfiles();
    await seedEducationalQualifications();
    await seedProfessionalQualifications();
    await seedExperience();

    await seedPartnerData();

    await seedManagerials();

    console.log("🎉 SEEDING COMPLETED");
    process.exit(0);
  } catch (error) {
    console.error("❌ SEED FAILED", error);
    process.exit(1);
  }
}

seed();
