import { Barbershop } from "@prisma/client" // Importando Barbershop
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"

interface BarbershopProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopProps) => {
  return (
    <Card className="min-w-[165px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        {/* Adicione o conteúdo do CardContent aqui */}
        <div className="relative h-[159px] w-full">
          <Image
            alt={barbershop.name}
            fill
            className="rounded-2xl object-cover"
            src={barbershop.imageUrl}
          />
          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-medium">5,0</p>
          </Badge>
        </div>
        {/*Texto */}
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button variant="secondary" className="mt-3 w-full">
            Reserva
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
