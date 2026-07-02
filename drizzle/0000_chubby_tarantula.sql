CREATE TABLE `anggota` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama` varchar(120) NOT NULL,
	`npm` varchar(20) NOT NULL,
	`email` varchar(120) NOT NULL,
	`password` varchar(255) NOT NULL,
	`proker_id` int NOT NULL,
	CONSTRAINT `anggota_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `divisi` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama` varchar(100) NOT NULL,
	`keterangan` varchar(255),
	CONSTRAINT `divisi_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(255) NOT NULL,
	`divisi_id` int,
	`role` enum('Admin','Anggota Inti') NOT NULL DEFAULT 'Anggota Inti',
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `proker` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama` varchar(120) NOT NULL,
	`deskripsi` varchar(255) NOT NULL,
	`lokasi` varchar(120) NOT NULL,
	`tanggal` date NOT NULL,
	CONSTRAINT `proker_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `anggota` ADD CONSTRAINT `anggota_proker_id_proker_id_fk` FOREIGN KEY (`proker_id`) REFERENCES `proker`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_divisi_id_divisi_id_fk` FOREIGN KEY (`divisi_id`) REFERENCES `divisi`(`id`) ON DELETE no action ON UPDATE no action;