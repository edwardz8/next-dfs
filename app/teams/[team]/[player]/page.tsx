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

export default async function Player(context: any) {
    const { player } = context.params

    const playerData = await getPlayerData(player)
    const statsData = await getData(player)

    const stats = statsData.stats[0].splits[0].stat
    const playerInfo = playerData.people[0]

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
            </div>
        </div>
    )
}