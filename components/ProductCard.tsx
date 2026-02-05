import { formatCurrency } from "@/lib/formatters"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

type ProductCardProps = {
  id: string
  name: string
  priceInCents: number
  description: string
  imagePath: string
}

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden border-0 flex flex-col shadow-xl">
      <div className="relative w-full aspect-4/3 bg-gray-100">
        <Image
          src={imagePath}
          alt={name}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/60 text-md font-semibold px-3 py-1 rounded-full shadow-md">
          {formatCurrency(priceInCents / 100)}
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-base">{name}</CardTitle>
        <CardDescription className="text-sm line-clamp-2 text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="grow">
        {/* option: short excerpt if you want more control */}
      </CardContent>

      <CardFooter>
        <Button asChild size="lg" className="w-full transition-all duration-200 hover:-translate-y-1 hover:bg-gray-900 hover:text-white" variant="outline">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <div className="w-full aspect-4/3 bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-5 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-full h-3 rounded-full bg-gray-300 mt-2" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-3 rounded-full bg-gray-300" />
        <div className="w-full h-3 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg" />
      </CardFooter>
    </Card>
  )
}