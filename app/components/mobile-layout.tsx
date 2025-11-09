"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function MobileLayout({ className }: { className?: string }) {
  return (
    <div className={`relative w-full ${className || ""}`}>
      <div className="relative min-h-screen w-full overflow-hidden bg-[#FDD835] flex flex-col pb-[150px] z-20">
        <header className="pt-6 pl-6 z-10">
          <Image
            src="/images/main-logo.webp"
            alt="Logo"
            width={120}
            height={60}
            className="h-10 w-auto"
            priority
          />
        </header>

        <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full">
          <Image
            src="/images/main-logo.webp"
            alt="Logo"
            width={300}
            height={400}
            className="mx-auto object-contain max-h-[20vh] w-auto"
            priority
          />

          <div className="relative w-full mt-auto">
            <div className="relative z-10 w-full">
              <Image
                src="/images/anhongba.svg"
                width={1200}
                height={600}
                alt="Bàn thờ"
                className="h-auto w-full object-contain max-h-[50vh] md:max-h-[55vh]"
                priority
              />
            </div>

            <div className="relative z-20 w-full -translate-y-8">
              <Image
                src="/images/canhbantho.svg"
                width={1900}
                height={300}
                alt="Cạnh bàn thờ"
                className="h-auto w-full object-contain scale-110 md:scale-125"
                priority
              />
            </div>

            <div className="absolute bottom-0 right-0 z-50 flex items-end justify-end gap-2 translate-y-[130px] translate-x-2 pointer-events-none w-full max-w-7xl mx-auto">
              <div className="w-[55%] shrink-0 pl-6 relative z-50">
                <Image
                  src="/images/main-logo.webp"
                  alt="Logo"
                  width={250}
                  height={250}
                  className="h-auto w-full max-w-[250px] object-contain pointer-events-auto relative z-50"
                  priority
                />
              </div>
              <div className="w-[45%] shrink-0 flex justify-end relative z-50">
                <Image
                  src="/images/nguoichaptay.svg"
                  width={180}
                  height={360}
                  alt="Người chấp tay"
                  className="h-auto w-full max-w-[280px] md:max-w-[320px] object-contain pointer-events-auto translate-y-24 md:translate-y-32 relative z-50"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full bg-[#FD7233] z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-white font-black text-2xl md:text-3xl mb-4">
                Tổng quan
              </h2>
              <p className="text-white text-sm md:text-base leading-relaxed">
                Tiếp nối nội dung từ dự án Ông Gánh Bà Nâng. Workshop "..."
                chính là nơi tái hiện lại bàn thờ ba miền giúp hiểu thêm ý nghĩa
                của việc thờ cúng gia tiên một cách trực quan. Đặc biệt, trực
                tiếp thực hành bài trí các vật phẩm thờ cúng cũng như tự tay làm
                ra một vật phẩm thờ cúng đặc trưng của mỗi vùng miền.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-white font-bold text-xl md:text-2xl mb-4">
                Workshop được diễn ra trong 3 ngày:
              </h3>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                  <h4 className="text-white font-bold text-lg md:text-xl mb-2">
                    Ngày 21/11/2025:
                  </h4>
                  <p className="text-white text-sm md:text-base leading-relaxed">
                    Tìm hiểu về đặc trưng thờ cúng tổ tiên miền Nam và workshop
                    làm tranh kiếng
                  </p>
                  <p className="text-white text-xs md:text-sm italic mt-2">
                    (Loại tranh thờ đặc trưng ở miền Nam)
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                  <h4 className="text-white font-bold text-lg md:text-xl mb-2">
                    Ngày 22/11/2025:
                  </h4>
                  <p className="text-white text-sm md:text-base leading-relaxed">
                    Tìm hiểu về đặc trưng thờ cúng tổ tiên miền Bắc và workshop
                    làm vàng mã
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                  <h4 className="text-white font-bold text-lg md:text-xl mb-2">
                    Ngày 23/11/2025:
                  </h4>
                  <p className="text-white text-sm md:text-base leading-relaxed">
                    Tìm hiểu về đặc trưng thờ cúng tổ tiên miền Trung và
                    workshop làm hoa giấy Thanh Tiên
                  </p>
                  <p className="text-white text-xs md:text-sm italic mt-2">
                    (Loại hoa thờ đặc trưng ở Huế)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
              <div className="space-y-3">
                <p className="text-white font-bold text-base md:text-lg">
                  Thời gian: 21/11/2025 - 23/11/2025
                </p>
                <p className="text-white font-bold text-base md:text-lg">
                  Địa điểm: Bảo Tàng TP.HCM (65 Lý Tự Trọng, Bến Nghé, Quận 1,
                  Thành phố Hồ Chí Minh)
                </p>
              </div>
            </div>

            <div className="pt-6 sm:pt-8 md:pt-10">
              <button className="bg-red-600 text-white font-bold text-sm sm:text-base md:text-lg px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl drop-shadow-[2px_2px_0px_rgba(255,255,255,1)] hover:bg-red-700 active:bg-red-800 transition-colors duration-200 w-full">
                ĐĂNG KÝ MIỄN PHÍ NGAY BÊN DƯỚI
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <Image
          src="/images/ogbnlogo.svg"
          alt="Texture background"
          width={2880}
          height={3240}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          priority
        />
        <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto flex flex-col gap-4 items-center justify-center">
            <h2 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-[200px] text-[#FD7233]">
              Hoạt động
            </h2>
            <h1 className="rounded-lg text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#FD7233] text-center">
              CÓ GÌ TẠI "BIẾT ƠN LÀ BIẾT EARN" ?
            </h1>
            <div className="w-full">
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    ĐẶC TRƯNG THỜ CÚNG MIỀN NAM (21/11)
                  </AccordionTrigger>
                  <AccordionContent className="border-l border-r border-b border-black">
                    <p className="text-sm montserrat-400">
                      ĐẶC TRƯNG THỜ CÚNG MIỀN NAM Miền Nam là vùng đất "tứ xứ",
                      nơi hội tụ và giao thoa văn hóa mạnh mẽ giữa các cộng đồng
                      người Kinh, Hoa và Khmer. Dù mang theo truyền thống từ
                      cuộc "mở cõi" ở miền Bắc và miền Trung, người dân Nam Bộ
                      vẫn giữ gìn trọn vẹn nếp thờ cúng tổ tiên qua bao thăng
                      trầm lịch sử. Chính sự hòa quyện văn hóa độc đáo này đã
                      tạo nên một bản sắc thờ cúng riêng biệt, thể hiện qua cả
                      các nghi lễ lẫn những vật phẩm thờ tự phong phú, rực rỡ.
                      Hãy cũng tụi mình tìm hiểu kĩ hơn vào vào ngày 21/11/2025
                      nha! <br /> Thời gian: <br /> Ca 2: <br /> Ca 3: <br />{" "}
                      Speaker: Nguyễn Duy Linh - Nhà sưu tập đồ thờ cúng miền
                      Nam?????
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    ĐẶC TRƯNG THỜ CÚNG MIỀN BẮC (22/11)
                  </AccordionTrigger>
                  <AccordionContent className="border-l border-r border-b border-black">
                    <p className="text-sm montserrat-400">
                      ĐẶC TRƯNG THỜ CÚNG MIỀN BẮC Nổi bật với tính "nghi lễ" và
                      chuẩn mực. Người Bắc rất coi trọng thứ bậc, vai trò con
                      trưởng và các nghi thức truyền thống. Mặc dù là một vùng
                      đất chịu ảnh hưởng của các tư tưởng, tôn giáo của Trung
                      Hoa nhưng văn hoá thờ cúng tổ tiên của người miền Bắc chỉ
                      tiếp biến những văn hoá đó sao cho phù hợp chứ không hoà
                      trộn. Thời gian: <br /> Ca 1: 8:00 - <br /> Ca 2: <br />{" "}
                      Ca 3: <br /> Speaker: Nguyễn Duy Linh - Nhà sưu tập đồ thờ
                      cúng miền Bắc?????
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    ĐẶC TRƯNG THỜ CÚNG MIỀN TRUNG (23/11)
                  </AccordionTrigger>
                  <AccordionContent className="border-l border-r border-b border-black">
                    <p className="text-sm montserrat-400">
                      ĐẶC TRƯNG THỜ CÚNG MIỀN TRUNG Miền Trung: Đặc trưng bởi sự
                      "chu đáo" và "tinh tế". Chịu ảnh hưởng văn hóa cung đình,
                      mâm cỗ cúng có thể không quá thịnh soạn nhưng luôn phải
                      chỉn chu, tinh tế và được chuẩn bị một cách cẩn trọng
                      nhất. Thời gian: <br /> Ca 1: <br /> Ca 2: <br /> Ca 3:{" "}
                      <br /> Speaker: Nguyễn Duy Linh - Nhà sưu tập đồ thờ cúng
                      miền Trung?????
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Section */}
      <div className="relative">
        <Image
          src="/images/ogbnlogo.svg"
          alt="Texture background"
          width={2880}
          height={3240}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          priority
        />

        <div className="relative z-10 w-full mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
          <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-10 items-center justify-center">
            {/* Main Heading */}
            <div className="text-center space-y-3 sm:space-y-4 md:space-y-6">
              <h1 className="font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#FD7233] leading-tight">
                ĐĂNG KÝ VÉ NGAY ĐỂ NHẬN NGAY
              </h1>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#FD7233] mx-auto rounded-full" />
              <h2 className="montserrat-600 text-sm sm:text-base md:text-lg lg:text-xl text-[#FD7233] max-w-3xl mx-auto leading-relaxed">
                BỘ MERCHANDISE THỜ CÚNG VÔ CÙNG ĐỘC ĐÁO
              </h2>
            </div>

            {/* QR Code Section */}
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl border-2 border-[#FD7233]/20">
                <div className="aspect-square flex items-center justify-center bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8">
                  <Image
                    src="/images/qrcode.svg"
                    alt="QR Code để đăng ký"
                    width={600}
                    height={600}
                    className="w-full h-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative w-full bg-white">
        {/* Scrolling Marquee Header */}
        <div className="bg-black w-full overflow-hidden py-3 sm:py-4 md:py-6 relative">
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase mx-4 sm:mx-6 md:mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase mx-4 sm:mx-6 md:mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase mx-4 sm:mx-6 md:mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase mx-4 sm:mx-6 md:mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase mx-4 sm:mx-6 md:mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase mx-4 sm:mx-6 md:mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase mx-4 sm:mx-6 md:mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase mx-4 sm:mx-6 md:mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase mx-4 sm:mx-6 md:mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase mx-4 sm:mx-6 md:mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-0">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-3 sm:py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-sm sm:text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    Có giới hạn độ tuổi cho người tham dự không?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-3 sm:pt-4 pb-4 sm:pb-6 flex items-center justify-center">
                  <p className="text-xs sm:text-sm md:text-base montserrat-400 text-black">
                    Sự kiện dành cho mọi lứa tuổi. Tuy nhiên, trẻ em dưới 12
                    tuổi cần có người lớn đi kèm.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-3 sm:py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-sm sm:text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    Có vật dụng gì không được mang vào City Tết Fest không?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-3 sm:pt-4 pb-4 sm:pb-6 flex items-center justify-center">
                  <p className="text-xs sm:text-sm md:text-base montserrat-400 text-black">
                    Vui lòng không mang theo vũ khí, chất kích thích, đồ uống có
                    cồn từ bên ngoài, và các vật dụng nguy hiểm khác.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-3 sm:py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-sm sm:text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    Đây có phải là một sự kiện mất phí không?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-3 sm:pt-4 pb-4 sm:pb-6 flex items-center justify-center">
                  <p className="text-xs sm:text-sm md:text-base montserrat-400 text-black">
                    Sự kiện hoàn toàn miễn phí. Bạn chỉ cần đăng ký để nhận vé
                    tham dự.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-3 sm:py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-sm sm:text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    Làm sao để cập nhật được lịch trình sự kiện diễn ra tại City
                    Tết Fest?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-3 sm:pt-4 pb-4 sm:pb-6 flex items-center justify-center">
                  <p className="text-xs sm:text-sm md:text-base montserrat-400 text-black">
                    Bạn có thể theo dõi lịch trình sự kiện trên website chính
                    thức hoặc trang Facebook của chúng tôi. Thông tin sẽ được
                    cập nhật thường xuyên.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-3 sm:py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-sm sm:text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    Về City Tết Fest 2025?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-3 sm:pt-4 pb-4 sm:pb-6 flex items-center justify-center">
                  <p className="text-xs sm:text-sm md:text-base montserrat-400 text-black">
                    City Tết Fest 2025 là một sự kiện văn hóa lớn nhằm tôn vinh
                    và giữ gìn những giá trị truyền thống của Tết Việt Nam trong
                    không gian hiện đại.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-3 sm:py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-sm sm:text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    Những điều cần lưu ý giúp bạn "enjoy" City Tết Fest hết
                    mình?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-3 sm:pt-4 pb-4 sm:pb-6 flex items-center justify-center">
                  <p className="text-xs sm:text-sm md:text-base montserrat-400 text-black">
                    Hãy đến đúng giờ, mang theo vé đã đăng ký, mặc trang phục
                    phù hợp, và sẵn sàng tham gia các hoạt động tương tác để có
                    trải nghiệm tốt nhất.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-3 sm:py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-sm sm:text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    Cách thức liên hệ với City Tết Fest?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-3 sm:pt-4 pb-4 sm:pb-6 flex items-center justify-center">
                  <p className="text-xs sm:text-sm md:text-base montserrat-400 text-black">
                    Bạn có thể liên hệ qua email: info@citytetfest.com hoặc qua
                    hotline: 1900-xxxx. Chúng tôi sẽ phản hồi trong vòng 24 giờ.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-3 sm:py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-sm sm:text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    City Tết Fest 2025 có an toàn không?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-3 sm:pt-4 pb-4 sm:pb-6 flex items-center justify-center">
                  <p className="text-xs sm:text-sm md:text-base montserrat-400 text-black">
                    Chúng tôi đảm bảo an toàn cho tất cả khách tham dự với đội
                    ngũ bảo vệ chuyên nghiệp và các biện pháp an ninh đầy đủ.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
