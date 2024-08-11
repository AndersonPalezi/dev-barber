import { SearchIcon } from "lucide-react" // importando o iconede buscar do react
import Header from "./_components/header" //importando o compenente Header para renderizar
import { Button } from "./_components/ui/button" //importando o button do shadcn
import { Input } from "./_components/ui/input" // importando o Input do dhadcn
import Image from "next/image" // importando Componete Image
import { Card, CardContent } from "./_components/ui/card" //importando o component card e  card content
import { db } from "./_lib/prisma" // importando db do prisma
import BarbershopItem from "./_components/barbeshop-item" // imporatndo  o componente barbershopitem
import { quickSeachOptions } from "./_constants/search" //importanto o componente de busca
import BookingItem from "./_components/booking-item" //importando o componente de agendamento

//Pagina principal
const Home = async () => {
  //chamando banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
      <Header />
      <div className="p-5">
        <h1 className="text-2xl font-bold text-violet-600">
          Ola, Anderson Palezi!
        </h1>
        <p>Quinta-feira, 08 de agosto.</p>
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Serviçes..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>
        {/*Busca rapida funçao serviçe */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSeachOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}
        </div>
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="banner"
            src="/banner.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        {/*Agendamento esquerda */}
        <BookingItem />
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-violet-600">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        {/*Populares */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      <footer>
        <Card>
          <CardContent className="px-6 py-6">
            &copy; 2024 Copyright <span className="font-bold">FSW Barber</span>
            <br />
            <p className="text-xs">
              Anderson Palezi{" "}
              <strong className="font-serif text-sm text-violet-600">
                frontendPalezi@hotmail.com
              </strong>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home
