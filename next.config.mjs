/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https', // Define o protocolo que as URLs de imagem devem usar (https no caso)
                hostname: 'utfs.io', // Especifica o domínio do qual as imagens podem ser carregadas
                // Se necessário, você pode adicionar outros campos, como port ou pathname
            }
        ]
    }
};

export default nextConfig;
