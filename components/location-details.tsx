"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CircleX, ZoomIn } from "lucide-react";
import { MediaPoint } from "@/lib/data/mock-media";
import { Metric } from "@/components/metric";
import { useSearchParams } from "next/navigation";

interface LocationDetailsProps {
  data: MediaPoint[];
}

const CONTAINER_CLASS = {
  visible:
    "shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] mt-[300px] bg-background z-10 relative rounded-t-3xl rounded-b-none md:mt-0 md:absolute md:top-4 md:max-h-[calc(100vh-7rem)] md:rounded-xl md:overflow-y-auto lg:w-[calc(100%-1rem)] md:shadow-2xl md:w-3/5 md:top-4 md:left-4 lg:top-10 lg:left-10 lg:w-1/2  xl:w-1/3",
  hidden: "shadow-none h-0 mt-0",
};

export function LocationDetails({ data }: LocationDetailsProps) {
  const searchParams = useSearchParams();
  const mediaPointId = searchParams.get("mediaPointId");

  const selectedMediaPoint = mediaPointId
    ? data.find((point) => point.id === mediaPointId)
    : null;

  function handleClose() {
    window.history.pushState({}, "", "/");
  }

  if (!selectedMediaPoint) return null;

  return (
    <Card
      className={`${
        mediaPointId ? CONTAINER_CLASS.visible : CONTAINER_CLASS.hidden
      }`}
    >
      <CardHeader>
        <Badge className="capitalize" variant="secondary">
          {selectedMediaPoint?.media_type}
        </Badge>
        <div className="flex justify-between gap-1">
          <div>
            <CardTitle className="text-2xl font-bold">
              {selectedMediaPoint?.title} ({selectedMediaPoint?.year})
            </CardTitle>
            <p className="text-lg text-muted-foreground">
              Created by {selectedMediaPoint?.creator}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-11"
            onClick={handleClose}
          >
            <CircleX className="size-6" />
          </Button>
        </div>

        {selectedMediaPoint?.media_thumbnail_url && (
          <div className="relative w-full h-50 mt-2">
            <Image
              src={selectedMediaPoint.media_thumbnail_url || ""}
              alt={selectedMediaPoint.title}
              fill
              className="object-cover rounded"
            />
          </div>
        )}
        <Button variant="default" className="w-full mt-2">
          <ZoomIn />
          Zoom To
        </Button>
      </CardHeader>
      <CardContent>
        <Metric label="Language" value={selectedMediaPoint?.language} />
        <Metric
          label="Summary"
          value={selectedMediaPoint?.description}
          className="mt-4"
        />
        <Metric
          label="Nearest Municipality"
          value={`${selectedMediaPoint?.city}, ${selectedMediaPoint?.country}`}
          className="mt-4"
        />

        <Metric
          label="Subjects"
          value={selectedMediaPoint?.subjects}
          className="mt-4"
        />

        <Metric
          href={selectedMediaPoint?.rights_url}
          label="Media Rights"
          value={selectedMediaPoint?.rights}
          className="mt-4"
        />

        <div className="flex justify-end mt-6 ">
          <Button
            variant="outline"
            className="hidden md:flex "
            onClick={handleClose}
          >
            Close
            <CircleX />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
