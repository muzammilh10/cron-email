# Weather App

The goal of this project is to build a simple and lightweight weather website.

So I choose to create a nextjs fullstack app for showing weather data from
the [OpenWeatherMap](https://openweathermap.org/) API.

## Core principles

**Stack**

- NextJS for SSR and easy routing.
- React for quick prototyping and easy to use.
- Using Prisma for database management for its simplicity and flexibility.
- Sqlite as lightweight database - all data exists in the api and this site just shows it.
- ContextProvider for state management because its simple and easy to use.
- Vercel for hosting and scheduling tasks.

**Architecture**

- Cities and Forecasts are different modules for better separation of concerns.
- Running cron jobs in Vercel to avoid blocking the main thread and easy management.

## Getting started

### 1. Download example and install dependencies

Clone this repository:

```bash
git clone https://github.com/NeriRos/weather-site.git
``` 

Install npm dependencies:

```bash
cd weather-site
npm install
```

### 2. Create and seed the database

Run the following command to create the SQLite database file and seed it with dummy data. \
This also creates the `City` and `Forecast` tables that are defined in the prisma scheme:

```bash
npx prisma migrate dev --name init
```

### 3. Start the app

For the entire project with the cron job functionality, you need to create a Vercel
account [here](https://vercel.com/signup) and
run the app with vercel dev.

```bash
vercel dev
```

For just the fully functioning app without cron jobs, you can run it with npm:

```bash
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your
browser to explore its UI.

## The UI

### 1. Home page

![](https://i.imgur.com/pYhRTkI.png)

### 2. City page

![](https://i.imgur.com/lmytUQf.png)