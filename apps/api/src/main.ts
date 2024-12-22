import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { generateOpenApi } from '@ts-rest/open-api';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { contract } from 'api-contract';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();

  const document = generateOpenApi(contract, {
    info: {
      title: 'Workout app API',
      version: '1.0.0',
    },
  });

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
