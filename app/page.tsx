import Map from "@/components/map";
import { mockMediaPoints } from "@/lib/data/mock-media";
import { LocationDetails } from "@/components/location-details";

export default async function Home() {
  return (
    <div className="w-full h-full">
      {/* Desktop Layout */}
      <div className="relative">
        <LocationDetails data={mockMediaPoints} />

        <div className="fixed top-[4rem] left-0 w-full h-[calc(100vh-4rem)] lg:relative lg:top-0">
          <Map data={mockMediaPoints} />
        </div>
      </div>
    </div>
  );
}
