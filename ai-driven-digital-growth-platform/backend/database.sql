-- ============================================================
--  JhaTech Database Schema
--  Import this in phpMyAdmin or run: mysql -u root -p < database.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS jhatech_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE jhatech_db;

-- ------------------------------------------------------------
--  Table: ai_analysis_logs
--  Stores every AI business analysis report generated
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_analysis_logs (
    id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    owner_name    VARCHAR(100)  NOT NULL,
    business_name VARCHAR(150)  NOT NULL,
    business_type VARCHAR(100)  NOT NULL,
    city          VARCHAR(100)  NOT NULL,
    phone         VARCHAR(20)   DEFAULT NULL,
    challenges    TEXT          DEFAULT NULL,
    report_json   LONGTEXT      DEFAULT NULL COMMENT 'Full AI-generated report as JSON',
    created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_business_type (business_type),
    INDEX idx_city          (city),
    INDEX idx_created_at    (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  Table: referral_partners
--  Stores registered referral partners
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS referral_partners (
    id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    partner_id    VARCHAR(20)   NOT NULL UNIQUE COMMENT 'e.g. JT3F9A2B',
    name          VARCHAR(100)  NOT NULL,
    phone         VARCHAR(20)   NOT NULL UNIQUE,
    city          VARCHAR(100)  NOT NULL,
    how_heard     VARCHAR(100)  DEFAULT NULL,
    status        ENUM('active','inactive','suspended') NOT NULL DEFAULT 'active',
    total_referrals   INT UNSIGNED NOT NULL DEFAULT 0,
    total_earnings    DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    registered_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_phone    (phone),
    INDEX idx_city     (city),
    INDEX idx_status   (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  Table: referral_sales
--  Tracks each sale attributed to a partner
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS referral_sales (
    id             BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    partner_id     VARCHAR(20)  NOT NULL,
    client_name    VARCHAR(100) NOT NULL,
    client_phone   VARCHAR(20)  NOT NULL,
    plan_purchased VARCHAR(50)  NOT NULL,
    sale_amount    DECIMAL(10,2) NOT NULL,
    commission     DECIMAL(10,2) NOT NULL DEFAULT 1000.00,
    status         ENUM('pending','confirmed','paid') NOT NULL DEFAULT 'pending',
    sale_date      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    paid_date      DATETIME     DEFAULT NULL,

    FOREIGN KEY (partner_id) REFERENCES referral_partners(partner_id) ON UPDATE CASCADE,
    INDEX idx_partner  (partner_id),
    INDEX idx_status   (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  Table: contact_inquiries
--  General leads / contact form submissions
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    phone      VARCHAR(20)  NOT NULL,
    message    TEXT         DEFAULT NULL,
    source     VARCHAR(50)  DEFAULT 'website' COMMENT 'hero | pricing | footer | referral',
    is_read    TINYINT(1)   NOT NULL DEFAULT 0,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_phone      (phone),
    INDEX idx_source     (source),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  Sample admin query — see all today's leads
-- ------------------------------------------------------------
-- SELECT * FROM contact_inquiries  WHERE DATE(created_at) = CURDATE() ORDER BY id DESC;
-- SELECT * FROM ai_analysis_logs   WHERE DATE(created_at) = CURDATE() ORDER BY id DESC;
-- SELECT * FROM referral_partners  ORDER BY registered_at DESC;
