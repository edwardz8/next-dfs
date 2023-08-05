export const dynamic = 'force-dynamic'
import { db } from "@/app/db"
import { revalidatePath } from "next/cache"

async function getData(player: any) {
    const stats = await fetch(
        `https://statsapi.web.nhl.com/api/v1/people/${player}/stats?stats=statsSingleSeason&season=20222023`,
        {
            headers: {
                accept: 'application/json',
            },
        }
    )
    return stats.json()
}

async function getPlayerData(player: any) {
    const stats = await fetch(
        `https://statsapi.web.nhl.com/api/v1/people/${player}`,
        {
            headers: {
                accept: 'application/json'
            }
        }
    )
    return stats.json()
}

/* Comments Data Logic */
async function getComments(id: string) {
    const data = await db.comment.findMany({
        where: {
            playerId: id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return data 
}

async function postData(formData: FormData) {
    "use server";

    // get 'comment' as textarea name is comment
    const data = await db.comment.create({
        data: {
            message: formData.get('comment') as string,
            playerId: formData.get('id') as string
        }
    })

    revalidatePath('/teams/[team]/[playerId]')
}

/* Player Functional Component */
export default async function Player(context: any) {
    const { player } = context.params

    const playerData = await getPlayerData(player)
    const statsData = await getData(player)

    const stats = statsData.stats[0].splits[0].stat
    const playerInfo = playerData.people[0]

    const commentsData = await getComments(player.id)

    const statsList = []

    for (let key in stats) {
        statsList.push(
            <li key={stats[key]}>
                {key}: {stats[key]}
            </li>
        )
    }

    return (
        <div className='py-6 sm:py-8 lg:py-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
                <div className='mb-10 md:mb-16'>
                    <h2 className='mb-4 text-center text-2xl font-bold text-gray-100'>
                        {playerInfo.fullName}
                    </h2>
                    <p className='mb-4 text-center text-gl font-bold text-gray-100'>
                        Age: {playerInfo.currentAge}
                    </p>
                </div>
            </div>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
                <div className='grid grid-cols-4'>
                    <ul>{statsList}</ul>
                </div>

                {/* comments */}
                <div className="rounded-lg border p-3 mt-5">
                    <h2 className="text-xl font-semibold mb-5">Comments</h2>
                    <div>
                        <form action={postData}>
                            <textarea name="comment" className="w-full border border-green-400 rounded-lg p-2 text-gray-900" placeholder="Add your thoughts or recent news on this player to help inform others who may be interested...">

                            </textarea>
                            <input type="hidden" name="id" value={player.id} />
                            <button type="submit" className="bg-green-400 px-4 py-2 rounded-lg text-white">Add Comment</button>
                        </form>

                        <div className="mt-5 flex flex-col gap-y-3">
                            {commentsData.map((post) => (
                                <div key={post.id}>
                                    <p>{post.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}