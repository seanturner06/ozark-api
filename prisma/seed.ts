import characters from './characters';
import crimes  from './crimes';
import quotes from './quotes';
import seasons from './seasons';    
import episodes from './episodes';

import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();


async function addCharacters() {
    console.log("Adding characters");
    await prisma.character.createMany(
        { data: characters }
    );
}

async function addCrimes() {
    await prisma.crime.createMany(
        { data: crimes }
    );
}

async function addQuotes() {
    await prisma.quote.createMany({
        data: quotes
    });
}

async function addSeasons() {
    await prisma.season.createMany({
        data: seasons,
        skipDuplicates: true
    });
}

async function addEpisodes() {
    await prisma.episode.createMany({
        data: episodes,
        skipDuplicates: true
    });
}

async function addData(){
    await Promise.all([
        addCharacters(), 
        addCrimes(),
        addQuotes(),
        addSeasons(),
        addEpisodes()
    ]);
    console.log("Seed data added");
}

addData()
    .then(async() => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.log("Error seeding data");
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });