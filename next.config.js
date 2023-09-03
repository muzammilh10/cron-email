const {withSuperjson} = require('next-superjson')

/** @type {import('next').NextConfig} */
const nextConfig = withSuperjson()({
    reactStrictMode: true,
    images: {
        domains: ['openweathermap.org']
    }
})

module.exports = nextConfig
