import { MongooseModule } from '@nestjs/mongoose';
import { getEnvConfig } from 'src/config';

export function setUpMongoDB() {
  const { MONGO_URI = 'mongodb://localhost/nestjs' } = getEnvConfig();
  return MongooseModule.forRoot(MONGO_URI);
}
