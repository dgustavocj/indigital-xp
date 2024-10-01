
-- Borrar la tabla de adjuntos si ya existe
DROP TABLE IF EXISTS t_claim_attachment;

-- Borrar la tabla de reclamos si ya existe
DROP TABLE IF EXISTS t_claim;

-- Borrar la tabla de motivos de reclamo si ya existe
DROP TABLE IF EXISTS t_claim_reason;

-- Borrar la tabla de compañías si ya existe
DROP TABLE IF EXISTS t_company;

-- Crear la tabla de compañías (t_company)
CREATE TABLE t_company (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(50) NOT NULL
);

-- Crear la tabla de motivos de reclamo (t_claim_reason)
CREATE TABLE t_claim_reason (
    claim_reason_id SERIAL PRIMARY KEY,
    claim_reason_name VARCHAR(50) NOT NULL
);

-- Crear la tabla principal de reclamos (t_claim)
CREATE TABLE t_claim (
    claim_id SERIAL PRIMARY KEY,
    company_id INT NOT NULL,
    claim_reason_id INT NOT NULL,
    claim_description TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_email VARCHAR(100),
    status char(3) not null ,
    advisor_comment TEXT null,
    advisor_email VARCHAR(100) null,
    update_date TIMESTAMP null,
    FOREIGN KEY (company_id) REFERENCES t_company(company_id),
    FOREIGN KEY (claim_reason_id) REFERENCES t_claim_reason(claim_reason_id)
);

-- Crear la tabla de adjuntos de reclamo (t_claim_attachment)
CREATE TABLE t_claim_attachment (
    attachment_id SERIAL PRIMARY KEY,
    claim_id INT NOT NULL,
    attachment_url VARCHAR(255) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (claim_id) REFERENCES t_claim(claim_id)
);


--Empresa asociada al Reclamo de una lista(Promart, Oechsle, plazaVea, Vivanda)
insert into t_company (company_name) values ('Promart');
insert into t_company (company_name) values ('Oeschle');
insert into t_company (company_name) values ('Plaza Vea');
insert into t_company (company_name) values ('Vivanda');

-- Motivo del reclamo de una lista(Fecha de Entrega Incumplida, Producto con Defectos, Problemas con Personal)
insert into t_claim_reason (claim_reason_name) values ('Fecha de Entrega Incumplida');
insert into t_claim_reason (claim_reason_name) values ('Producto con Defectos');
insert into t_claim_reason (claim_reason_name) values ('Problemas con Personal');
