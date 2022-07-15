import { MongooseModule } from '@nestjs/mongoose';
import { getEnvConfig } from 'src/config';

export function setUpMongoDB() {
  const { MONGO_URI = 'mongodb://localhost/nest' } = getEnvConfig();
  return MongooseModule.forRoot(MONGO_URI);
}
