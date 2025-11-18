"use client";

import SouthDragDropGame from "./regions/south";
import NorthDragDropGame from "./regions/north";
import CentralDragDropGame from "./regions/central";
import { ImageItem } from "@/types/types";

export type Region = "south" | "north" | "central";

export type { ImageItem };

interface DragDropGameProps {
  images: ImageItem[];
  region: Region;
}

export default function DragDropGame({ images, region }: DragDropGameProps) {
  if (region === "south") {
    return <SouthDragDropGame images={images} />;
  } else if (region === "north") {
    return <NorthDragDropGame images={images} />;
  } else {
    return <CentralDragDropGame images={images} />;
  }
}
