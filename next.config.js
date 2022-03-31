/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        // destination: "https://meetry.herokuapp.com/:path*"
        destination: "http://127.0.0.1:8080/:path*"
      }
    ]
  }
}
