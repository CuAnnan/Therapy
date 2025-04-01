-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Client` (
  `idClient` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `email` TEXT NOT NULL,
  `phoneNumber` VARCHAR(25) NOT NULL,
  `sessionFrequency` ENUM("WEEKLY", "MONTHLY") NOT NULL DEFAULT 'MONTHLY',
  PRIMARY KEY (`idClient`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Therapist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Therapist` (
  `idTherapist` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `yearsOfPractice` INT NOT NULL,
  `availability` TINYINT NOT NULL DEFAULT 1,
  `email` TEXT NOT NULL,
  `phoneNumber` VARCHAR(32) NOT NULL,
  `location` TEXT NOT NULL,
  PRIMARY KEY (`idTherapist`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Session` (
  `idSession` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `length` TINYINT NOT NULL,
  `idClient` INT NOT NULL,
  `idTherapist` INT NOT NULL,
  PRIMARY KEY (`idSession`),
  INDEX `fk_Session_Client_idx` (`idClient` ASC) INVISIBLE,
  INDEX `fk_Session_Therapist1_idx` (`idTherapist` ASC) VISIBLE,
  CONSTRAINT `fk_Session_Client`
    FOREIGN KEY (`idClient`)
    REFERENCES `mydb`.`Client` (`idClient`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Session_Therapist1`
    FOREIGN KEY (`idTherapist`)
    REFERENCES `mydb`.`Therapist` (`idTherapist`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SessionNote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`SessionNote` (
  `idSessionNote` INT NOT NULL AUTO_INCREMENT,
  `idSession` INT NOT NULL,
  `note` TEXT NOT NULL,
  PRIMARY KEY (`idSessionNote`),
  INDEX `fk_SessionNote_Session1_idx` (`idSession` ASC) VISIBLE,
  CONSTRAINT `fk_SessionNote_Session1`
    FOREIGN KEY (`idSession`)
    REFERENCES `mydb`.`Session` (`idSession`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
