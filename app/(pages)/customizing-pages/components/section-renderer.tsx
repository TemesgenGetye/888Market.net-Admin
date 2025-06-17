import { Button } from "@/components/ui/button"

import type { SectionType } from "../types/page-types"

interface SectionRendererProps {
  section: SectionType
}

export function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.type) {
    case "hero":
      return (
        <div className="space-y-4">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg bg-muted">
            <img
              src={section.image || "/placeholder.svg?height=600&width=1200"}
              alt={section.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-6 text-center text-white">
              <h2 className="text-3xl font-bold">{section.title}</h2>
              {section.subtitle && <p className="mt-2 text-xl">{section.subtitle}</p>}
              {section.buttonText && (
                <Button className="mt-4" variant="secondary">
                  {section.buttonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      )

    case "text":
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{section.title}</h2>
          <div className="prose max-w-none">
            <p>{section.content}</p>
          </div>
        </div>
      )

    case "text-with-image":
      return (
        <div
          className={`flex flex-col gap-6 md:flex-row ${
            section.imagePosition === "right" ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <div className="prose max-w-none">
              <p>{section.content}</p>
            </div>
          </div>
          <div className="flex-1">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
              <img
                src={section.image || "/placeholder.svg?height=400&width=600"}
                alt={section.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      )

    case "gallery":
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{section.title}</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg bg-muted">
                <img
                  src={`/placeholder.svg?height=300&width=300&text=Image ${i + 1}`}
                  alt={`Gallery image ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return <div>Unknown section type</div>
  }
}
