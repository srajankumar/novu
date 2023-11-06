<div align="center">
  <img src="/assets/banner-image.jpg" alt="banner-image"/>
</div>

## About

Novu is a comprehensive fleet management application designed to help fleet managers efficiently manage their vehicles and drivers, while also providing drivers with the information they need to complete their routes and parking assignments.

## Features

### Fleet Management

- Admin authentication.
- Add, edit, and delete driver details.
- Add, edit, and delete vehicle details.
- Assign drivers to vehicles.
- View real-time vehicle location on a map.

### Driver Features

- Driver authentication.
- Access route information for their assigned trips.
- Receive parking location details for each trip.
- View a summary of their assigned trips.

### Data

| Route ID | Source     | Destination          | Frequency     | Route           |
| -------- | ---------- | -------------------- | ------------- | --------------- |
| 1        | State Bank | Kunjathbail          | Every hour    | Carstreet, Urwa |
| 7        | State Bank | Urwa Store           | Every 15 mins |                 |
| 13       | State Bank | Kottara              | Every hour    |                 |
| 1B       | State Bank | Kodical              | Every 15 mins |                 |
| 31       | State Bank | Mannagudda Shediguri | Every 20 mins |                 |
| 31A      | State Bank | Lalbag Shediguri     | Every 20 mins |                 |
| 31B      | State Bank | Dambel               | Every hour    |                 |
| 16       | State Bank | Sulthan Bathery      | Every 30 mins |                 |
| 16A      | State Bank | Sulthan Bathery      | Every 30 mins |                 |

Data Source [Wikipedia](https://en.wikipedia.org/wiki/Mangalore_City_Bus_routes)

## Tech Stacks

![Next.js](https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Google Maps](https://img.shields.io/badge/Google_Maps-%234285F4.svg?style=for-the-badge&logo=google-maps&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-%23056B13.svg?style=for-the-badge&logo=leaflet&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## How to Build the App

1. Fork and Clone the repository to your local machine

```bash
   git clone https://github.com/<YOUR_USERNAME>/novu
```

2. Navigate to both the `client` and `server` directories and install the necessary dependencies

```bash
   cd client && yarn
```

```bash
   cd server && yarn
```

3. Duplicate `.env.example` to `.env.local` file in the root of `client` directory and `.env.example` to `.env` file in the root of `server` directory

```bash
   cd client && cp .env.example .env.local
   cd server && cp .env.example .env
```

4. Start the development of both the `client` and `server` in separate terminals

```bash
   cd client && yarn dev
```

```bash
   cd server && yarn start
```

## Contributors

<a href="https://github.com/srajankumar/novu/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=srajankumar/novu" />
</a>
