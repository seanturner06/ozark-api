import { characters }from './characters';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addCharacters() {
    await prisma.character.createMany({
        data: characters,
        skipDuplicates: true
    });
}

addCharacters().catch(e => {
    console.log('Error seeding database');
    console.error(e);
}).finally(() => {
    prisma.$disconnect();
})