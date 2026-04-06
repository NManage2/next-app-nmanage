/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ⚠️ Cela permettra au build de finir même s'il reste des erreurs de type
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
