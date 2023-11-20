DROP TABLE IF EXISTS m_user; 
CREATE TABLE IF NOT EXISTS m_user( 
    id SERIAL
    , username character varying (20) UNIQUE NOT NULL
    , pwd_hash character varying (255) NOT NULL
    , email character varying (255) UNIQUE NOT NULL
    , fullname character varying (255)
    , refresh_token text
    , expired_date timestamp without time zone
    , record_version integer DEFAULT 0
    , created_date timestamp without time zone
    , created_user integer
    , last_upd_date timestamp without time zone
    , last_upd_user integer
    , PRIMARY KEY (id)
); 

ALTER TABLE m_user ADD CONSTRAINT created_user_fkey FOREIGN KEY (created_user) REFERENCES m_user(id)
; 

ALTER TABLE m_user ADD CONSTRAINT last_upd_user_fkey FOREIGN KEY (last_upd_user) REFERENCES m_user(id)
; 

INSERT 
INTO m_user( 
    username
    , pwd_hash
    , email
    , fullname
    , refresh_token
    , record_version
    , created_date
    , created_user
    , last_upd_date
    , last_upd_user
) 
VALUES ( 
    'system'
    , '$2b$10$.URsBQWkf4hAGOnQWqRduOxWg6on0St2XRZJ7o54.LGsEN.DaT/sO' /*123456?a*/
    , 'systemadmin@gmail.com'
    , 'system'
    , null
    , 0
    , now()
    , 1
    , now()
    , 1
);

INSERT 
INTO m_user( 
    username
    , pwd_hash
    , email
    , fullname
    , refresh_token
    , record_version
    , created_date
    , created_user
    , last_upd_date
    , last_upd_user
) 
VALUES ( 
    'vietcuong'
    , '$2b$10$.URsBQWkf4hAGOnQWqRduOxWg6on0St2XRZJ7o54.LGsEN.DaT/sO'
    , '19120465@student.hcmus.edu.vn'
    , 'Tran Vu Viet Cuong'
    , null
    , 0
    , now()
    , 1
    , now()
    , 1
);

INSERT 
INTO m_user( 
    username
    , pwd_hash
    , email
    , fullname
    , refresh_token
    , record_version
    , created_date
    , created_user
    , last_upd_date
    , last_upd_user
) 
VALUES ( 
    'minhtri'
    , '$2b$10$.URsBQWkf4hAGOnQWqRduOxWg6on0St2XRZJ7o54.LGsEN.DaT/sO'
    , '18120608@student.hcmus.edu.vn'
    , 'cao Minh Tri'
    , null
    , 0
    , now()
    , 1
    , now()
    , 1
);
