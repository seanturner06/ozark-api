import seasonOneData from './seasonOneData' 

import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();



async function addData(){
    // Create Season
    await prisma.season.create({
        data: seasonOneData.season
    }); 

    // Create Characters
    await prisma.character.createMany({
        data: seasonOneData.characters, 
        skipDuplicates: true
    }); 

    // Create Crimes
    await prisma.crime.createMany({
        data: seasonOneData.crimes
    }); 
    console.log("Seed data added");

    // Create Episodes with relationships
    for(const episodeData of seasonOneData.episodes){
        const {characterIds, crimeIds, ...episode} = episodeData;
        await prisma.episode.create({
            data: {
                ...episode, 
                // Connect character that appear in this episode
                characters: {
                    connect: characterIds.map(id => ({id}))
                },
                // Connect crimes that occur in this episode
                crimes: {
                    connect: crimeIds.map(id => ({id}))
                }
            }
        }); 
    }
    // Create Quotes 
    await prisma.quote.createMany({
        data: seasonOneData.quotes
    }); 
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