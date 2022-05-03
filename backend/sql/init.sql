CREATE TABLE mnr.`USERS`
(
   `user_id`           INT(20) AUTO_INCREMENT NOT NULL,
   `klaytn_address`    VARCHAR(42) NULL,
   `user_type`         CHAR(1)
                         NOT NULL
                         DEFAULT 'N'
                         COMMENT 'Nomal-N, Admin-A',
   `use_yn`            CHAR(20) NOT NULL DEFAULT 'Y',
   `create_dt`         TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
   `update_dt`         TIMESTAMP(0)
                         NOT NULL
                         DEFAULT CURRENT_TIMESTAMP(0)
                         ON UPDATE CURRENT_TIMESTAMP(0),
   PRIMARY KEY(`user_id`)
)
ENGINE = INNODB
CHARACTER SET 'utf8mb4'
COLLATE 'utf8mb4_0900_ai_ci'