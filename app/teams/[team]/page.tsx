import Link from 'next/link';

async function getData(team: any) {
    const url = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${team}/roster`,
        {
            headers: {
                accept: 'application/json'
            }
        }
    )
    return url.json()
}

export default async function Roster(context: any) {
    const { team } = context.params
    const data = await getData(team)

    let rosterList: any = []

    data.roster.forEach((roster: any) => {
        rosterList.push(
        <div>
            <Link key={roster.id} href={`/teams/${team}/${roster.person.id}/`}>
                {roster.person.fullName}
            </Link>
        </div>)
    })

    return (
        <div className='py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-100'>All Players</h2>
        </div>
      </div>
      <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
        <div className="grid grid-cols-4">
         { rosterList }
        </div>
      </div>
    </div>
    )

}