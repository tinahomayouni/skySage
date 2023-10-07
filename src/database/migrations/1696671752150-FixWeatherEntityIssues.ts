import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixWeatherEntityIssues1696671752150 implements MigrationInterface {
  name = 'FixWeatherEntityIssues1696671752150';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_weather" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "country" varchar NOT NULL, "city" varchar NOT NULL, "weather" integer, "temperature" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_weather"("id", "country", "city", "temperature", "weather") SELECT "id", "country", "city", "weather", "flag" FROM "weather"`,
    );
    await queryRunner.query(`DROP TABLE "weather"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_weather" RENAME TO "weather"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "weather" RENAME TO "temporary_weather"`,
    );
    await queryRunner.query(
      `CREATE TABLE "weather" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "country" varchar NOT NULL, "city" varchar NOT NULL, "weather" integer, "flag" text)`,
    );
    await queryRunner.query(
      `INSERT INTO "weather"("id", "country", "city", "flag", "weather") SELECT "id", "country", "city", "weather", "temperature" FROM "temporary_weather"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_weather"`);
  }
}
