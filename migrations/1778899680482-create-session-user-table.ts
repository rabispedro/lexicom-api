import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSessionUserTable1778899680482 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'session_user',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'varchar(26)',
          },
          {
            name: 'name',
            isNullable: false,
            type: 'varchar(127)',
          },
          {
            name: 'email',
            isNullable: false,
            isUnique: true,
            type: 'varchar(64)',
          },
          {
            name: 'password',
            isNullable: false,
            type: 'varchar(255)',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('session_user');
  }
}
