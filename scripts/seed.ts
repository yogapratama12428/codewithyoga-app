const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Web Application" },
                { name: "Mobile Application" },
                { name: "Internet of things" },
                { name: "Arduino" },
                { name: "Kodular" },
            ],
        });
        console.log("Seeding finished.");

    } catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}

