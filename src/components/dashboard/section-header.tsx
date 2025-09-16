import type { ReactNode } from "react"

interface SectionHeaderProps {
  title: string
  description?: string
  icon?: ReactNode
  actions?: ReactNode
}

export const SectionHeader = ({ title, description, icon, actions }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-heading font-bold flex items-center gap-2 text-foreground">
          {icon}
          {title}
        </h2>
        {description && <p className="text-muted-foreground text-sm mt-1">{description}</p>}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  )
}
