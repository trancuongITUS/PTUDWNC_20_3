CREATE TABLE IF NOT EXISTS m_user( 
    id SERIAL
    , username character varying (255) UNIQUE NOT NULL
    , pwd_hash character varying (255)
    , email character varying (255) UNIQUE NOT NULL
    , fullname character varying (255)
    , is_google boolean default false
    , is_facebook boolean default false
    , record_version integer DEFAULT 0
    , created_date timestamp without time zone
    , created_user integer
    , last_upd_date timestamp without time zone
    , last_upd_user integer
    , PRIMARY KEY (id)
); 

ALTER TABLE m_user ADD CONSTRAINT created_user_fkey FOREIGN KEY (created_user) REFERENCES m_user(id);
ALTER TABLE m_user ADD CONSTRAINT last_upd_user_fkey FOREIGN KEY (last_upd_user) REFERENCES m_user(id);

CREATE TABLE IF NOT EXISTS m_role(
    id SERIAL
    , role_name character varying (50)
    , PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS r_user_role(
    id_user integer
    , id_role integer
    , PRIMARY KEY (id_user, id_role)
);

ALTER TABLE r_user_role ADD CONSTRAINT id_user_fkey FOREIGN KEY (id_user) REFERENCES m_user(id);
ALTER TABLE r_user_role ADD CONSTRAINT id_role_fkey FOREIGN KEY (id_role) REFERENCES m_role(id);

CREATE TABLE IF NOT EXISTS t_class(
    id SERIAL
    , class_name character varying (50) NOT NULL
    , description character varying (255) NOT NULL
    , record_version integer DEFAULT 0
    , created_date timestamp without time zone
    , created_user integer
    , last_upd_date timestamp without time zone
    , last_upd_user integer
    , PRIMARY KEY (id)
);

ALTER TABLE t_class ADD CONSTRAINT created_user_fkey FOREIGN KEY (created_user) REFERENCES m_user(id);
ALTER TABLE t_class ADD CONSTRAINT last_upd_user_fkey FOREIGN KEY (last_upd_user) REFERENCES m_user(id);

CREATE TABLE IF NOT EXISTS r_class_user(
    id_class integer
    , id_user integer
    , PRIMARY KEY (id_class, id_user)
);

ALTER TABLE r_class_user ADD CONSTRAINT id_class_fkey FOREIGN KEY (id_class) REFERENCES t_class(id);
ALTER TABLE r_class_user ADD CONSTRAINT id_user_fkey FOREIGN KEY (id_user) REFERENCES m_user(id);
