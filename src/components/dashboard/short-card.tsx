import { Badge } from "@/components/ui/badge"

interface ShortCardProps {
  short: {
    id: string
    title: string
    thumbnail: string
    viewCount: string
    category: string
  }
}

export const ShortCard = ({ short }: ShortCardProps) => {
  return (
    <div className="flex-shrink-0 cursor-pointer group">
      <div className="w-[180px] space-y-3">
        <div className="aspect-[9/16] relative bg-black rounded-xl overflow-hidden hover:shadow-lg transition-all">
          <img
            src={short.thumbnail || "/placeholder.svg"}
            alt={short.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>

        <div className="space-y-2 px-1">
          <h4 className="text-foreground text-sm font-medium line-clamp-2 leading-tight">{short.title}</h4>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs font-medium">{short.viewCount}</span>
            <Badge variant="secondary" className="text-xs bg-muted hover:bg-muted/80">
              {short.category}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
