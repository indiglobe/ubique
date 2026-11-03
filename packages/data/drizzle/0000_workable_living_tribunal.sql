CREATE TABLE `educational_qualification` (
	`id` char(10) NOT NULL,
	`qualification` varchar(150) NOT NULL,
	`institution` varchar(150) NOT NULL,
	`year` char(4) NOT NULL,
	`assciated_profile` char(10) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`table_identifier_token` char(4),
	CONSTRAINT `educational_qualification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `experience` (
	`id` char(10) NOT NULL,
	`company` varchar(150) NOT NULL,
	`designation` varchar(150) NOT NULL,
	`start_date` varchar(150) NOT NULL,
	`end_date` varchar(150),
	`description` varchar(150),
	`assciated_profile` char(10) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`table_identifier_token` char(4),
	CONSTRAINT `experience_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `offrole_user_profile` (
	`id` char(10) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`table_identifier_token` char(4),
	CONSTRAINT `offrole_user_profile_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `onrole_user_profile` (
	`id` char(10) NOT NULL,
	`date_of_birth` timestamp NOT NULL DEFAULT (now()),
	`joining_date` timestamp NOT NULL DEFAULT (now()),
	`alternate_phone` varchar(30),
	`associated_user_id` char(10) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`table_identifier_token` char(4),
	CONSTRAINT `onrole_user_profile_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `professional_qualification` (
	`id` char(10) NOT NULL,
	`qualification` varchar(150) NOT NULL,
	`issuer` varchar(150) NOT NULL,
	`year` char(4) NOT NULL,
	`assciated_profile` char(10) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`table_identifier_token` char(4),
	CONSTRAINT `professional_qualification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` char(10) NOT NULL,
	`organization_id` char(10),
	`role` enum('STOCKIST','SUB_STOCKIST','DISTRIBUTOR','SUB_DISTRIBUTOR','SUPER_ADMIN','ADMIN','ZSM','RSM','MANAGER','ASM','MR') NOT NULL,
	`name` varchar(150) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`phone` varchar(30) NOT NULL,
	`employee_code` char(16) NOT NULL,
	`status` enum('ACTIVE','INACTIVE','SUSPENDED','UNDER_VERIFICATION') NOT NULL DEFAULT 'UNDER_VERIFICATION',
	`profile_picture` varchar(255),
	`last_login_at` timestamp,
	`referrer_id` char(10),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`table_identifier_token` char(4),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_employee_code_unique` UNIQUE(`employee_code`)
);
--> statement-breakpoint
ALTER TABLE `educational_qualification` ADD CONSTRAINT `educational_qualification_profile_fk` FOREIGN KEY (`assciated_profile`) REFERENCES `onrole_user_profile`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `experience` ADD CONSTRAINT `experience_profile_fk` FOREIGN KEY (`assciated_profile`) REFERENCES `onrole_user_profile`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `onrole_user_profile` ADD CONSTRAINT `onrole_profile_user_fk` FOREIGN KEY (`associated_user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `professional_qualification` ADD CONSTRAINT `professional_qualification_profile_fk` FOREIGN KEY (`assciated_profile`) REFERENCES `onrole_user_profile`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_referrer_id_users_id_fk` FOREIGN KEY (`referrer_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX `users_employee_code_idx` ON `users` (`organization_id`,`employee_code`);