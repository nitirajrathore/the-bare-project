import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
    // const user = await prisma.user.create({
    //     data : { 
    //         name: 'nitiraj',
    //         email: 'nitiraj@gmail.com'
    //     }
    // })

    // const users = await prisma.user.findMany();

    // console.log(users);

    // const article = await prisma.article.create({
    //     data: {
    //         title: 'Johns first Article',
    //         body: 'This is Johns first article',
    //         author: {
    //             connect: {
    //                 id: 1,
    //             }
    //         }
    //     }
    // });

    // console.log(article);

    // const user = await prisma.user.create({
    //     data: {
    //         name : "ABC",
    //         email: "abc@gmail.com",
    //         articles: {
    //             create: { 
    //                 title: "first article by abc",
    //                 body: "article by abc"
    //             }
    //         }
    //     }
    // })

    // console.log(user);

    const allUsers = await prisma.user.findMany({
        include: {
            articles: true,
        }
    })

    console.log(allUsers)
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);

    })