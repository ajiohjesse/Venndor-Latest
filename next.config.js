/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'media.graphcms.com',
      'media.graphassets.com',
      'images.unsplash.com',
    ],
  },
  webpack: (config) => {
    config.experiments.topLevelAwait = true
    return config
  },
  env: {
    JWT: 'RKjcSEt9YOvju5sDzUPk5j3TC4MziLZ3',
    ENDPOINT:
      'https://api-eu-west-2.hygraph.com/v2/cl7gb25bu7lwl01ufcl76h703/master',
    GRAPH_CMS_TOKEN:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjI2MjQyNDEsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2w3Z2IyNWJ1N2x3bDAxdWZjbDc2aDcwMy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMzBkNWQyMTAtZDE1ZC00YjNmLTlkYjMtOGJhMDBjYTYxNzI2IiwianRpIjoiY2w3c3JqbXZhMDBsZjAxdGYzcTBpMGpyNiJ9.sURPBMk1I_mxAZXKc8KKS9mTVxqfE3m-7mw_fWY49BuSp-8sbFnLTMKmMw82R76j8yJdFn7t4xO9Q3mg-3SOdxuHKCrlTRsBGKt-T9Cfaq0rXQvELrx2TC8u8TKB2HQcuNoqqWuyXWTr2J0Tf3Nd3t1yrYHF3oeHW-CBg3rO_z7JcOjqkjv763OfpD0UFFoDB3t7jbZN1C1oy3AWiXknrsUkbAptSM4wI0E9DoCoUhLPzli9apwsQ350RL6ZJkQQYMZMMvcUIqefhFfVv6xcGHMsBu7qeE70F2l1bHHcp3DVSOMppaH-b4OiW5m5ziG0uoPmMgxnEbG-pOO6bKqZacCERsY3t1Dwn82Nvc5qEcgrGDjaKk5EaDY032P6ajp66trDpYmNMb6BQ5PBol1pUtFhRK75-PmSuFeAhG-UFSG-nGaXeclatbT1rmCnDLII7pAYf_MT6U-nY6TDPMZC4uufn-3ykgfiGFDNc-5ny97adwQRoibWxgn4eO42vN5zz6sBbHuealY61dNRIt8X8495bhNB5tKQEWMYNG2J8VCE1ewUlwCvd2m5UkxrP_qFgXuoY2t2UgLl1p_1uuOyi4IQW27j5ROBqMq-5dJPSIIazYZPpAxgrLl2uPsz9WaiUnHSLW9QFRJ4gUzRcVyIUxhkAv8DU4_Ye8TXmGcIn54',
    HYGRAPH_ASSET_API:
      'https://api-eu-west-2.hygraph.com/v2/cl7gb25bu7lwl01ufcl76h703/master/upload',
    HYGRAPH_ASSET_TOKEN:
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjQyOTE2OTksImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2w3Z2IyNWJ1N2x3bDAxdWZjbDc2aDcwMy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiOGZkNTdjYjYtYjI2Mi00M2YyLTk1MTYtODRjYzg1ZmI3ZWQ2IiwianRpIjoiY2w4a2NiMXdmMW5pdDAxdGM5dzJ3Y29vdyJ9.PTYC2VXDtH343jMf7KuFuwHBAaDC6wcndosZLr4Mx4DcfcScTxhv5jWCCo14FBKqfWL0r1cTLLBgVNjEU16B8YVdhnh51EBC2T6H7O0gh03UPFKBNnxn82odvSKV4emuKSd0WNKyeYxpqOSV87aXc6nE9EG5Jma8SoT1C5gnaw8HCE9x35T7dFX3Ef-SEP2SzNeq7P9a3V2PpnHJNihYJn7lMvT-XY7mSn6uqvkkrzecd6nWSUq7EFQI6s7VF2MCtucb7OHpjxOGZFPLVDro0-aI4KCt2e2PvyoiQ9iJ5oJa-XL-qEUvjAy2qZuVNsgc2O1lee3cOdL9QYWUCsxFn2YxwA3S-FYFwL20s6Lkg40hhtkgpqgETFMx9QnVhBhMPSNFdhSaWgj0K-O6oAY4VdlyhZLnHirDexYqAOlOsYUDxSBpWdff-0-5fsqaDbgjQE3J47Y2Eiqr1_SLSNxKUvg0kUoso_DFda-3Tka5x343KyUb_A4Ewj8AM35FRL0_kHZMG1TJvA8xR1_JivP1fi7ww5ZiYgUlT8ByHwQZVuAllvK5n2PSxr-IvqWIb0cjMkmAZLncBR_i6O-tHcddcazpFb6kZiwXOu4BEelsyuVbN71XRYglW4Xhm1z_lhz16wCwuEErpPjm8B18lr2rrVV01kwEtwDfMYiLeYpV3kU',
  },
}

module.exports = nextConfig
