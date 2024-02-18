import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Board } from "src/boards/board.entity";
import { User } from "src/auth/user.entity";

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'SCBESVDB',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    autoLoadEntities: true
}