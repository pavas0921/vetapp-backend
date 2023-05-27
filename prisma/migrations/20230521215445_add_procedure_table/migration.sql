-- CreateTable
CREATE TABLE `history` (
    `idhistory` INTEGER NOT NULL AUTO_INCREMENT,
    `idpet` INTEGER NOT NULL,

    UNIQUE INDEX `idhistory_UNIQUE`(`idhistory`),
    INDEX `fk_history_pet`(`idpet`),
    PRIMARY KEY (`idhistory`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `person` (
    `idperson` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `identification` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `image` VARCHAR(255) NULL,
    `status` BIT(1) NOT NULL,
    `idrol` INTEGER NOT NULL,

    UNIQUE INDEX `idperson_UNIQUE`(`idperson`),
    UNIQUE INDEX `identification_UNIQUE`(`identification`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `fk_person_rol`(`idrol`),
    PRIMARY KEY (`idperson`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pet` (
    `idpet` INTEGER NOT NULL AUTO_INCREMENT,
    `pet_name` VARCHAR(45) NOT NULL,
    `pet_color` VARCHAR(45) NOT NULL,
    `pet_age` INTEGER NOT NULL,
    `pet_race` VARCHAR(45) NOT NULL,
    `pet_specie` VARCHAR(45) NOT NULL,
    `pet_weight` DECIMAL(10, 0) NOT NULL,
    `pet_image` VARCHAR(255) NOT NULL,
    `pet_status` INTEGER NOT NULL,
    `idperson` INTEGER NULL,

    INDEX `fk_pet_person`(`idperson`),
    PRIMARY KEY (`idpet`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procedure` (
    `idprocedure` INTEGER NOT NULL AUTO_INCREMENT,
    `procedure_title` VARCHAR(100) NOT NULL,
    `procedure_detail` VARCHAR(255) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `attached` VARCHAR(255) NULL,
    `idperson` INTEGER NOT NULL,
    `idprocedure_type` INTEGER NOT NULL,
    `idhistory` INTEGER NOT NULL,

    INDEX `fk_procedure_history`(`idhistory`),
    INDEX `fk_procedure_person`(`idperson`),
    INDEX `fk_procedure_procedure_type`(`idprocedure_type`),
    PRIMARY KEY (`idprocedure`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procedure_type` (
    `idprocedure_type` INTEGER NOT NULL AUTO_INCREMENT,
    `procedure_name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idprocedure_type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rol` (
    `idrol` INTEGER NOT NULL AUTO_INCREMENT,
    `rol_name` VARCHAR(50) NOT NULL,
    `rol_description` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idrol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `history` ADD CONSTRAINT `fk_history_pet` FOREIGN KEY (`idpet`) REFERENCES `pet`(`idpet`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `person` ADD CONSTRAINT `fk_person_rol` FOREIGN KEY (`idrol`) REFERENCES `rol`(`idrol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pet` ADD CONSTRAINT `fk_pet_person` FOREIGN KEY (`idperson`) REFERENCES `person`(`idperson`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `procedure` ADD CONSTRAINT `fk_procedure_history` FOREIGN KEY (`idhistory`) REFERENCES `history`(`idhistory`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `procedure` ADD CONSTRAINT `fk_procedure_person` FOREIGN KEY (`idperson`) REFERENCES `person`(`idperson`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `procedure` ADD CONSTRAINT `fk_procedure_procedure_type` FOREIGN KEY (`idprocedure_type`) REFERENCES `procedure_type`(`idprocedure_type`) ON DELETE NO ACTION ON UPDATE NO ACTION;
