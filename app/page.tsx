import Link from 'next/link';

async function getData() {
  const url = await fetch('https://statsapi.web.nhl.com/api/v1/teams',
    {
      headers: {
        accept: 'application/json'
      }
    }
  )
  return url.json()
}

export default async function Home() {
  const data = await getData()

  let teamsList: any = []

  data.teams.forEach((team: any) => {
    teamsList.push(<div>
      <Link key={team.id} href={`/teams/${team.id}`}>
        {team.name}
      </Link>
    </div>)
  })

  return (
    <div className='py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-100'>All Teams</h2>
          <div className='grid grid-cols-4'>
            {teamsList}
          </div>
        </div>
      </div>
    </div>
  )
}
