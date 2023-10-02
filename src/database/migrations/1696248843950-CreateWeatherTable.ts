import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWeatherTable1696248843950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "weather" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "country" varchar NOT NULL, "city" varchar NOT NULL, "weather" integer)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "weather"`);
  }
}
