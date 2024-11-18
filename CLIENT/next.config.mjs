/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost', // Permitir imágenes desde el servidor local
        pathname: '/uploads/**', // Asegúrate de que las imágenes estén en la ruta correcta
      },
    ],
  },
};

export default nextConfig;
