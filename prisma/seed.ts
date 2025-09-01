// prisma/seed.ts
import { PrismaClient } from '../src/generated/prisma/';
import seasonOneData from './seasonOneData';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');
try {
    // Clean existing data
    console.log('🧹 Cleaning existing data...');
    await prisma.quote.deleteMany({});
    await prisma.episode.deleteMany({});
    await prisma.character.deleteMany({});
    await prisma.crime.deleteMany({});
    await prisma.season.deleteMany({});

    // 1. Create Season (gets auto-generated ID)
    console.log('📺 Creating season...');
    const season = await prisma.season.create({
        data: seasonOneData.season
    });
    console.log(`✅ Season created with ID: ${season.id}`);

    // 2. Create Characters (get auto-generated IDs)
    console.log('👥 Creating characters...');
    const characters: Array<{ id: number; name: string }> = [];
    for (const characterData of seasonOneData.characters) {
        const character = await prisma.character.create({
        data: characterData
    });
        characters.push(character);
        console.log(`  ✅ Character "${character.name}" created with ID: ${character.id}`);
    }

    // 3. Create Crimes (get auto-generated IDs) 
    console.log('🚔 Creating crimes...');
    const crimes: Array<{ id: number; type: string }> = [];
    for (const crimeData of seasonOneData.crimes) {
        const crime = await prisma.crime.create({
        data: crimeData
        });
        crimes.push(crime);
        console.log(`  ✅ Crime "${crime.type}" created with ID: ${crime.id}`);
    }

    // 4. Create Episodes with relationships
    console.log('🎬 Creating episodes...');
    const episodes = [];
    for (const episodeData of seasonOneData.episodes) {
        const { characterIds, crimeIds, seasonId, ...episode } = episodeData;
    
        const createdEpisode = await prisma.episode.create({
            data: {
                ...episode,
                seasonId: season.id, // Use the actual created season ID
                characters: {
                    connect: characterIds.map((_, index) => ({ 
                        id: characters[index].id // Map to actual character IDs
                    }))
                },
                crimes: {
                    connect: crimeIds.map((_, index) => ({ 
                        id: crimes[index].id // Map to actual crime IDs
                    }))
                }
            }
        });
    
        episodes.push(createdEpisode);
        console.log(`  ✅ Episode "${createdEpisode.title}" created with ID: ${createdEpisode.id}`);
    }

    // 5. Create Quotes
    console.log('💬 Creating quotes...');
    for (const quoteData of seasonOneData.quotes) {
        const { characterId, episodeId, ...quote } = quoteData;
    
        await prisma.quote.create({
            data: {
            ...quote,
            characterId: characters[characterId - 1].id, // Map 1-based index to actual ID
            episodeId: episodes[episodeId === 4 ? 3 : episodeId - 1].id // Handle episode 4 -> episode 10 mapping
            }
        });
    }

    // 6. Verify the data
    console.log('📊 Verification...');
    const counts = await Promise.all([
        prisma.season.count(),
        prisma.character.count(),
        prisma.episode.count(),
        prisma.crime.count(),
        prisma.quote.count(),
    ]);

    console.log(`
    📈 Seed Summary:
    - Seasons: ${counts[0]}
    - Characters: ${counts[1]} 
    - Episodes: ${counts[2]}
    - Crimes: ${counts[3]}
    - Quotes: ${counts[4]}
    `);

    // Test a query to make sure relationships work
    type TestCharacter = { name: string };
    type TestCrime = { type: string };
    type TestQuote = unknown;
    type TestSeason = { seasonNumber: number };
    type TestEpisode = {
        title: string;
        season: TestSeason;
        characters: TestCharacter[];
        crimes: TestCrime[];
        quotes: TestQuote[];
    } | null;

    const testEpisode = await prisma.episode.findFirst({
        include: {
        characters: true,
        crimes: true,
        quotes: true,
        season: true
        }
    }) as TestEpisode;

    console.log(`
    🧪 Test Query - "${testEpisode?.title}":
    - Season: ${testEpisode?.season.seasonNumber}
    - Characters: ${testEpisode?.characters.map((c: TestCharacter) => c.name).join(', ')}
    - Crimes: ${testEpisode?.crimes.map((c: TestCrime) => c.type).join(', ')}
    - Quotes: ${testEpisode?.quotes.length}
    `);

    console.log('🎉 Seed completed! Ready to test GraphQL queries.');

    } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
    }
}

main()
.catch((e) => {
    console.error('Fatal error:', e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});