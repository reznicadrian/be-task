import { Injectable } from '@nestjs/common';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { JwtSignOptions } from '@nestjs/jwt';

type EnvConfig = {
  [key: string]: string;
};

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = ConfigService.validateInput(config);
  }

  private static validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .required()
        .valid('dev', 'prod', 'test')
        .default('dev'),
      APP_PORT: Joi.number().required(),

      JWT_KEY: Joi.string().required(),

      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USER: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_NAME: Joi.string().required(),

      PRIVATE_KEY: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } =
      envVarSchema.validate(envConfig);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  get jwtConfig(): JwtSignOptions {
    return {
      secret: this.envConfig.JWT_KEY,
      expiresIn: 100000,
    };
  }

  get postgresConfig(): SequelizeModuleOptions {
    return {
      dialect: 'postgres',
      host: this.envConfig.DB_HOST,
      port: +this.envConfig.DB_PORT,
      username: this.envConfig.DB_USER,
      password: this.envConfig.DB_PASSWORD,
      database: this.envConfig.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    };
  }
}
