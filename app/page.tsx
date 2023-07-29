async function getData() {
  const url = await fetch('https://statsapi.web.nhl.com/api/v1/teams/5/stats',
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
  console.log(data.stats[0].splits[0].stat)
  return (
    <div className='py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-100'>All Players</h2>
        </div>
      </div>
    </div>
  )
}
