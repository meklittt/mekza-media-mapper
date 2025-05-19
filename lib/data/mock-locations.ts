export type MediaPoint = {
  id: string;
  longitude: number;
  latitude: number;
  title: string;
  description: string;
  mediaType: "image" | "video" | "audio" | "text";
  url?: string;
};

// Mock data points for the map
export const mockMediaPoints: MediaPoint[] = [
  {
    id: "1",
    longitude: -87.07467390219468,
    latitude: 45.26084693242909,
    title: "Door County",
    description: "Door County is a peninsula in the northeastern corner of Wisconsin, United States.",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1630283922235-a97c7bef05f4?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    longitude: -6.849736139043514,
    latitude: 34.02699608987469,
    title: "Quartier de L'Ocean",
    description: "Quartier de L'Ocean is a neighborhood in the city of Rabat, Morocco.",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1706203644201-67b62fbd62c6?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    longitude: -68.81279395766443,
    latitude: 44.38331980132722,
    title: "Castine",
    description: "Castine is a town in the state of Maine, United States.",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1570845178262-d868c01e72bb?auto=format&fit=crop&w=400&q=80",
  }
];