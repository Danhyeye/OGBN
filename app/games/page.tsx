"use client";

import { useState } from "react";
import DragDropGame, { ImageItem } from "../components/drag-drop-game";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
        {
          id: "image-1",
          src: "/den-cay.svg",
          alertTitle: "Bộ tam sự",
          alertMessage:
            "Bộ đỉnh đồng và đôi đèn biểu tượng cho sự giao hòa hai cõi: đỉnh dùng để thắp trầm, đôi đèn/nến thắp lên nguồn sáng vĩnh hằng, dẫn đường và giữ ấm không gian thờ tự; ngọn đèn dầu thường được châm cháy liu riu để duy trì linh khí.",
          wrongPositionMessage: wrongMessages[0],
          hintMessage: hintMessages[0],
        },
        {
          id: "image-2",
          src: "/hoa-qua.svg",
          alertTitle: "Chò trái cây",
          alertMessage:
            "Chò là vật dụng quen thuộc để trưng mâm quả. Trên chò thường bày ‘Cầu Dừa Đủ Xài Sung’ (mãng cầu, dừa, đu đủ, xoài, sung) tượng trưng ngũ phúc: phú, quý, thọ, khang, ninh. Dịp Tết còn có bưởi, mãng cầu xiêm, dưa hấu, cam, quýt… thể hiện mong cầu đủ đầy.",
          wrongPositionMessage: wrongMessages[2],
          hintMessage: hintMessages[2],
        },
        {
          id: "image-3",
          src: "/binh-bong.svg",
          alertTitle: "Bình hoa",
          alertMessage:
            "Miền Nam thường áp dụng nguyên tắc “Hữu Bình Tả Quả” hoặc “Song quả độc bình” (hai mâm trái cây, một bình hoa). Hoa vạn thọ, huệ, mai vàng hay sen được ưu ái vì sắc thanh nhã và ý nghĩa cát tường.",
          wrongPositionMessage: wrongMessages[1],
          hintMessage: hintMessages[1],
        },
        {
          id: "image-4",
          src: "/den-cay.svg",
          alertTitle: "Bộ tam sự",
          alertMessage:
          "Bộ đỉnh đồng và đôi đèn biểu tượng cho sự giao hòa hai cõi: đỉnh dùng để thắp trầm, đôi đèn/nến thắp lên nguồn sáng vĩnh hằng, dẫn đường và giữ ấm không gian thờ tự; ngọn đèn dầu thường được châm cháy liu riu để duy trì linh khí.",
        wrongPositionMessage: wrongMessages[0],
          hintMessage: hintMessages[3],
        },
      ];
    } else if (region === "north") {
      return [
        {
          id: "image-1",
          src: "/den-cay.svg",
          alertTitle: "Bộ ngũ sự",
          alertMessage:
            "Đỉnh đồng, đôi hạc cưỡi rùa và hai chân đèn kết thành bộ ngũ sự giúp cân bằng ngũ hành (Kim, Mộc, Thủy, Hỏa, Thổ), thu hút vượng khí, tài lộc, may mắn và bình an cho gia đình.",
          wrongPositionMessage: wrongMessages[0],
          hintMessage: hintMessages[0],
        },
        {
          id: "image-2",
          src: "/vang.svg",
          alertTitle: "Vàng mã",
          alertMessage:
            "Quan niệm \"trần sao âm vậy\" khiến người xưa chôn theo đồ dùng của người mất; về sau được thay bằng giấy tiền vàng mã để hóa trong các dịp cúng bái.",
          wrongPositionMessage: wrongMessages[3],
          hintMessage: hintMessages[3],
        },
        {
          id: "image-3",
          src: "/mam-ngu-qua.svg",
          alertTitle: "Mâm ngũ quả",
          alertMessage:
            "Nải chuối tượng hình bàn tay Phật che chở con người qua vạn sự bình an, kết hợp thêm bưởi, cam, quýt, đào, lê hay những quả như thanh long, dưa hấu, phật thủ... tạo nên mâm ngũ sắc biểu trưng cho phúc lộc đủ đầy.",
          wrongPositionMessage: wrongMessages[1],
          hintMessage: hintMessages[1],
        },
        {
          id: "image-4",
          src: "/nuoc.svg",
          alertTitle: "Chóe: gạo – nước – muối",
          alertMessage:
            "Gạo được xem là hạt ngọc của trời, thể hiện lòng biết ơn với thần đã mang đến nền văn minh lúa nước. Muối tượng trưng cho sự trong sạch và ý chí mạnh mẽ, gửi gắm mong ước no đủ, hưng thịnh. Nước mang ý nghĩa thanh cao, thuần khiết. Chóe thờ đựng nước ở giữa, hai chóe đựng muối và gạo đặt hai bên cùng ba bát hương: bát giữa thờ thần linh, bát phải thờ gia tiên năm đời, bát trái thờ Bà Cô Ông Mãnh.",
          wrongPositionMessage: wrongMessages[2],
          hintMessage: hintMessages[2],
        },
        {
          id: "image-5",
          src: "/binh-bong.svg",
          alertTitle: "Bình bông",
          alertMessage:
            "Nhiều nơi tuân theo nguyên tắc Đông Bình Tây Quả hoặc sắp xếp đối xứng để hài hòa không gian bàn thờ. Bình thường cắm các loài hoa thanh khiết, phù hợp nghi lễ truyền thống.",
          wrongPositionMessage: wrongMessages[0],
          hintMessage: hintMessages[0],
        },
        {
          id: "image-6",
          src: "/den-cay.svg",
          alertTitle: "Bộ ngũ sự",
          alertMessage:
            "Đỉnh đồng, đôi hạc cưỡi rùa và hai chân đèn kết thành bộ ngũ sự giúp cân bằng ngũ hành (Kim, Mộc, Thủy, Hỏa, Thổ), thu hút vượng khí, tài lộc, may mắn và bình an cho gia đình.",
          wrongPositionMessage: wrongMessages[4],
          hintMessage: hintMessages[4],
        },
      ];
    } else {
      return [
        {
          id: "image-1",
          src: "/den-cay.svg",
          alertTitle: "Bộ tam sự",
          alertMessage:
            "Bộ tam sự gồm đỉnh đồng và đôi đèn/nến: đỉnh dùng để thắp trầm, đôi đèn tượng trưng nguồn sáng vĩnh hằng dẫn đường và kết nối hai cõi. Ngọn đèn dầu thường được giữ cháy liu riu để duy trì linh khí trên bàn thờ.",
          wrongPositionMessage: wrongMessages[0],
          hintMessage: hintMessages[0],
        },
        {
          id: "image-2",
          src: "/mam-ngu-qua.svg",
          alertTitle: "Mâm ngũ quả",
          alertMessage:
            "Khác với miền Nam, bàn thờ miền Trung luôn bày chuối như bàn tay Phật nâng đỡ gia đình; các loại quả còn lại là quả mọng, ngọt, hàm ý sum vầy và đủ đầy.",
          wrongPositionMessage: wrongMessages[1],
          hintMessage: hintMessages[1],
        },
        {
          id: "image-3",
          src: "/nuoc.svg",
          alertTitle: "Lư hương",
          alertMessage:
            "Có thể đặt một hoặc ba bát hương nhưng vị trí luôn ở chính giữa bàn thờ để giữ mạch kết nối giữa thần linh và gia tiên.",
          wrongPositionMessage: wrongMessages[2],
          hintMessage: hintMessages[2],
        },
        {
          id: "image-4",
          src: "/hop-trau-cau.svg",
          alertTitle: "Trầu cau",
          alertMessage:
            "Trầu cau là biểu tượng văn hóa Việt; khi nhai cùng vôi tạo sắc đỏ thắm tượng trưng cho sự sum vầy và may mắn nên luôn có mặt trên bàn thờ.",
          wrongPositionMessage: wrongMessages[3],
          hintMessage: hintMessages[3],
        },
        {
          id: "image-5",
          src: "/hoa-thanh-tien.svg",
          alertTitle: "Hoa Thanh Tiên",
          alertMessage:
            "Loài hoa sinh ra từ sự khắc nghiệt miền Trung, mỏng manh nhưng chứa đựng ý nghĩa sau sắc: 3 bông lớn tượng trưng Tam Cương (Trung – Hiếu – Nghĩa) và 5 bông nhỏ tượng trưng Ngũ Thường (Nhân – Lễ – Nghĩa – Trí – Tín). Hoa Thanh Tiên trân trọng trưng trên bàn thờ gia tiên, bàn thờ Táo Quân và các am thờ trong gia đình người Huế.",
          wrongPositionMessage: wrongMessages[0],
          hintMessage: hintMessages[0],
        },
        {
          id: "image-6",
          src: "/den-cay.svg",
          alertTitle: "Ngọn đèn dầu",
          alertMessage:
            "Ngọn đèn dầu luôn cháy nhẹ giữ lửa thiêng, biểu trưng cho ánh sáng dẫn đường và lời nhắc nhớ về tổ tiên.",
          wrongPositionMessage: wrongMessages[4],
          hintMessage: hintMessages[4],
        },
      ];
    }
  };

  return (
    <>
      <div className="min-h-screen w-full relative responsive-background">
        <Image
          src="/game-screen.svg"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover pointer-events-none select-none"
        />
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
              <DragDropGame
                images={getImages(selectedRegion)}
                region={selectedRegion}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
