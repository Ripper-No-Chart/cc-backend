import { load } from 'ts-dotenv';

const env = load({
  ENVIRONMENT: String,
  MONGO_DB_PRODUCTION_URI: String,
});

const environment = () => {
  return { MONGO_DB_URI: env.MONGO_DB_PRODUCTION_URI };
};
export { environment };
