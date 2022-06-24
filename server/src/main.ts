import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Pet_Project')
      .setDescription('Documentation')
      .setVersion('1.0.0')
      .addTag('TMysiv')
      .build()
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('/api/docs',app,document);

  await app.listen(PORT, () =>
    console.log(`Server has started on Port:${PORT}`),
  );
}
start();
