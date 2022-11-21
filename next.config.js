/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.graphcms.com', 'media.graphassets.com'],
  },
  webpack: (config) => {
    config.experiments.topLevelAwait = true
    return config
  },
  env: {
    ENDPOINT:
      'https://api-eu-west-2.hygraph.com/v2/cl7gb25bu7lwl01ufcl76h703/master',
    GRAPH_CMS_TOKEN:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjI2MjQyNDEsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2w3Z2IyNWJ1N2x3bDAxdWZjbDc2aDcwMy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMzBkNWQyMTAtZDE1ZC00YjNmLTlkYjMtOGJhMDBjYTYxNzI2IiwianRpIjoiY2w3c3JqbXZhMDBsZjAxdGYzcTBpMGpyNiJ9.sURPBMk1I_mxAZXKc8KKS9mTVxqfE3m-7mw_fWY49BuSp-8sbFnLTMKmMw82R76j8yJdFn7t4xO9Q3mg-3SOdxuHKCrlTRsBGKt-T9Cfaq0rXQvELrx2TC8u8TKB2HQcuNoqqWuyXWTr2J0Tf3Nd3t1yrYHF3oeHW-CBg3rO_z7JcOjqkjv763OfpD0UFFoDB3t7jbZN1C1oy3AWiXknrsUkbAptSM4wI0E9DoCoUhLPzli9apwsQ350RL6ZJkQQYMZMMvcUIqefhFfVv6xcGHMsBu7qeE70F2l1bHHcp3DVSOMppaH-b4OiW5m5ziG0uoPmMgxnEbG-pOO6bKqZacCERsY3t1Dwn82Nvc5qEcgrGDjaKk5EaDY032P6ajp66trDpYmNMb6BQ5PBol1pUtFhRK75-PmSuFeAhG-UFSG-nGaXeclatbT1rmCnDLII7pAYf_MT6U-nY6TDPMZC4uufn-3ykgfiGFDNc-5ny97adwQRoibWxgn4eO42vN5zz6sBbHuealY61dNRIt8X8495bhNB5tKQEWMYNG2J8VCE1ewUlwCvd2m5UkxrP_qFgXuoY2t2UgLl1p_1uuOyi4IQW27j5ROBqMq-5dJPSIIazYZPpAxgrLl2uPsz9WaiUnHSLW9QFRJ4gUzRcVyIUxhkAv8DU4_Ye8TXmGcIn54',
  },
}

module.exports = nextConfig
