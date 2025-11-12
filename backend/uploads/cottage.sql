-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema cottage
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cottage
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cottage` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `cottage` ;

-- -----------------------------------------------------
-- Table `cottage`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cottage`.`users` (
  `username` VARCHAR(45) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NOT NULL,
  `password` VARCHAR(255) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NOT NULL,
  `firstname` VARCHAR(45) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NOT NULL,
  `lastname` VARCHAR(45) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NOT NULL,
  `gender` CHAR(1) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NOT NULL,
  `address` VARCHAR(45) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NULL DEFAULT NULL,
  `phone` VARCHAR(16) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NULL DEFAULT NULL,
  `email` VARCHAR(50) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NOT NULL,
  `prof_img` VARCHAR(255) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NULL DEFAULT NULL,
  `type` VARCHAR(45) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NOT NULL,
  `card` VARCHAR(16) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NULL DEFAULT NULL,
  `status` VARCHAR(20) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NOT NULL,
  `oldUsername` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`username`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf16
COLLATE = utf16_bin;


-- -----------------------------------------------------
-- Table `cottage`.`cottages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cottage`.`cottages` (
  `idC` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NOT NULL,
  `location` VARCHAR(45) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NOT NULL,
  `owner` VARCHAR(45) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NOT NULL,
  `rating` FLOAT NOT NULL,
  `phone` VARCHAR(16) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NOT NULL,
  `x` FLOAT NOT NULL,
  `y` FLOAT NULL DEFAULT NULL,
  `baned` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`idC`),
  INDEX `owner` (`owner` ASC) VISIBLE,
  CONSTRAINT `cottages_ibfk_1`
    FOREIGN KEY (`owner`)
    REFERENCES `cottage`.`users` (`username`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf16
COLLATE = utf16_bin;


-- -----------------------------------------------------
-- Table `cottage`.`bookings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cottage`.`bookings` (
  `idRes` INT NOT NULL AUTO_INCREMENT,
  `startDate` DATETIME NOT NULL,
  `endDate` DATETIME NOT NULL,
  `cottage` INT NOT NULL,
  `user` VARCHAR(55) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NOT NULL,
  `request` VARCHAR(500) NULL DEFAULT NULL,
  `status` VARCHAR(45) NOT NULL,
  `comment` VARCHAR(500) NULL DEFAULT NULL,
  `cottage_name` VARCHAR(45) NOT NULL,
  `created` DATETIME NOT NULL,
  PRIMARY KEY (`idRes`),
  INDEX `cottage` (`cottage` ASC) VISIBLE,
  INDEX `user` (`user` ASC) VISIBLE,
  CONSTRAINT `bookings_ibfk_1`
    FOREIGN KEY (`cottage`)
    REFERENCES `cottage`.`cottages` (`idC`),
  CONSTRAINT `bookings_ibfk_2`
    FOREIGN KEY (`user`)
    REFERENCES `cottage`.`users` (`username`))
ENGINE = InnoDB
AUTO_INCREMENT = 26
DEFAULT CHARACTER SET = utf16
COLLATE = utf16_bin;


-- -----------------------------------------------------
-- Table `cottage`.`prices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cottage`.`prices` (
  `idP` INT NOT NULL AUTO_INCREMENT,
  `cottage` INT NOT NULL,
  `period` VARCHAR(55) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NOT NULL,
  `price` INT NOT NULL,
  PRIMARY KEY (`idP`),
  INDEX `cottage` (`cottage` ASC) VISIBLE,
  CONSTRAINT `prices_ibfk_1`
    FOREIGN KEY (`cottage`)
    REFERENCES `cottage`.`cottages` (`idC`))
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf16
COLLATE = utf16_bin;


-- -----------------------------------------------------
-- Table `cottage`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cottage`.`reviews` (
  `idR` INT NOT NULL AUTO_INCREMENT,
  `cottage` INT NOT NULL,
  `comment` VARCHAR(255) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NULL DEFAULT NULL,
  `rating` FLOAT NULL DEFAULT NULL,
  `user` VARCHAR(45) NOT NULL,
  `booking` INT NOT NULL,
  PRIMARY KEY (`idR`),
  INDEX `cottage` (`cottage` ASC) VISIBLE,
  INDEX `reviews_ibfk_2` (`user` ASC) VISIBLE,
  INDEX `reviews_ibfk_3` (`booking` ASC) VISIBLE,
  CONSTRAINT `reviews_ibfk_1`
    FOREIGN KEY (`cottage`)
    REFERENCES `cottage`.`cottages` (`idC`),
  CONSTRAINT `reviews_ibfk_2`
    FOREIGN KEY (`user`)
    REFERENCES `cottage`.`users` (`username`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `reviews_ibfk_3`
    FOREIGN KEY (`booking`)
    REFERENCES `cottage`.`bookings` (`idRes`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf16
COLLATE = utf16_bin;


-- -----------------------------------------------------
-- Table `cottage`.`services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cottage`.`services` (
  `idS` INT NOT NULL AUTO_INCREMENT,
  `cottage` INT NOT NULL,
  `name` VARCHAR(100) CHARACTER SET 'utf16' COLLATE 'utf16_bin' NOT NULL,
  PRIMARY KEY (`idS`),
  INDEX `cottage` (`cottage` ASC) VISIBLE,
  CONSTRAINT `services_ibfk_1`
    FOREIGN KEY (`cottage`)
    REFERENCES `cottage`.`cottages` (`idC`))
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf16
COLLATE = utf16_bin;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
