import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
// Define seed data for role
    const roles = [
        {name: 'ADMIN'},
        {name: 'PLAYER'}
    ];

    // Seed Roles
    for (const role of roles) {
        await prisma.role.upsert({
            where: {name: role.name},
            update: {},
            create: role,
        });
    }
    console.log('Database has been seeded 🌱');
    
}

main()
    .catch((e)=>{
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect()
    });