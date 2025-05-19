import Map from "@/components/map";
import { LocationsList } from "@/components/locations-list";
import { mockMediaPoints } from "@/lib/data/mock-locations";

export default function Home() {
  return (
    <div className="w-full h-full">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="h-[400px] fixed top-[4rem] left-0 w-full">
          <Map />
        </div>
        <div className="bg-background mt-[300px] z-10 relative rounded-t-3xl  shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pt-2 pb-4">
          <LocationsList locations={mockMediaPoints} />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-[calc(100vh-4rem)]">
        <div className="w-1/2 overflow-y-auto bg-background rounded-r-3xl p-4">
          <LocationsList locations={mockMediaPoints} />
        </div>
        <div className="w-1/2">
          <Map />
        </div>
      </div>
    </div>
  );
}
