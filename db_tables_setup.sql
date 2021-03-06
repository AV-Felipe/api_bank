CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS customers (
	id uuid DEFAULT uuid_generate_v4 (),
	full_name varchar(50) NOT NULL UNIQUE,
    email varchar(50) NOT NULL UNIQUE,
    cpf varchar(11) NOT NULL UNIQUE,
	birthdate date NOT NULL,
	password varchar(60),
	created_at timestamp with time zone DEFAULT NOW(),
	updated_at timestamp with time zone,
	deleted_at int NOT NULL DEFAULT 0,
	PRIMARY KEY (id),
	UNIQUE (full_name, deleted_at)
);

CREATE TABLE IF NOT EXISTS accounts (
	id uuid DEFAULT uuid_generate_v4 (),
    owner uuid NOT NULL,
	ac_number serial,
    ac_digit varchar(1) NOT NULL,
   	ag_number varchar(4) NOT NULL,
    ag_digit varchar(1) NOT NULL,
	balance BIGINT NOT NULL DEFAULT 0,
	created_at timestamp with time zone DEFAULT NOW(),
	updated_at timestamp with time zone,
	deleted_at int NOT NULL DEFAULT 0,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS transactions (
	id uuid DEFAULT uuid_generate_v4 (),
    account uuid NOT NULL,
	operation varchar(1) NOT NULL,
    value bigint NOT NULL,
   	description varchar(10) NOT NULL,
	created_at timestamp with time zone DEFAULT NOW(),
	updated_at timestamp with time zone,
	deleted_at int NOT NULL DEFAULT 0,
	PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS accounts
	ADD CONSTRAINT customer_account_fk0 FOREIGN KEY (owner) REFERENCES customers(id);

ALTER TABLE IF EXISTS transactions
ADD CONSTRAINT account_fk0 FOREIGN KEY (account) REFERENCES accounts(id);