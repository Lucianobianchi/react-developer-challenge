/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: false, // disabled to mitigate bug in chart.js (https://github.com/chartjs/Chart.js/issues/10673)
};

module.exports = nextConfig;
