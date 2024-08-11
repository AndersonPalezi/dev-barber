import { db } from "@/app/_lib/prisma" // Importa a instância do cliente Prisma para interagir com o banco de dados.
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react" // Importa ícones da biblioteca 'lucide-react' para uso na interface do usuário.
import Image from "next/image" // Importa o componente 'Image' do Next.js para otimização de imagens.
import { Button } from "@/app/_components/ui/button" // Importa um componente de botão personalizado da pasta de componentes UI.
import Link from "next/link" // Importa o componente 'Link' do Next.js para navegação entre páginas.
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string // Define que o parâmetro 'id' é uma string, representando o identificador da barbearia.
  }
}
const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  // Chama o banco de dados para encontrar uma barbearia com o identificador fornecido
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id, // Utiliza o identificador passado nos parâmetros para buscar a barbearia correspondente
    },
    include: {
      services: true,
    },
  }) // Aqui você pode adicionar o código para renderizar a página com os dados da barbearia
  if (!barbershop) {
    return notFound()
  } // Se a barbearia não for encontrada, exibe a mensagem de página não encontrada

  const imageUrl = barbershop?.imageUrl // Obtém a URL da imagem do objeto 'barbershop', se disponível
  return (
    <div>
      {/*IMAGEM */}
      <div className="relative h-[250px] w-full">
        <Image
          src={
            typeof imageUrl === "string"
              ? imageUrl
              : "/path/to/default-image.jpg"
          } // Define a URL da imagem. Usa uma imagem padrão se 'imageUrl' não for uma string válida.
          alt={barbershop?.name || "Imagem do barbearia"} // Define o texto alternativo da imagem. Usa o nome do barbearia se disponível, caso contrário, usa um texto padrão.
          layout="fill" // Faz a imagem preencher todo o espaço do contêiner pai, ajustando o tamanho da imagem automaticamente.
          objectFit="cover" // Garante que a imagem cubra completamente o contêiner, mantendo a proporção e cortando a imagem se necessário.
          className="absolute inset-0" // Posiciona a imagem absolutamente em relação ao contêiner pai e faz com que ela preencha todo o espaço do contêiner.
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>
      <div className="border-b border-solid p-5">
        <h1 className="mb-4 text-xl font-bold">{barbershop?.name}</h1>
        {/* Cabeçalho com nome da barbearia */}
        <div className="mb-2 flex items-center gap-1">
          {/* Ícone de localização com endereço da barbearia */}
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="fill-primary text-primary" size={18} />
          {/* Ícone de avaliação com nota e número de avaliações */}
          <p className="text-sm">5,0 (678 avaliaçoes)</p>
        </div>
      </div>
      {/* Seção de descrição sobre a barbearia */}
      <div className="border-b border-solid p-5">
        <h2 className="mb-2 font-semibold uppercase text-violet-500">
          SOBRE NÓS
        </h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>
    </div>
  )
}

export default BarbershopPage
