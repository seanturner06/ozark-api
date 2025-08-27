import characters from './characters';
import crimes  from './crimes';
import quotes from './quotes';
import seasons from './seasons';    
import episodes from './episodes';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function addCharacters() {
    await prisma.character.createMany({
        data: characters,
        skipDuplicates: true
    });
}

async function addCrimes() {
    await prisma.crime.createMany({
        data: crimes,
        skipDuplicates: true
    });
}

async function addQuotes() {
    await prisma.quote.createMany({
        data: quotes,
        skipDuplicates: true
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
}

// TODO: Add error handling when calling addData function