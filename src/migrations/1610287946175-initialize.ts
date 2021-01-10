import {MigrationInterface, QueryRunner} from "typeorm";

export class initialize1610287946175 implements MigrationInterface {
    name = 'initialize1610287946175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "promotion" ("promotionId" uuid NOT NULL DEFAULT uuid_generate_v4(), "promocode" character varying NOT NULL, "discount" integer NOT NULL, "expiredFlag" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_4887f3e313013a8f1f16c3b2ba0" PRIMARY KEY ("promotionId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "order" ("orderId" uuid NOT NULL DEFAULT uuid_generate_v4(), "item" character varying NOT NULL, "price" integer NOT NULL, "totalItem" integer NOT NULL, "totalPrice" integer NOT NULL, "userUserId" uuid, "promotionPromotionId" uuid, CONSTRAINT "PK_b075313d4d7e1c12f1a6e6359e8" PRIMARY KEY ("orderId"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_f2118217784d0e73e2b050bd564" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_572f9917ccfc4fc8b821e457ce4" FOREIGN KEY ("promotionPromotionId") REFERENCES "promotion"("promotionId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_572f9917ccfc4fc8b821e457ce4"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_f2118217784d0e73e2b050bd564"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "promotion"`);
    }

}
