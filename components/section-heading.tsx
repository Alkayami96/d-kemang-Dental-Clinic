import { cn } from '@/lib/utils'
import { Stagger, StaggerItem } from '@/components/motion'

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  id?: string
  className?: string
}) {
  return (
    <Stagger className={cn('flex max-w-2xl flex-col gap-3', className)} stagger={0.1}>
      <StaggerItem>
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
          <span className="h-px w-6 rounded-full bg-gold" aria-hidden="true" />
          {eyebrow}
        </span>
      </StaggerItem>
      <StaggerItem>
        <h2 id={id} className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
      </StaggerItem>
      {description && (
        <StaggerItem>
          <p className="text-pretty leading-relaxed text-muted-foreground">{description}</p>
        </StaggerItem>
      )}
    </Stagger>
  )
}
