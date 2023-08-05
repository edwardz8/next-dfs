This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Prisma Installation 

npm i -D prisma 
npm i @prisma/client 
npx prisma init 

npx prisma db push

Create db.ts file inside app directory for global app access to prisma client

# API Routes and Documentation

https://gitlab.com/dword4/nhlapi/-/blob/master/swagger/openapi.yaml 

### Team Roster

https://statsapi.web.nhl.com/api/v1/teams/ID/roster 

### Teams

https://gitlab.com/dword4/nhlapi/-/blob/master/stats-api.md#team-stats 

https://statsapi.web.nhl.com/api/v1/teams/ID 
https://statsapi.web.nhl.com/api/v1/teams/{teamId}

##### All Teams
?teamId=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30

?expand=team.roster&season=20222023

### People

https://statsapi.web.nhl.com/api/v1/people/ID/stats?stats=statsSingleSeason&season=20222023

##### loop through each player by id on each roster in the 2022 - 2023 season

https://statsapi.web.nhl.com/api/v1/people/8480070/stats?stats=statsSingleSeason&season=20222023

https://statsapi.web.nhl.com/api/v1/people/{playerId}/stats?stats=statsSingleSeason&season={seasonId}



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
