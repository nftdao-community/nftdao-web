CREATE TABLE dailydao.proposals
(
   proposal_id    INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
   season         INT(10) UNSIGNED NOT NULL,
   description    VARCHAR(255)
                    CHARACTER SET utf8
                    COLLATE utf8_general_ci
                    NULL,
   user_key       VARCHAR(42)
                    CHARACTER SET utf8
                    COLLATE utf8_general_ci
                    NOT NULL,
   content_url    VARCHAR(100)
                    CHARACTER SET utf8
                    COLLATE utf8_general_ci
                    NOT NULL,
   created_at     TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
   is_accepted    VARCHAR(1)
                    CHARACTER SET utf8
                    COLLATE utf8_general_ci
                    NOT NULL
                    DEFAULT 'N',
   title          VARCHAR(100)
                    CHARACTER SET utf8
                    COLLATE utf8_general_ci
                    NOT NULL,
   PRIMARY KEY(proposal_id)
)
ENGINE INNODB
COLLATE 'utf8_general_ci'
ROW_FORMAT DEFAULT