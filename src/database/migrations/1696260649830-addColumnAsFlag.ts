import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnAsFlag1696260649830 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'weather',
      new TableColumn({
        name: 'flag',
        type: 'text',
        isNullable: true, // Set isNullable to true to allow NULL values
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('weather', 'flag');
  }
}
