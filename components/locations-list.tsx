import Image from "next/image";
import { MediaPoint } from "@/lib/data/mock-locations";

interface LocationsListProps {
  locations: MediaPoint[];
}

export function LocationsList({ locations }: LocationsListProps) {
  return (
    <section>
      <div className="flex items-center justify-center mb-2">
        <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
          Media
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pb-2">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="bg-background border-1 rounded-xl shadow-md relative"
          >
            <div className="relative w-full h-40 rounded-t-xl overflow-hidden">
              <Image
                src={loc.url || ""}
                alt={loc.title}
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>
            <div className="p-3">
              <h6 className="font-bold text-lg">{loc.title}</h6>
              <p className="text-muted-foreground text-sm truncate">
                {loc.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
