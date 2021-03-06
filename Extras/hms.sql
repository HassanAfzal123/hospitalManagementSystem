-- MySQL Script generated by MySQL Workbench
-- Sun 02 Dec 2018 11:54:17 PM PKT
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema HMS_ERD
-- -----------------------------------------------------
-- "Hospital Management System ERD"
DROP SCHEMA IF EXISTS `HMS_ERD` ;

-- -----------------------------------------------------
-- Schema HMS_ERD
--
-- "Hospital Management System ERD"
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `HMS_ERD` DEFAULT CHARACTER SET utf8 ;
USE `HMS_ERD` ;

-- -----------------------------------------------------
-- Table `HMS_ERD`.`USER_ROLE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`USER_ROLE` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`USER_ROLE` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `role_id_UNIQUE` (`role_id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`USER_INFO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`USER_INFO` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`USER_INFO` (
  `info_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `USER_ROLE_role_id` INT NOT NULL,
  `isDeleted` TINYINT(1) NULL,
  PRIMARY KEY (`info_id`),
  UNIQUE INDEX `info_id_UNIQUE` (`info_id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_USER_INFO_USER_ROLE1_idx` (`USER_ROLE_role_id` ASC),
  CONSTRAINT `fk_USER_INFO_USER_ROLE1`
    FOREIGN KEY (`USER_ROLE_role_id`)
    REFERENCES `HMS_ERD`.`USER_ROLE` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`PATIENT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`PATIENT` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`PATIENT` (
  `patient_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `cell_no` VARCHAR(13) NOT NULL,
  `gender` CHAR(1) NOT NULL,
  `USER_INFO_info_id` INT NOT NULL,
  PRIMARY KEY (`patient_id`),
  UNIQUE INDEX `patient_id_UNIQUE` (`patient_id` ASC),
  INDEX `fk_PATIENT_USER_INFO_idx` (`USER_INFO_info_id` ASC),
  CONSTRAINT `fk_PATIENT_USER_INFO`
    FOREIGN KEY (`USER_INFO_info_id`)
    REFERENCES `HMS_ERD`.`USER_INFO` (`info_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`STAFF`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`STAFF` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`STAFF` (
  `staff_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `cell_no` VARCHAR(45) NOT NULL,
  `cnic_no` VARCHAR(45) NOT NULL,
  `gender` CHAR(1) NOT NULL,
  `USER_INFO_info_id` INT NOT NULL,
  `isDeleted` TINYINT(1) NULL,
  PRIMARY KEY (`staff_id`),
  UNIQUE INDEX `cell_no_UNIQUE` (`cell_no` ASC),
  UNIQUE INDEX `cnic_no_UNIQUE` (`cnic_no` ASC),
  UNIQUE INDEX `staff_id_UNIQUE` (`staff_id` ASC),
  INDEX `fk_STAFF_USER_INFO1_idx` (`USER_INFO_info_id` ASC),
  CONSTRAINT `fk_STAFF_USER_INFO1`
    FOREIGN KEY (`USER_INFO_info_id`)
    REFERENCES `HMS_ERD`.`USER_INFO` (`info_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`ADMIN`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`ADMIN` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`ADMIN` (
  `admin_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `cell_no` VARCHAR(13) NOT NULL,
  `cnic_no` VARCHAR(45) NOT NULL,
  `gender` CHAR(1) NOT NULL,
  `USER_INFO_info_id` INT NOT NULL,
  `isDeleted` TINYINT(1) NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE INDEX `cnic_no_UNIQUE` (`cnic_no` ASC),
  UNIQUE INDEX `cell_no_UNIQUE` (`cell_no` ASC),
  UNIQUE INDEX `admin_id_UNIQUE` (`admin_id` ASC),
  INDEX `fk_ADMIN_USER_INFO1_idx` (`USER_INFO_info_id` ASC),
  CONSTRAINT `fk_ADMIN_USER_INFO1`
    FOREIGN KEY (`USER_INFO_info_id`)
    REFERENCES `HMS_ERD`.`USER_INFO` (`info_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`DOCTOR`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`DOCTOR` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`DOCTOR` (
  `doctor_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `cell_no` VARCHAR(45) NOT NULL,
  `cnic_no` VARCHAR(15) NOT NULL,
  `gender` CHAR(1) NOT NULL,
  `isDeleted` TINYINT(1) NULL,
  PRIMARY KEY (`doctor_id`),
  UNIQUE INDEX `cnic_no_UNIQUE` (`cnic_no` ASC),
  UNIQUE INDEX `cell_no_UNIQUE` (`cell_no` ASC),
  UNIQUE INDEX `doctor_id_UNIQUE` (`doctor_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`LOCATION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`LOCATION` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`LOCATION` (
  `location_id` INT NOT NULL AUTO_INCREMENT,
  `longitude` DOUBLE NOT NULL,
  `latitude` VARCHAR(45) NOT NULL,
  `physical_address` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`location_id`),
  UNIQUE INDEX `location_id_UNIQUE` (`location_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`DISEASE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`DISEASE` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`DISEASE` (
  `disease_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `details` VARCHAR(255) NOT NULL,
  `symptoms` VARCHAR(250) NULL,
  PRIMARY KEY (`disease_id`),
  UNIQUE INDEX `disease_id_UNIQUE` (`disease_id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`MEDICINE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`MEDICINE` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`MEDICINE` (
  `medicine_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `company` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`medicine_id`),
  UNIQUE INDEX `medicine_id_UNIQUE` (`medicine_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`LABORTORY_REPORT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`LABORTORY_REPORT` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`LABORTORY_REPORT` (
  `report_id` INT NOT NULL AUTO_INCREMENT,
  `stored_path` VARCHAR(45) NOT NULL,
  `test_name` VARCHAR(45) NULL,
  `PATIENT_patient_id` INT NOT NULL,
  `STAFF_staff_id` INT NOT NULL,
  PRIMARY KEY (`report_id`),
  UNIQUE INDEX `report_id_UNIQUE` (`report_id` ASC),
  UNIQUE INDEX `stored_path_UNIQUE` (`stored_path` ASC),
  INDEX `fk_LABORTORY_REPORT_PATIENT1_idx` (`PATIENT_patient_id` ASC),
  INDEX `fk_LABORTORY_REPORT_STAFF1_idx` (`STAFF_staff_id` ASC),
  CONSTRAINT `fk_LABORTORY_REPORT_PATIENT1`
    FOREIGN KEY (`PATIENT_patient_id`)
    REFERENCES `HMS_ERD`.`PATIENT` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_LABORTORY_REPORT_STAFF1`
    FOREIGN KEY (`STAFF_staff_id`)
    REFERENCES `HMS_ERD`.`STAFF` (`staff_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`BLOOD_DONOR`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`BLOOD_DONOR` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`BLOOD_DONOR` (
  `donor_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `number` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`donor_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`BLOOD_REQUEST`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`BLOOD_REQUEST` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`BLOOD_REQUEST` (
  `blood_request_id` INT NOT NULL AUTO_INCREMENT,
  `PATIENT_patient_id` INT NOT NULL,
  `blood_type` VARCHAR(3) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `BLOOD_DONOR_donor_id` INT NOT NULL,
  PRIMARY KEY (`blood_request_id`),
  UNIQUE INDEX `blood_request_id_UNIQUE` (`blood_request_id` ASC),
  INDEX `fk_BLOOD_REQUEST_PATIENT1_idx` (`PATIENT_patient_id` ASC),
  INDEX `fk_BLOOD_REQUEST_BLOOD_DONOR1_idx` (`BLOOD_DONOR_donor_id` ASC),
  CONSTRAINT `fk_BLOOD_REQUEST_PATIENT1`
    FOREIGN KEY (`PATIENT_patient_id`)
    REFERENCES `HMS_ERD`.`PATIENT` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BLOOD_REQUEST_BLOOD_DONOR1`
    FOREIGN KEY (`BLOOD_DONOR_donor_id`)
    REFERENCES `HMS_ERD`.`BLOOD_DONOR` (`donor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`ZAKAAT_DONOR`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`ZAKAAT_DONOR` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`ZAKAAT_DONOR` (
  `zakaat_donor_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `cell_no` VARCHAR(14) NOT NULL,
  `amount` INT(11) NULL,
  PRIMARY KEY (`zakaat_donor_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`ZAKAAT_REQUEST`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`ZAKAAT_REQUEST` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`ZAKAAT_REQUEST` (
  `zakaat_request_id` INT NOT NULL AUTO_INCREMENT,
  `requested_amount` DOUBLE NOT NULL,
  `recieved_amount` DOUBLE NOT NULL,
  `PATIENT_patient_id` INT NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `ZAKAAT_DONOR_zakaat_donor_id` INT NOT NULL,
  PRIMARY KEY (`zakaat_request_id`, `PATIENT_patient_id`, `ZAKAAT_DONOR_zakaat_donor_id`),
  UNIQUE INDEX `zakaat_request_id_UNIQUE` (`zakaat_request_id` ASC),
  INDEX `fk_ZAKAAT_REQUEST_PATIENT1_idx` (`PATIENT_patient_id` ASC),
  INDEX `fk_ZAKAAT_REQUEST_ZAKAAT_DONOR1_idx` (`ZAKAAT_DONOR_zakaat_donor_id` ASC),
  CONSTRAINT `fk_ZAKAAT_REQUEST_PATIENT1`
    FOREIGN KEY (`PATIENT_patient_id`)
    REFERENCES `HMS_ERD`.`PATIENT` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ZAKAAT_REQUEST_ZAKAAT_DONOR1`
    FOREIGN KEY (`ZAKAAT_DONOR_zakaat_donor_id`)
    REFERENCES `HMS_ERD`.`ZAKAAT_DONOR` (`zakaat_donor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`APPOINTMENT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`APPOINTMENT` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`APPOINTMENT` (
  `appointment_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `date` DATE NOT NULL,
  `time` VARCHAR(45) NOT NULL,
  `PATIENT_patient_id` INT NOT NULL,
  PRIMARY KEY (`appointment_id`),
  UNIQUE INDEX `appointment_id_UNIQUE` (`appointment_id` ASC),
  INDEX `fk_APPOINTMENT_PATIENT1_idx` (`PATIENT_patient_id` ASC),
  CONSTRAINT `fk_APPOINTMENT_PATIENT1`
    FOREIGN KEY (`PATIENT_patient_id`)
    REFERENCES `HMS_ERD`.`PATIENT` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`ANSWER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`ANSWER` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`ANSWER` (
  `answer_id` INT NOT NULL AUTO_INCREMENT,
  `response` VARCHAR(100) NULL,
  PRIMARY KEY (`answer_id`),
  UNIQUE INDEX `ANSWER_UNIQUE` (`answer_id` ASC),
  UNIQUE INDEX `response_UNIQUE` (`response` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`ASKED_QUESTIONS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`ASKED_QUESTIONS` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`ASKED_QUESTIONS` (
  `question_id` INT NOT NULL AUTO_INCREMENT,
  `question` VARCHAR(45) NOT NULL,
  `ANSWER_answer_id` INT NOT NULL,
  PRIMARY KEY (`question_id`),
  UNIQUE INDEX `question_id_UNIQUE` (`question_id` ASC),
  UNIQUE INDEX `question_UNIQUE` (`question` ASC),
  INDEX `fk_ASKED_QUESTIONS_ANSWER1_idx` (`ANSWER_answer_id` ASC),
  CONSTRAINT `fk_ASKED_QUESTIONS_ANSWER1`
    FOREIGN KEY (`ANSWER_answer_id`)
    REFERENCES `HMS_ERD`.`ANSWER` (`answer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`WARD`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`WARD` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`WARD` (
  `ward_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `bed_count` INT(11) NOT NULL,
  `class` VARCHAR(45) NOT NULL,
  `isDeleted` TINYINT(1) NULL,
  PRIMARY KEY (`ward_id`),
  UNIQUE INDEX `ward_id_UNIQUE` (`ward_id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`HOME_SERVICE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`HOME_SERVICE` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`HOME_SERVICE` (
  `home_service_id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  `PATIENT_patient_id` INT NOT NULL,
  `STAFF_staff_id` INT NOT NULL,
  `DOCTOR_doctor_id` INT NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`home_service_id`),
  UNIQUE INDEX `home_service_id_UNIQUE` (`home_service_id` ASC),
  INDEX `fk_HOME_SERVICE_PATIENT1_idx` (`PATIENT_patient_id` ASC),
  INDEX `fk_HOME_SERVICE_STAFF1_idx` (`STAFF_staff_id` ASC),
  INDEX `fk_HOME_SERVICE_DOCTOR1_idx` (`DOCTOR_doctor_id` ASC),
  CONSTRAINT `fk_HOME_SERVICE_PATIENT1`
    FOREIGN KEY (`PATIENT_patient_id`)
    REFERENCES `HMS_ERD`.`PATIENT` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_HOME_SERVICE_STAFF1`
    FOREIGN KEY (`STAFF_staff_id`)
    REFERENCES `HMS_ERD`.`STAFF` (`staff_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_HOME_SERVICE_DOCTOR1`
    FOREIGN KEY (`DOCTOR_doctor_id`)
    REFERENCES `HMS_ERD`.`DOCTOR` (`doctor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`PATIENT_has_DISEASE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`PATIENT_has_DISEASE` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`PATIENT_has_DISEASE` (
  `PATIENT_patient_id` INT NOT NULL,
  `DISEASE_disease_id` INT NOT NULL,
  PRIMARY KEY (`PATIENT_patient_id`, `DISEASE_disease_id`),
  INDEX `fk_PATIENT_has_DISEASE_DISEASE1_idx` (`DISEASE_disease_id` ASC),
  INDEX `fk_PATIENT_has_DISEASE_PATIENT1_idx` (`PATIENT_patient_id` ASC),
  CONSTRAINT `fk_PATIENT_has_DISEASE_PATIENT1`
    FOREIGN KEY (`PATIENT_patient_id`)
    REFERENCES `HMS_ERD`.`PATIENT` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PATIENT_has_DISEASE_DISEASE1`
    FOREIGN KEY (`DISEASE_disease_id`)
    REFERENCES `HMS_ERD`.`DISEASE` (`disease_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`PATIENT_has_DOCTOR`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`PATIENT_has_DOCTOR` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`PATIENT_has_DOCTOR` (
  `PATIENT_patient_id` INT NOT NULL,
  `DOCTOR_doctor_id` INT NOT NULL,
  `isDeleted` TINYINT(1) NULL,
  PRIMARY KEY (`PATIENT_patient_id`, `DOCTOR_doctor_id`),
  INDEX `fk_PATIENT_has_DOCTOR_DOCTOR1_idx` (`DOCTOR_doctor_id` ASC),
  INDEX `fk_PATIENT_has_DOCTOR_PATIENT1_idx` (`PATIENT_patient_id` ASC),
  CONSTRAINT `fk_PATIENT_has_DOCTOR_PATIENT1`
    FOREIGN KEY (`PATIENT_patient_id`)
    REFERENCES `HMS_ERD`.`PATIENT` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PATIENT_has_DOCTOR_DOCTOR1`
    FOREIGN KEY (`DOCTOR_doctor_id`)
    REFERENCES `HMS_ERD`.`DOCTOR` (`doctor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`BED`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`BED` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`BED` (
  `bed_id` INT NOT NULL AUTO_INCREMENT,
  `WARDS_ward_id` INT NOT NULL,
  PRIMARY KEY (`bed_id`),
  UNIQUE INDEX `bed_id_UNIQUE` (`bed_id` ASC),
  INDEX `fk_BED_WARDS1_idx` (`WARDS_ward_id` ASC),
  CONSTRAINT `fk_BED_WARDS1`
    FOREIGN KEY (`WARDS_ward_id`)
    REFERENCES `HMS_ERD`.`WARD` (`ward_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`DOCTOR_has_MEDICINE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`DOCTOR_has_MEDICINE` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`DOCTOR_has_MEDICINE` (
  `DOCTOR_doctor_id` INT NOT NULL,
  `MEDICINE_medicine_id` INT NOT NULL,
  PRIMARY KEY (`DOCTOR_doctor_id`, `MEDICINE_medicine_id`),
  INDEX `fk_DOCTOR_has_MEDICINE_MEDICINE1_idx` (`MEDICINE_medicine_id` ASC),
  INDEX `fk_DOCTOR_has_MEDICINE_DOCTOR1_idx` (`DOCTOR_doctor_id` ASC),
  CONSTRAINT `fk_DOCTOR_has_MEDICINE_DOCTOR1`
    FOREIGN KEY (`DOCTOR_doctor_id`)
    REFERENCES `HMS_ERD`.`DOCTOR` (`doctor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_DOCTOR_has_MEDICINE_MEDICINE1`
    FOREIGN KEY (`MEDICINE_medicine_id`)
    REFERENCES `HMS_ERD`.`MEDICINE` (`medicine_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`DOCTOR_DISEASE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`DOCTOR_DISEASE` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`DOCTOR_DISEASE` (
  `DISEASE_disease_id` INT NOT NULL,
  `DOCTOR_doctor_id` INT NOT NULL,
  `isDeleted` TINYINT(1) NULL,
  PRIMARY KEY (`DISEASE_disease_id`, `DOCTOR_doctor_id`),
  INDEX `fk_DISEASE_has_DOCTOR_DOCTOR1_idx` (`DOCTOR_doctor_id` ASC),
  INDEX `fk_DISEASE_has_DOCTOR_DISEASE1_idx` (`DISEASE_disease_id` ASC),
  CONSTRAINT `fk_DISEASE_has_DOCTOR_DISEASE1`
    FOREIGN KEY (`DISEASE_disease_id`)
    REFERENCES `HMS_ERD`.`DISEASE` (`disease_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_DISEASE_has_DOCTOR_DOCTOR1`
    FOREIGN KEY (`DOCTOR_doctor_id`)
    REFERENCES `HMS_ERD`.`DOCTOR` (`doctor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HMS_ERD`.`PATIENT_wasin_BED`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HMS_ERD`.`PATIENT_wasin_BED` ;

CREATE TABLE IF NOT EXISTS `HMS_ERD`.`PATIENT_wasin_BED` (
  `PATIENT_patient_id` INT NOT NULL,
  `BED_bed_id` INT NOT NULL,
  PRIMARY KEY (`PATIENT_patient_id`, `BED_bed_id`),
  INDEX `fk_PATIENT_has_BED_BED1_idx` (`BED_bed_id` ASC),
  INDEX `fk_PATIENT_has_BED_PATIENT1_idx` (`PATIENT_patient_id` ASC),
  CONSTRAINT `fk_PATIENT_has_BED_PATIENT1`
    FOREIGN KEY (`PATIENT_patient_id`)
    REFERENCES `HMS_ERD`.`PATIENT` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PATIENT_has_BED_BED1`
    FOREIGN KEY (`BED_bed_id`)
    REFERENCES `HMS_ERD`.`BED` (`bed_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
