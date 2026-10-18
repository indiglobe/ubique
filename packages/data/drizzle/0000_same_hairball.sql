CREATE TABLE `users` (
	`id` char(10) NOT NULL,
	`organization_id` char(10),
	`role` enum('SUPER_ADMIN','ADMIN','ZSM','RSM','MANAGER','ASM','MR','STOCKIST','DISTRIBUTOR') NOT NULL,
	`name` varchar(150) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`phone` varchar(30) NOT NULL,
	`employee_code` char(16) NOT NULL,
	`status` enum('ACTIVE','INACTIVE','SUSPENDED','UNDER_VERIFICATION') NOT NULL DEFAULT 'UNDER_VERIFICATION',
	`avatar_url` text,
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
ALTER TABLE `users` ADD CONSTRAINT `users_referrer_id_users_id_fk` FOREIGN KEY (`referrer_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX `users_employee_code_idx` ON `users` (`organization_id`,`employee_code`);