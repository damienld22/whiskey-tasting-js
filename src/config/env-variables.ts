import { z } from 'zod';

const EnvVariablesSchema = z.object({
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']),
  MONGO_URL: z.string().min(1)
});

export type EnvVariables = z.infer<typeof EnvVariablesSchema>;


export function validateEnvVariables(variables: object): EnvVariables {
  try {
    return EnvVariablesSchema.parse(variables);
  } catch (err) {
    console.error('[STARTUP ERROR] Invalid env variables');
    throw err;
  }
}