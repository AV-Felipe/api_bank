CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS customers (
	id uuid DEFAULT uuid_generate_v4 (),
	full_name varchar(50) NOT NULL UNIQUE,
    email varchar(50) NOT NULL UNIQUE,
    cpf varchar(11) NOT NULL UNIQUE,
	password varchar(60),
	created_at timestamp with time zone DEFAULT NOW(),
	updated_at timestamp with time zone,
	deleted_at int NOT NULL DEFAULT 0,
	PRIMARY KEY (id),
	UNIQUE (full_name, deleted_at)
);

CREATE TABLE IF NOT EXISTS accounts (
	id uuid UNIQUE,
    owner uuid NOT NULL,
	ac_number varchar(5) NOT NULL,
    ac_digit varchar(1) NOT NULL,
   	ag_number varchar(4) NOT NULL,
    ag_digit varchar(1) NOT NULL,
	created_at timestamp with time zone DEFAULT NOW(),
	updated_at timestamp with time zone,
	deleted_at int NOT NULL DEFAULT 0,
	PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS accounts
	ADD CONSTRAINT customer_account_fk0 FOREIGN KEY (owner) REFERENCES customers(id);