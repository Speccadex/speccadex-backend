import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './db/schema';
import { relations } from './db/relations';

const db = drizzle(process.env.DATABASE_URL!, { relations });

async function main() {
    const cpus = await db.select().from(schema.cpu);
    console.log('CPU-k:', cpus);

    const cases = await db.select().from(schema.pcCase);
    console.log('Gépházak:', cases);

    const builds = await db.query.builds.findMany({
        with: { cpu: true, gpu: true, mobo: true },
    });
    console.log('Builds:', builds);
}

main();