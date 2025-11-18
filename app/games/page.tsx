"use client";

import { useState } from "react";
import DragDropGame, { ImageItem } from "../components/drag-drop-game";
import { Button } from "@/components/ui/button";

export type Region = "south" | "north" | "central";

export default function GamesPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  // Get images based on selected region
  const getImages = (region: Region | null): ImageItem[] => {
    const wrongMessages = [
      "Ồ! Chưa đúng rồi. Hãy thử lại nhé!",
      "Không phải vị trí này! Hãy thử vị trí khác.",
      "Hmm, có vẻ không đúng. Hãy thử lại!",
      "Gần đúng rồi, nhưng chưa hoàn toàn! Tiếp tục khám phá nhé!",
      "Chưa đúng! Đừng bỏ cuộc!",
    ];
    
    const hintMessages = [
      "Hãy suy nghĩ xem vật này thuộc về đâu một cách tự nhiên.",
      "Nhìn vào mẫu và xem nó phù hợp nhất ở đâu.",
      "Hãy xem xét thứ tự và sắp xếp một cách cẩn thận.",
      "Hãy thử nghĩ về trình tự.",
      "Chú ý đến bố cục và cấu trúc.",
    ];

    if (region === "south") {
      return [
        { id: "image-1", src: "/den-cay.svg", alertTitle: "Tốt lắm!", alertMessage: "Xin chào", wrongPositionMessage: wrongMessages[0], hintMessage: hintMessages[0] },
        { id: "image-2", src: "/hoa-qua.svg", alertTitle: "Good!", alertMessage: "Hello", wrongPositionMessage: wrongMessages[2], hintMessage: hintMessages[2] },
        { id: "image-3", src: "/binh-bong.svg", alertTitle: "Good!", alertMessage: "Hello", wrongPositionMessage: wrongMessages[1], hintMessage: hintMessages[1] },
        { id: "image-4", src: "/den-cay.svg", alertTitle: "Good!", alertMessage: "Hello", wrongPositionMessage: wrongMessages[4], hintMessage: hintMessages[3] },
      ];
    } else if (region === "north") {
      return [
        { id: "image-1", src: "/den-cay.svg", alertTitle: "Tốt lắm!", alertMessage: "Xin chào", wrongPositionMessage: wrongMessages[0], hintMessage: hintMessages[0] },
        { id: "image-2", src: "/vang.svg", alertTitle: "Good!", alertMessage: "Hello", wrongPositionMessage: wrongMessages[3], hintMessage: hintMessages[3] },
        { id: "image-3", src: "/mam-ngu-qua.svg", alertTitle: "Good!", alertMessage: "Hello", wrongPositionMessage: wrongMessages[1], hintMessage: hintMessages[1] },
        { id: "image-4", src: "/nuoc.svg", alertTitle: "Good!", alertMessage: "Hello", wrongPositionMessage: wrongMessages[2], hintMessage: hintMessages[2] },
        { id: "image-5", src: "/binh-bong.svg", alertTitle: "Good!", alertMessage: "Hello", wrongPositionMessage: wrongMessages[0], hintMessage: hintMessages[0] },
        { id: "image-6", src: "/den-cay.svg", alertTitle: "Good!", alertMessage: "Hello", wrongPositionMessage: wrongMessages[4], hintMessage: hintMessages[4] },
      ];
    } else {
      return [
        { id: "image-1", src: "/den-cay.svg", alertTitle: "Tốt lắm!", alertMessage: "Xin chào", wrongPositionMessage: wrongMessages[0], hintMessage: hintMessages[0] },
        { id: "image-2", src: "/mam-ngu-qua.svg", alertTitle: "Good!", alertMessage: "Hello", wrongPositionMessage: wrongMessages[1], hintMessage: hintMessages[1] },
        { id: "image-3", src: "/nuoc.svg", alertTitle: "Good!", alertMessage: "Hello", wrongPositionMessage: wrongMessages[2], hintMessage: hintMessages[2] },
        { id: "image-4", src: "/hop-trau-cau.svg", alertTitle: "Good!", alertMessage: "Hello", wrongPositionMessage: wrongMessages[3], hintMessage: hintMessages[3] },
        { id: "image-5", src: "/hoa-thanh-tien.svg", alertTitle: "Good!", alertMessage: "Hello", wrongPositionMessage: wrongMessages[0], hintMessage: hintMessages[0] },
        { id: "image-6", src: "/den-cay.svg", alertTitle: "Good!", alertMessage: "Hello", wrongPositionMessage: wrongMessages[4], hintMessage: hintMessages[4] },
      ];
    }
  };

  return (
    <>
      <div className="min-h-screen w-full relative responsive-background">
        {/* Game content on top */}
        <div className="h-screen relative z-10">
          {!selectedRegion ? (
            <div className="flex items-center justify-center h-full">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 max-w-2xl w-full mx-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8">
                  Chọn một Vùng
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                  <Button
                    onClick={() => setSelectedRegion("south")}
                    size="lg"
                    className="text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10"
                  >
                    Miền Nam
                  </Button>
                  <Button
                    onClick={() => setSelectedRegion("north")}
                    size="lg"
                    className="text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10"
                  >
                    Miền Bắc
                  </Button>
                  <Button
                    onClick={() => setSelectedRegion("central")}
                    size="lg"
                    className="text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10"
                  >
                    Miền Trung
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-10 lg:left-10 z-30">
                <Button
                  onClick={() => setSelectedRegion(null)}
                  variant="outline"
                  className="bg-white/90 backdrop-blur-sm"
                >
                  ← Quay lại Chọn Vùng
                </Button>
              </div>
              <DragDropGame images={getImages(selectedRegion)} region={selectedRegion} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
