import { MongoClient } from 'mongodb';
import pino from 'pino-http';
import 'dotenv/config';
import cors from 'cors';
import { DatabaseWrapper } from './data/interfaces/data-sources/database-wrapper';
import { GetTastings } from './domain/use-cases/tastings/get-tastings';
import { TastingRepositoryImpl } from './domain/repositories/tasting-repository';
import { MongoDBTastingDataSource } from './data/data-sources/mongodb/mongodb-tasting-data-source';
import { CreateTasting } from './domain/use-cases/tastings/create-tasting';
import TastingsRouter from './domain/presentation/routers/tastings-router';
import server from './server';
import { validateEnvVariables } from './config/env-variables';
import { EditTasting } from './domain/use-cases/tastings/edit-tasting';
import { DeleteTasting } from './domain/use-cases/tastings/delete-tasting';

(async () => {
  const envVariables = validateEnvVariables(process.env);

  const logger = pino({
    level: envVariables.LOG_LEVEL || 'info',
  });

  const client: MongoClient = new MongoClient(envVariables.MONGO_URL);
  await client.connect();
  const db = client.db('tastings');

  const tastingDatabase: DatabaseWrapper = {
    find: (query) => db.collection('tastings').find(query).toArray(),
    insertOne: (doc) => db.collection('tastings').insertOne(doc),
    updateOne: (query, doc) => db.collection('tastings').updateOne(query, { $set: doc }),
    deleteOne: (query) => db.collection('tastings').deleteOne(query)
  };

  const tastingRepositoryImpl = new TastingRepositoryImpl(new MongoDBTastingDataSource(tastingDatabase));
  const tastingMiddleware = TastingsRouter(
    new GetTastings(tastingRepositoryImpl),
    new CreateTasting(tastingRepositoryImpl),
    new EditTasting(tastingRepositoryImpl),
    new DeleteTasting(tastingRepositoryImpl)
  );

  server.use(logger);
  server.use(cors({
    origin: envVariables.ORIGIN
  }))
  server.use('/tastings', tastingMiddleware);

  server.listen(8080, () => console.log('[STARTED] whisky-tasting is running...'));
})();
