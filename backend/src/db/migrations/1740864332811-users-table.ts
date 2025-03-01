import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1740862690559 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
        CREATE TABLE users (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            name varchar(255) NOT NULL,
            email varchar(255) NOT NULL UNIQUE,
            password varchar(255) NOT NULL,
            cpf varchar(11) NOT NULL UNIQUE,
            role varchar(10) CHECK (role IN ('admin', 'user')) NOT NULL DEFAULT 'user',
            created_at timestamp NOT NULL,
            updated_at timestamp NOT NULL,
            PRIMARY KEY (id)
        )    
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users;`);
  }
}
