import { MongoClient } from "mongodb";
import { DatabaseWrapper } from "./data/interfaces/data-sources/database-wrapper";
import { GetTastings } from "./domain/use-cases/tastings/get-tastings";
import { TastingRepositoryImpl } from "./domain/repositories/tasting-repository";
import { MongoDBTastingDataSource } from "./data/data-sources/mongodb/mongodb-tasting-data-source";
import { CreateTasting } from "./domain/use-cases/tastings/create-tasting";
import TastingsRouter from "./domain/presentation/routers/tastings-router";
import server from "./server";

(async () => {
  const client: MongoClient = new MongoClient('mongodb://localhost:27017/tastings');
  await client.connect();
  const db = client.db("tastings");

  const tastingDatabase: DatabaseWrapper = {
    find: (query) => db.collection("tastings").find(query).toArray(),
    insertOne: (doc) => db.collection('tastings').insertOne(doc)
  }

  const tastingMiddleware = TastingsRouter(
    new GetTastings(new TastingRepositoryImpl(new MongoDBTastingDataSource(tastingDatabase))),
    new CreateTasting(new TastingRepositoryImpl(new MongoDBTastingDataSource(tastingDatabase)))
  );

  server.use("/tastings", tastingMiddleware);
  server.listen(8080, () => console.log('[STARTED] whisky-tasting is running...'));
})();