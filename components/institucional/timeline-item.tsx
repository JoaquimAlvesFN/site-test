import { cn } from "@/lib/utils"

interface TimelineItemProps {
  year: string
  title: string
  description: string
  position: "left" | "right"
}

export function TimelineItem({ year, title, description, position }: TimelineItemProps) {
  return (
    <div className={cn("relative", position === "left" ? "md:ml-auto md:mr-[50%] md:pr-8" : "md:ml-[50%] md:pl-8")}>
      {/* Dot */}
      <div className="absolute w-4 h-4 bg-[#E30613] rounded-full left-[-34px] md:left-auto md:top-6 md:ml-[-8px]"></div>

      {/* Content */}
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm">
        <div className="inline-block bg-[#00205B] text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
          {year}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

