CREATE TABLE `district` (
	`id` char(10) NOT NULL,
	`name` varchar(150) NOT NULL,
	`state_id` char(10),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'DIST',
	CONSTRAINT `district_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `educational_qualification` (
	`id` char(10) NOT NULL,
	`qualification` varchar(150) NOT NULL,
	`institution` varchar(150) NOT NULL,
	`year` char(4) NOT NULL,
	`associated_profile_id` char(10) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'EDQF',
	CONSTRAINT `educational_qualification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employee_profile` (
	`id` char(10) NOT NULL,
	`date_of_birth` timestamp NOT NULL DEFAULT (now()),
	`joining_date` timestamp NOT NULL DEFAULT (now()),
	`alternate_phone` varchar(30),
	`associated_user_id` char(10) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'EMPR',
	CONSTRAINT `employee_profile_id` PRIMARY KEY(`id`),
	CONSTRAINT `employee_profile_associated_user_id_unique` UNIQUE(`associated_user_id`)
);
--> statement-breakpoint
CREATE TABLE `experience` (
	`id` char(10) NOT NULL,
	`company` varchar(150) NOT NULL,
	`designation` varchar(150) NOT NULL,
	`start_date` varchar(150) NOT NULL,
	`end_date` varchar(150),
	`description` varchar(150),
	`associated_profile_id` char(10) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'EXPR',
	CONSTRAINT `experience_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `managerial_relationships` (
	`id` char(10) NOT NULL,
	`manager_id` char(10) NOT NULL,
	`subordinate_id` char(10) NOT NULL,
	`assigned_at` timestamp NOT NULL,
	`effective_from` timestamp NOT NULL DEFAULT (now()),
	`effective_to` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'MNGR',
	CONSTRAINT `managerial_relationships_id` PRIMARY KEY(`id`),
	CONSTRAINT `managerials_manager_subordinate_unique` UNIQUE(`manager_id`,`subordinate_id`)
);
--> statement-breakpoint
CREATE TABLE `partner_address` (
	`id` char(10) NOT NULL,
	`partner_profile_id` char(10) NOT NULL,
	`address_type` varchar(50) NOT NULL,
	`address` varchar(511) NOT NULL,
	`post_office` varchar(255) NOT NULL,
	`police_station` varchar(255) NOT NULL,
	`district_id` char(10) NOT NULL,
	`pin_code` char(6) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'PADR',
	CONSTRAINT `partner_address_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partner_assigned_personnel` (
	`id` char(10) NOT NULL,
	`partner_profile_id` char(10) NOT NULL,
	`name` varchar(255) NOT NULL,
	`designation` varchar(255),
	`mobile_number` char(10) NOT NULL,
	`email` varchar(255),
	`is_primary` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'PAPR',
	CONSTRAINT `partner_assigned_personnel_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partner_bank_details` (
	`id` char(10) NOT NULL,
	`partner_profile_id` char(10) NOT NULL,
	`bank_name` varchar(255) NOT NULL,
	`account_number` varchar(34) NOT NULL,
	`ifsc_code` char(11) NOT NULL,
	`branch` varchar(255) NOT NULL,
	`is_primary` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'PBKD',
	CONSTRAINT `partner_bank_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partner_business_details` (
	`id` char(10) NOT NULL,
	`partner_profile_id` char(10) NOT NULL,
	`gstin` char(15) NOT NULL,
	`year_of_establishment` smallint NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'PBDT',
	CONSTRAINT `partner_business_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partner_contact_person` (
	`id` char(10) NOT NULL,
	`partner_profile_id` char(10) NOT NULL,
	`name` varchar(255) NOT NULL,
	`designation` varchar(255),
	`email` varchar(255),
	`mobile_number` char(10) NOT NULL,
	`is_primary` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'PCPN',
	CONSTRAINT `partner_contact_person_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partner_coverage_area` (
	`id` char(10) NOT NULL,
	`partner_profile_id` char(10) NOT NULL,
	`area_name` varchar(255) NOT NULL,
	`district_id` char(10),
	`state_id` char(10),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'PCAR',
	CONSTRAINT `partner_coverage_area_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partner_distribution_facility` (
	`id` char(10) NOT NULL,
	`partner_profile_id` char(10) NOT NULL,
	`facility_name` varchar(255) NOT NULL,
	`facility_type` varchar(100) NOT NULL,
	`address` varchar(511) NOT NULL,
	`district_id` char(10),
	`pin_code` char(6),
	`storage_capacity` varchar(100),
	`has_cold_storage` boolean NOT NULL DEFAULT false,
	`details` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'PDFL',
	CONSTRAINT `partner_distribution_facility_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partner_document` (
	`id` char(10) NOT NULL,
	`partner_profile_id` char(10) NOT NULL,
	`document_type` varchar(100) NOT NULL,
	`document_url` varchar(511) NOT NULL,
	`document_number` varchar(100),
	`expiry_date` date,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'PDOC',
	CONSTRAINT `partner_document_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partner_profile` (
	`id` char(10) NOT NULL,
	`name` varchar(255) NOT NULL,
	`category` enum('PROPRIETORSHIP','PARTNERSHIP','PRIVATE_LIMITED','TRUST_NGO_OTHER') NOT NULL,
	`category_details` varchar(511),
	`effective_from` timestamp NOT NULL DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'PTPR',
	CONSTRAINT `partner_profile_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `professional_qualification` (
	`id` char(10) NOT NULL,
	`qualification` varchar(150) NOT NULL,
	`issuer` varchar(150) NOT NULL,
	`year` char(4) NOT NULL,
	`associated_profile_id` char(10) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'PRQF',
	CONSTRAINT `professional_qualification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `state` (
	`id` char(10) NOT NULL,
	`name` varchar(150) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'STAE',
	CONSTRAINT `state_id` PRIMARY KEY(`id`),
	CONSTRAINT `state_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` char(10) NOT NULL,
	`role` enum('STOCKIST','SUB_STOCKIST','DISTRIBUTOR','SUB_DISTRIBUTOR','SUPER_ADMIN','ADMIN','ZSM','RSM','MANAGER','ASM','MR') NOT NULL,
	`name` varchar(150) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`phone` varchar(30) NOT NULL,
	`employee_code` char(11) NOT NULL,
	`status` enum('ACTIVE','INACTIVE','SUSPENDED','UNDER_VERIFICATION','DELETED') NOT NULL DEFAULT 'UNDER_VERIFICATION',
	`profile_picture` varchar(255),
	`last_login_at` timestamp,
	`reporting_manager` char(10),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`table_identifier_token` char(4) NOT NULL DEFAULT 'USER',
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_employee_code_unique` UNIQUE(`employee_code`)
);
--> statement-breakpoint
ALTER TABLE `district` ADD CONSTRAINT `district_state_fk` FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `educational_qualification` ADD CONSTRAINT `educational_qualification_profile_fk` FOREIGN KEY (`associated_profile_id`) REFERENCES `employee_profile`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `employee_profile` ADD CONSTRAINT `onrole_profile_user_fk` FOREIGN KEY (`associated_user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `experience` ADD CONSTRAINT `experience_profile_fk` FOREIGN KEY (`associated_profile_id`) REFERENCES `employee_profile`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `managerial_relationships` ADD CONSTRAINT `managerials_manager_id_users_id_fk` FOREIGN KEY (`manager_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `managerial_relationships` ADD CONSTRAINT `managerials_subordinate_id_users_id_fk` FOREIGN KEY (`subordinate_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `partner_address` ADD CONSTRAINT `partner_address_partner_fk` FOREIGN KEY (`partner_profile_id`) REFERENCES `partner_profile`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `partner_address` ADD CONSTRAINT `partner_address_district_fk` FOREIGN KEY (`district_id`) REFERENCES `district`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `partner_assigned_personnel` ADD CONSTRAINT `partner_assigned_personnel_partner_fk` FOREIGN KEY (`partner_profile_id`) REFERENCES `partner_profile`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `partner_bank_details` ADD CONSTRAINT `partner_bank_details_partner_fk` FOREIGN KEY (`partner_profile_id`) REFERENCES `partner_profile`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `partner_business_details` ADD CONSTRAINT `partner_business_details_partner_fk` FOREIGN KEY (`partner_profile_id`) REFERENCES `partner_profile`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `partner_contact_person` ADD CONSTRAINT `partner_contact_person_partner_fk` FOREIGN KEY (`partner_profile_id`) REFERENCES `partner_profile`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `partner_coverage_area` ADD CONSTRAINT `partner_coverage_area_partner_fk` FOREIGN KEY (`partner_profile_id`) REFERENCES `partner_profile`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `partner_coverage_area` ADD CONSTRAINT `partner_coverage_area_district_fk` FOREIGN KEY (`district_id`) REFERENCES `district`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `partner_coverage_area` ADD CONSTRAINT `partner_coverage_area_state_fk` FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `partner_distribution_facility` ADD CONSTRAINT `partner_distribution_facility_partner_fk` FOREIGN KEY (`partner_profile_id`) REFERENCES `partner_profile`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `partner_distribution_facility` ADD CONSTRAINT `partner_distribution_facility_district_fk` FOREIGN KEY (`district_id`) REFERENCES `district`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `partner_document` ADD CONSTRAINT `partner_document_partner_fk` FOREIGN KEY (`partner_profile_id`) REFERENCES `partner_profile`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `professional_qualification` ADD CONSTRAINT `professional_qualification_profile_fk` FOREIGN KEY (`associated_profile_id`) REFERENCES `employee_profile`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_reporting_manager_users_id_fk` FOREIGN KEY (`reporting_manager`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE cascade;