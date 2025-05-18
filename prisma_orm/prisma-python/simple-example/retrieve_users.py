import asyncio
from prisma import Prisma

async def main() -> None:
    db = Prisma()
    await db.connect()

    # write your queries here
    users = await db.user.find_many()
    for user in users:
        print(user)

    await db.disconnect()

if __name__ == '__main__':
    asyncio.run(main())
