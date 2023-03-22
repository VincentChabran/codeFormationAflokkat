"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1651325902955 = void 0;
class InitialMigration1651325902955 {
    constructor() {
        this.name = "InitialMigration1651325902955";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message\` text NOT NULL, \`auteurId\` int NOT NULL, \`reclamationId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`notification\` varchar(255) NOT NULL, \`reclamationId\` int NOT NULL, \`utilisateurId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rapport\` (\`id\` int NOT NULL AUTO_INCREMENT, \`clientImmobilise\` tinyint NOT NULL, \`clientImmobiliseRaison\` varchar(255) NULL, \`dureeImmobilisation\` varchar(255) NULL, \`gesteCommercial\` tinyint NOT NULL, \`geste\` varchar(255) NULL, \`montantGeste\` int NULL, \`sinistre\` tinyint NOT NULL, \`natureSinistre\` varchar(255) NULL, \`rapport\` text NULL, \`auteurId\` int NOT NULL, \`reclamationId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`utilisateur\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nom\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`base\` (\`id\` int NOT NULL AUTO_INCREMENT, \`zone\` int NOT NULL, \`nom\` varchar(255) NOT NULL, \`adresse\` varchar(255) NOT NULL, \`chef\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`tel\` varchar(255) NOT NULL, \`responsableId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservation_bis\` (\`id\` int NOT NULL AUTO_INCREMENT, \`datecreation\` varchar(255) NOT NULL, \`datedepart\` varchar(255) NOT NULL, \`datearrivee\` varchar(255) NOT NULL, \`prix\` int NOT NULL, \`nomclient\` varchar(255) NOT NULL, \`numclient\` int NOT NULL, \`bateau\` varchar(255) NOT NULL, \`basedepart\` int NOT NULL, \`basearrivee\` int NOT NULL, \`nombasedepart\` varchar(255) NOT NULL, \`nombasearrivee\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nom\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`tel\` varchar(255) NULL, \`portable\` varchar(255) NULL, \`adresse\` varchar(255) NULL, \`codepostal\` varchar(255) NULL, \`ville\` varchar(255) NULL, \`pays\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`database_file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`filename\` varchar(255) NOT NULL, \`reclamationId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`proposition\` (\`id\` int NOT NULL AUTO_INCREMENT, \`geste\` varchar(255) NOT NULL, \`statut\` varchar(255) NOT NULL, \`commentaire\` varchar(255) NULL, \`reclamationId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`questionnaire\` (\`id\` int NOT NULL AUTO_INCREMENT, \`numreservation\` int NOT NULL, \`booking_online_simplicity\` int NULL, \`booking_online_information\` int NULL, \`booking_commercial_reception\` int NULL, \`booking_commercial_response_time\` int NULL, \`booking_commercial_information\` int NULL, \`stay_reception_boarding\` int NULL, \`stay_reception_landing\` int NULL, \`stay_reception_stopover\` int NULL, \`boat_comfort\` int NULL, \`boat_cleanliness\` int NULL, \`boat_equipment\` int NULL, \`instruction_clear\` int NULL, \`instruction_suitable\` int NULL, \`instruction_sufficient\` int NULL, \`technical_service_available\` int NULL, \`technical_service_timeliness\` int NULL, \`technical_service_relational\` int NULL, \`general_appreciation_stay\` int NULL, \`recommend_us\` int NULL, \`comments\` text NULL, \`numclient\` int NOT NULL, \`nomclient\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`tel\` varchar(255) NULL, \`portable\` varchar(255) NULL, \`adresse\` varchar(255) NULL, \`codepostal\` varchar(255) NULL, \`ville\` varchar(255) NULL, \`pays\` varchar(255) NULL, \`prix\` int NOT NULL, \`bateau\` varchar(255) NOT NULL, \`basedepart\` int NOT NULL, \`basearrivee\` int NOT NULL, \`nombasedepart\` varchar(255) NOT NULL, \`nombasearrivee\` varchar(255) NOT NULL, \`datedepart\` varchar(255) NOT NULL, \`datearrivee\` varchar(255) NOT NULL, \`date\` varchar(255) NOT NULL, \`statut\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`prix\` int NOT NULL, \`bateau\` varchar(255) NOT NULL, \`basedepart\` int NOT NULL, \`basearrivee\` int NOT NULL, \`nombasedepart\` varchar(255) NOT NULL, \`nombasearrivee\` varchar(255) NOT NULL, \`datedepart\` varchar(255) NOT NULL, \`datearrivee\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reclamation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`reclamation\` text NOT NULL, \`statut\` varchar(255) NOT NULL DEFAULT 'Nouvellement créée', \`geste\` varchar(255) NULL, \`clientId\` int NOT NULL, \`responsableId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`reservationId\` int NULL, \`questionnaireId\` int NULL, UNIQUE INDEX \`REL_02622504de0e8f8f022ef8a864\` (\`reservationId\`), UNIQUE INDEX \`REL_11d611b4421720640e75839e36\` (\`questionnaireId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`log\` varchar(255) NOT NULL, \`reclamationId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mail_template\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nom\` varchar(255) NOT NULL, \`fr\` text NOT NULL, \`en\` text NOT NULL, \`de\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`utilisateur_participe_reclamation\` (\`utilisateurId\` int NOT NULL, \`reclamationId\` int NOT NULL, INDEX \`IDX_7cf507cf191405b11dd989f968\` (\`utilisateurId\`), INDEX \`IDX_77ad84ca8b57c54935b7170d2d\` (\`reclamationId\`), PRIMARY KEY (\`utilisateurId\`, \`reclamationId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`base_reclamations_reclamation\` (\`baseId\` int NOT NULL, \`reclamationId\` int NOT NULL, INDEX \`IDX_c9eefcc7b5abfc46d3c4b62f04\` (\`baseId\`), INDEX \`IDX_469211a6857b7b4fc0bff62108\` (\`reclamationId\`), PRIMARY KEY (\`baseId\`, \`reclamationId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_0ffe69d127a15fb5cb7743760d1\` FOREIGN KEY (\`auteurId\`) REFERENCES \`utilisateur\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_d13c35bb4ff5893618a66b3ede8\` FOREIGN KEY (\`reclamationId\`) REFERENCES \`reclamation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_10dcdaaa7d269f85167f396e2be\` FOREIGN KEY (\`reclamationId\`) REFERENCES \`reclamation\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_ac61e666e88b50fd8d8b1a336bd\` FOREIGN KEY (\`utilisateurId\`) REFERENCES \`utilisateur\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rapport\` ADD CONSTRAINT \`FK_766af243d81d93711edcee334bb\` FOREIGN KEY (\`auteurId\`) REFERENCES \`utilisateur\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rapport\` ADD CONSTRAINT \`FK_a460f4ca8c242b55898018980c2\` FOREIGN KEY (\`reclamationId\`) REFERENCES \`reclamation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`base\` ADD CONSTRAINT \`FK_cfe82a0df27884d1946e28d869e\` FOREIGN KEY (\`responsableId\`) REFERENCES \`utilisateur\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`database_file\` ADD CONSTRAINT \`FK_0bf197a8cb1b9d8fbfc8914f1dc\` FOREIGN KEY (\`reclamationId\`) REFERENCES \`reclamation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`proposition\` ADD CONSTRAINT \`FK_6bb0eebc3852c6c0c00c519dbcc\` FOREIGN KEY (\`reclamationId\`) REFERENCES \`reclamation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reclamation\` ADD CONSTRAINT \`FK_9d94bccc2a5465050de2eef7fd0\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reclamation\` ADD CONSTRAINT \`FK_bd8a769f3400fd0acec55713130\` FOREIGN KEY (\`responsableId\`) REFERENCES \`utilisateur\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reclamation\` ADD CONSTRAINT \`FK_02622504de0e8f8f022ef8a8649\` FOREIGN KEY (\`reservationId\`) REFERENCES \`reservation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reclamation\` ADD CONSTRAINT \`FK_11d611b4421720640e75839e36b\` FOREIGN KEY (\`questionnaireId\`) REFERENCES \`questionnaire\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`log\` ADD CONSTRAINT \`FK_db5a75997d685a8e5757cb5d23d\` FOREIGN KEY (\`reclamationId\`) REFERENCES \`reclamation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`utilisateur_participe_reclamation\` ADD CONSTRAINT \`FK_7cf507cf191405b11dd989f9684\` FOREIGN KEY (\`utilisateurId\`) REFERENCES \`utilisateur\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`utilisateur_participe_reclamation\` ADD CONSTRAINT \`FK_77ad84ca8b57c54935b7170d2dc\` FOREIGN KEY (\`reclamationId\`) REFERENCES \`reclamation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`base_reclamations_reclamation\` ADD CONSTRAINT \`FK_c9eefcc7b5abfc46d3c4b62f041\` FOREIGN KEY (\`baseId\`) REFERENCES \`base\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`base_reclamations_reclamation\` ADD CONSTRAINT \`FK_469211a6857b7b4fc0bff62108d\` FOREIGN KEY (\`reclamationId\`) REFERENCES \`reclamation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`base_reclamations_reclamation\` DROP FOREIGN KEY \`FK_469211a6857b7b4fc0bff62108d\``);
        await queryRunner.query(`ALTER TABLE \`base_reclamations_reclamation\` DROP FOREIGN KEY \`FK_c9eefcc7b5abfc46d3c4b62f041\``);
        await queryRunner.query(`ALTER TABLE \`utilisateur_participe_reclamation\` DROP FOREIGN KEY \`FK_77ad84ca8b57c54935b7170d2dc\``);
        await queryRunner.query(`ALTER TABLE \`utilisateur_participe_reclamation\` DROP FOREIGN KEY \`FK_7cf507cf191405b11dd989f9684\``);
        await queryRunner.query(`ALTER TABLE \`log\` DROP FOREIGN KEY \`FK_db5a75997d685a8e5757cb5d23d\``);
        await queryRunner.query(`ALTER TABLE \`reclamation\` DROP FOREIGN KEY \`FK_11d611b4421720640e75839e36b\``);
        await queryRunner.query(`ALTER TABLE \`reclamation\` DROP FOREIGN KEY \`FK_02622504de0e8f8f022ef8a8649\``);
        await queryRunner.query(`ALTER TABLE \`reclamation\` DROP FOREIGN KEY \`FK_bd8a769f3400fd0acec55713130\``);
        await queryRunner.query(`ALTER TABLE \`reclamation\` DROP FOREIGN KEY \`FK_9d94bccc2a5465050de2eef7fd0\``);
        await queryRunner.query(`ALTER TABLE \`proposition\` DROP FOREIGN KEY \`FK_6bb0eebc3852c6c0c00c519dbcc\``);
        await queryRunner.query(`ALTER TABLE \`database_file\` DROP FOREIGN KEY \`FK_0bf197a8cb1b9d8fbfc8914f1dc\``);
        await queryRunner.query(`ALTER TABLE \`base\` DROP FOREIGN KEY \`FK_cfe82a0df27884d1946e28d869e\``);
        await queryRunner.query(`ALTER TABLE \`rapport\` DROP FOREIGN KEY \`FK_a460f4ca8c242b55898018980c2\``);
        await queryRunner.query(`ALTER TABLE \`rapport\` DROP FOREIGN KEY \`FK_766af243d81d93711edcee334bb\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_ac61e666e88b50fd8d8b1a336bd\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_10dcdaaa7d269f85167f396e2be\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_d13c35bb4ff5893618a66b3ede8\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_0ffe69d127a15fb5cb7743760d1\``);
        await queryRunner.query(`DROP INDEX \`IDX_469211a6857b7b4fc0bff62108\` ON \`base_reclamations_reclamation\``);
        await queryRunner.query(`DROP INDEX \`IDX_c9eefcc7b5abfc46d3c4b62f04\` ON \`base_reclamations_reclamation\``);
        await queryRunner.query(`DROP TABLE \`base_reclamations_reclamation\``);
        await queryRunner.query(`DROP INDEX \`IDX_77ad84ca8b57c54935b7170d2d\` ON \`utilisateur_participe_reclamation\``);
        await queryRunner.query(`DROP INDEX \`IDX_7cf507cf191405b11dd989f968\` ON \`utilisateur_participe_reclamation\``);
        await queryRunner.query(`DROP TABLE \`utilisateur_participe_reclamation\``);
        await queryRunner.query(`DROP TABLE \`mail_template\``);
        await queryRunner.query(`DROP TABLE \`log\``);
        await queryRunner.query(`DROP INDEX \`REL_11d611b4421720640e75839e36\` ON \`reclamation\``);
        await queryRunner.query(`DROP INDEX \`REL_02622504de0e8f8f022ef8a864\` ON \`reclamation\``);
        await queryRunner.query(`DROP TABLE \`reclamation\``);
        await queryRunner.query(`DROP TABLE \`reservation\``);
        await queryRunner.query(`DROP TABLE \`questionnaire\``);
        await queryRunner.query(`DROP TABLE \`proposition\``);
        await queryRunner.query(`DROP TABLE \`database_file\``);
        await queryRunner.query(`DROP TABLE \`client\``);
        await queryRunner.query(`DROP TABLE \`reservation_bis\``);
        await queryRunner.query(`DROP TABLE \`base\``);
        await queryRunner.query(`DROP TABLE \`utilisateur\``);
        await queryRunner.query(`DROP TABLE \`rapport\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
        await queryRunner.query(`DROP TABLE \`message\``);
    }
}
exports.InitialMigration1651325902955 = InitialMigration1651325902955;
//# sourceMappingURL=1651325902955-InitialMigration.js.map