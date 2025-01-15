/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: process.env.API_URL,
    TELEPHONE: process.env.TELEPHONE,
    TELEPHONE2: process.env.TELEPHONE2,
    EMAIL: process.env.EMAIL,
    EMAIL2: process.env.EMAIL2,
    ADDRESS: process.env.ADDRESS,
    PIB: process.env.PIB,
    MB: process.env.MB,
    CODE: process.env.CODE,
    COMPANY: process.env.COMPANY,
    SITE: process.env.SITE,
    NAME: process.env.NAME,
    STREET: process.env.STREET,
    CITY: process.env.CITY,
    POSTCODE: process.env.POSTCODE,
    STATE: process.env.STATE,
    WORKINGHOURS: process.env.WORKINGHOURS,
    WEEKWORKINGHOURS: process.env.WEEKWORKINGHOURS,
    CAPTCHAKEY: process.env.CAPTCHAKEY,
    SLIDESPERVIEW1: process.env.SLIDESPERVIEW1,
    SLIDESPERVIEW2: process.env.SLIDESPERVIEW2,
    ADDTOCART: process.env.ADDTOCART,
    NAVIGATION_TYPE: process.env.NAVIGATION_TYPE,
    FILTER_NAME: process.env.FILTER_NAME,
    FILTER_TYPE: process.env.FILTER_TYPE,
    FILTER_LIST: process.env.FILTER_LIST,
    PAGINATION: process.env.PAGINATION,
    LOAD_MORE: process.env.LOAD_MORE,
  },
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 90,
    domains: ["api.reflekta.rs", "api.akt.croonus.com"],
  },
};

module.exports = nextConfig;
