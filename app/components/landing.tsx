"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Link from "next/link";

gsap.registerPlugin(ScrollToPlugin);

export default function LandingPage({ className }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<SVGSVGElement>(null);
  const closeIconRef = useRef<SVGSVGElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!menuIconRef.current || !closeIconRef.current || !dropdownRef.current)
      return;

    const ctx = gsap.context(() => {
      if (isMenuOpen) {
        const tl = gsap.timeline();

        // Show dropdown first
        gsap.set(dropdownRef.current, {
          display: "block",
          pointerEvents: "auto",
        });

        tl.to(menuIconRef.current, {
          opacity: 0,
          rotation: 90,
          scale: 0,
          duration: 0.4,
          ease: "power2.inOut",
        }).fromTo(
          closeIconRef.current,
          {
            opacity: 0,
            rotation: -90,
            scale: 0,
          },
          {
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        );

        // Animate dropdown appearance
        gsap.fromTo(
          dropdownRef.current,
          {
            opacity: 0,
            y: -20,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            delay: 0.1,
            onComplete: () => {
              const menuItems =
                dropdownRef.current?.querySelectorAll(".menu-item");
              if (menuItems) {
                gsap.fromTo(
                  menuItems,
                  {
                    opacity: 0,
                    x: -20,
                  },
                  {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    stagger: 0.1,
                  }
                );
              }
            },
          }
        );
      } else {
        const tl = gsap.timeline();

        // Animate dropdown disappearance
        if (dropdownRef.current) {
          gsap.to(dropdownRef.current, {
            opacity: 0,
            y: -20,
            scale: 0.9,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              if (dropdownRef.current) {
                gsap.set(dropdownRef.current, {
                  display: "none",
                  pointerEvents: "none",
                });
              }
            },
          });
        }

        tl.to(closeIconRef.current, {
          opacity: 0,
          rotation: -90,
          scale: 0,
          duration: 0.4,
          ease: "power2.inOut",
        }).fromTo(
          menuIconRef.current,
          {
            opacity: 0,
            rotation: 90,
            scale: 0,
          },
          {
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        );
      }
    });

    return () => ctx.revert();
  }, [isMenuOpen]);

  useEffect(() => {
    if (menuIconRef.current && closeIconRef.current && dropdownRef.current) {
      gsap.set(menuIconRef.current, {
        opacity: 1,
        rotation: 0,
        scale: 1,
      });
      gsap.set(closeIconRef.current, {
        opacity: 0,
        rotation: -90,
        scale: 0,
      });
      gsap.set(dropdownRef.current, {
        display: "none",
        pointerEvents: "none",
        opacity: 0,
        y: -20,
        scale: 0.9,
      });
    }
  }, []);

  const menuItems = [
    {
      id: 1,
      title: "Trang chủ",
      image: "/rectangle.svg",
      scrollTo: "trang-chu",
    },
    {
      id: 2,
      title: "Hoạt động",
      image: "/images/main-logo.webp",
      scrollTo: "hoat-dong",
    },
    {
      id: 3,
      title: "Đăng ký",
      image: "/images/qrcode.svg",
      scrollTo: "dang-ky",
    },
    {
      id: 4,
      title: "FAQ",
      image: "/images/ogbnlogo.svg",
      scrollTo: "faq",
    },
  ];

  const handleMenuClick = (scrollTo: string) => {
    const element = document.getElementById(scrollTo);
    if (element) {
      setIsMenuOpen(false);
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: element,
          offsetY: 80,
        },
        ease: "power3.inOut",
      });
    }
  };

  return (
    <div className={`relative w-full ${className || ""}`}>
      <div
        id="trang-chu"
        className="relative min-h-screen w-full overflow-hidden flex flex-col z-20"
      >
        {/* Background Image for entire section */}
        <Image
          src="/background.svg"
          alt="Background"
          width={4000}
          height={3240}
          className="absolute inset-0 w-full h-full object-cover z-0 scale-300"
          priority
        />

        <header className="p-6 z-10 relative">
          <div
            ref={menuRef}
            className="flex items-center justify-start gap-4 bg-white rounded-lg p-2 w-fit relative"
          >
            <Image
              src="/rectangle.svg"
              alt="Logo"
              width={130}
              height={80}
              className="h-12 w-auto"
              priority
            />
            <button
              onClick={toggleMenu}
              className="relative w-10 h-10 cursor-pointer"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.1,
                  duration: 0.2,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.2,
                  ease: "power2.out",
                });
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Menu
                  ref={menuIconRef}
                  size={40}
                  strokeWidth={1.5}
                  color="#FDD835"
                  className="absolute"
                />
                <X
                  ref={closeIconRef}
                  size={40}
                  strokeWidth={1.5}
                  color="#FDD835"
                  className="absolute"
                />
              </div>
            </button>

            {/* Menu Dropdown */}
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border-2 border-[#FDD835] min-w-[320px] sm:min-w-[380px] md:min-w-[420px] z-50 overflow-hidden"
            >
              <div className="p-5 sm:p-6 md:p-7 space-y-3">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleMenuClick(item.scrollTo)}
                    className="menu-item flex items-center gap-5 p-4 rounded-lg hover:bg-[#FDD835]/10 transition-colors duration-200 cursor-pointer group"
                  >
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={56}
                        height={56}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                      />
                    </div>
                    <span className="text-lg sm:text-xl md:text-2xl font-semibold text-[#FD7233] group-hover:text-[#FDD835] transition-colors duration-200">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col justify-center w-full relative z-10">
          {/* Main Logo */}
          <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col items-center justify-center gap-10">
            <Image
              src="/workshop.svg"
              alt="Workshop"
              width={1000}
              height={1000}
              className="mx-auto object-contain w-auto scale-80 sm:scale-90 md:scale-90 lg:scale-100"
              priority
            />
            <Image
              src="/tstc.svg"
              alt="Logo"
              width={1200}
              height={1200}
              className="mx-auto object-contain w-auto scale-100 sm:scale-110 md:scale-120 lg:scale-130"
              priority
            />
          </div>

          {/* Bàn thờ Image */}
          <div className="relative z-10 w-full mt-auto h-full">
            <Image
              className="h-fit w-full object-contain"
              src="/banthoongba.svg"
              width={1000}
              height={1000}
              alt="Bàn thờ"
              priority
            />
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/caro.svg"
          alt="Caro"
          width={1000}
          height={1000}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      <div className="relative w-full bg-linear-to-tr from-[#FD7233] to-[#fdcb35] z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 z-0">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="flex items-center justify-center text-white font-black text-4xl sm:text-5xl md:text-6xl lg:text-[200px] mb-10">
                Tổng quan
              </h2>
              <p className="text-white text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed">
                Tiếp nối nội dung từ dự án Ông Gánh Bà Nâng. Workshop "..."
                chính là nơi tái hiện lại bàn thờ ba miền giúp hiểu thêm ý nghĩa
                của việc thờ cúng gia tiên một cách trực quan. Đặc biệt, trực
                tiếp thực hành bài trí các vật phẩm thờ cúng cũng như tự tay làm
                ra một vật phẩm thờ cúng đặc trưng của mỗi vùng miền.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
                Workshop được diễn ra trong 3 ngày:
              </h3>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                  <h4 className="text-white font-bold text-lg sm:text-xl md:text-xl lg:text-xl mb-2">
                    Ngày 21/11/2025:
                  </h4>
                  <p className="text-white text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed">
                    Tìm hiểu về đặc trưng thờ cúng tổ tiên miền Nam và workshop
                    làm tranh kiếng
                  </p>
                  <p className="text-white text-xs sm:text-sm md:text-lg lg:text-xl italic mt-2">
                    (Loại tranh thờ đặc trưng ở miền Nam)
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                  <h4 className="text-white font-bold text-lg sm:text-xl md:text-xl lg:text-xl mb-2">
                    Ngày 22/11/2025:
                  </h4>
                  <p className="text-white text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed">
                    Tìm hiểu về đặc trưng thờ cúng tổ tiên miền Bắc và workshop
                    làm vàng mã
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                  <h4 className="text-white font-bold text-lg sm:text-xl md:text-xl lg:text-xl mb-2">
                    Ngày 23/11/2025:
                  </h4>
                  <p className="text-white text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed">
                    Tìm hiểu về đặc trưng thờ cúng tổ tiên miền Trung và
                    workshop làm hoa giấy Thanh Tiên
                  </p>
                  <p className="text-white text-xs sm:text-sm md:text-lg lg:text-xl italic mt-2">
                    (Loại hoa thờ đặc trưng ở Huế)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
              <div className="space-y-3">
                <p className="text-white font-bold text-base sm:text-lg md:text-lg lg:text-xl">
                  Thời gian: 21/11/2025 - 23/11/2025
                </p>
                <p className="text-white font-bold text-base sm:text-lg md:text-lg lg:text-xl">
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

      {/* <div id="hoat-dong" className="relative">
        <Image
          src="/background-color.svg"
          alt="Texture background"
          width={2880}
          height={3240}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          priority
        /> */}
      <div id="hoat-dong" className="relative bg-white">
        <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto flex flex-col gap-4 items-center justify-center">
            <h2 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-[200px] text-[#FD7233]">
              Hoạt động
            </h2>
            <h1 className="rounded-lg text-xl sm:text-2xl md:text-3xl lg:text-6xl text-[#FD7233]">
              CÓ GÌ TẠI "TẬP SỰ THỜ CÚNG" ?
            </h1>
            <div className="w-full">
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    ĐẶC TRƯNG THỜ CÚNG MIỀN NAM (21/11)
                  </AccordionTrigger>
                  <AccordionContent className="border-l border-r border-b border-black">
                    <p className="text-sm montserrat-400">
                      Miền Nam là vùng đất "tứ xứ", nơi hội tụ và giao thoa văn
                      hóa mạnh mẽ giữa các cộng đồng người Kinh, Hoa và Khmer.
                      Dù mang theo truyền thống từ cuộc "mở cõi" ở miền Bắc và
                      miền Trung, người dân Nam Bộ vẫn giữ gìn trọn vẹn nếp thờ
                      cúng tổ tiên qua bao thăng trầm lịch sử. Chính sự hòa
                      quyện văn hóa độc đáo này đã tạo nên một bản sắc thờ cúng
                      riêng biệt, thể hiện qua cả các nghi lễ lẫn những vật phẩm
                      thờ tự phong phú, rực rỡ. Hãy cũng tụi mình tìm hiểu kĩ
                      hơn vào vào ngày 21/11/2025 nha!
                      <br />
                      <br />
                      Ca 1: 9:00 - 12:00 <br /> Ca 2: 13:00 - 16:00
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    ĐẶC TRƯNG THỜ CÚNG MIỀN BẮC (22/11)
                  </AccordionTrigger>
                  <AccordionContent className="border-l border-r border-b border-black">
                    <p className="text-sm montserrat-400">
                      Nổi bật với tính "nghi lễ" và chuẩn mực. Người Bắc rất coi
                      trọng thứ bậc, vai trò con trưởng và các nghi thức truyền
                      thống. Mặc dù là một vùng đất chịu ảnh hưởng của các tư
                      tưởng, tôn giáo của Trung Hoa nhưng văn hoá thờ cúng tổ
                      tiên của người miền Bắc chỉ tiếp biến những văn hoá đó sao
                      cho phù hợp chứ không hoà trộn. Thời gian:<br />
                      <br />
                      Ca 1: 9:00 - 11:30 <br />
                      Ca 2: 13:00 - 15:30 <br />
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    ĐẶC TRƯNG THỜ CÚNG MIỀN TRUNG (23/11)
                  </AccordionTrigger>
                  <AccordionContent className="border-l border-r border-b border-black">
                    <p className="text-sm montserrat-400">
                      Miền Trung: Đặc trưng bởi sự "chu đáo" và "tinh tế". Chịu
                      ảnh hưởng văn hóa cung đình, mâm cỗ cúng có thể không quá
                      thịnh soạn nhưng luôn phải chỉn chu, tinh tế và được chuẩn
                      bị một cách cẩn trọng nhất.<br/>
                      <br /> Ca 1: 9:00 - 10:30
                      <br />
                      Ca 2: 10:30 - 12:00 <br />
                      Ca 3: 13:00 - 14:30 <br />
                      Ca 4: 14:30 - 16:00 <br />
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/vector.svg"
          alt="vector"
          width={1000}
          height={1000}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      <div id="dang-ky" className="relative bg-white">
        {/* <Image
          src="/background-color.svg"
          alt="Texture background"
          width={2880}
          height={3240}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          priority
        /> */}

        <div className="relative z-10 w-full mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
          <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-10 items-center justify-center">
            {/* Main Heading */}
            <div className="text-center space-y-3 sm:space-y-4 md:space-y-6">
              <h1 className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#0458fd] leading-tight">
                ĐĂNG KÝ VÉ NGAY ĐỂ NHẬN NGAY
              </h1>
              <div className="w-24 h-1 bg-[#0458fd] mx-auto rounded-full" />
              <h2 className="montserrat-600 text-base sm:text-xl md:text-2x lg:text-3xl text-[#0458fd] max-w-4xl mx-auto leading-relaxed">
                BỘ MERCHANDISE THỜ CÚNG VÔ CÙNG ĐỘC ĐÁO
              </h2>
            </div>

            {/* QR Code Section */}
            <div className="aspect-square flex items-center justify-center bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8">
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSfKYX-s7Nhfqey77g1Yuc3U1Zf6k4zzUP5URw56UKjtbwcdeg/viewform"
                target="_blank"
              >
                <Image
                  src="/qrcode.png"
                  alt="QR Code để đăng ký"
                  width={600}
                  height={600}
                  className="w-full h-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[500px] object-contain"
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="relative w-full bg-white">
        {/* Scrolling Marquee Header */}
        <div className="bg-black w-full overflow-hidden py-4 md:py-6 relative">
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl uppercase mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl uppercase mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl uppercase mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl uppercase mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl uppercase mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl uppercase mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl uppercase mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl uppercase mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl uppercase mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl uppercase mx-8">
              CÂU HỎI THƯỜNG GẶP
            </span>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <div className="max-w-9xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-0">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    Có giới hạn độ tuổi cho người tham dự không?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 flex items-center justify-center">
                  <p className="text-sm md:text-base montserrat-400 text-black">
                    Sự kiện dành cho mọi lứa tuổi. Tuy nhiên, trẻ em dưới 12
                    tuổi cần có người lớn đi kèm.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    Có vật dụng gì không được mang vào triễn lãm không?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 flex items-center justify-center">
                  <p className="text-sm md:text-base montserrat-400 text-black">
                    Vui lòng không mang theo vũ khí, chất kích thích, đồ uống có
                    cồn từ bên ngoài, và các vật dụng nguy hiểm khác.
                  </p>
                </AccordionContent>
              </AccordionItem> */}

              <AccordionItem value="item-3" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    Đây có phải là một sự kiện mất phí không?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 flex items-center justify-center">
                  <p className="text-sm md:text-base montserrat-400 text-black">
                  Sự kiện “Ông Gánh Bà Nâng” HOÀN TOÀN MIỄN PHÍ và còn được MANG THÀNH PHẨM VỀ!
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* <AccordionItem value="item-4" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    Làm sao để cập nhật được lịch trình sự kiện diễn ra tại
                    triễn lãm?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 flex items-center justify-center">
                  <p className="text-sm md:text-base montserrat-400 text-black">
                    Bạn có thể theo dõi lịch trình sự kiện trên website chính
                    thức hoặc trang Facebook của chúng tôi. Thông tin sẽ được
                    cập nhật thường xuyên.
                  </p>
                </AccordionContent>
              </AccordionItem> */}

              <AccordionItem value="item-5" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    Về triễn lãm thờ cúng?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 flex items-center justify-center">
                  <p className="text-sm md:text-base montserrat-400 text-black">
                    Triễn lãm thờ cúng là một sự kiện văn hóa lớn nhằm tôn vinh
                    và giữ gìn những giá trị truyền thống của Tết Việt Nam trong
                    không gian hiện đại.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    Những điều cần lưu ý giúp bạn "enjoy" triễn lãm thờ cúng hết
                    mình?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 flex items-center justify-center">
                  <p className="text-sm md:text-base montserrat-400 text-black">
                   Mỗi ca của sự kiện TỐI ĐA 30 SLOT, nên là tụi mình kín chỗ thì mọi người vui lòng đăng ký ca khác hoặc ngày khác nhen.
                   <br />
                   Mỗi lượt tham gia sẽ khoảng 2 tiếng nên các bạn hãy dành thời gian để buổi trải nghiệm được trọn vẹn nha.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    Cách thức liên hệ với Ông Gánh Bà Nâng?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 flex items-center justify-center">
                  <p className="text-sm md:text-base montserrat-400 text-black">
                    Bạn có thể liên hệ qua email: ongganhbanang@gmail.com hoặc
                    qua hotline: 0973779439. Chúng tôi sẽ phản hồi trong vòng 24
                    giờ.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-none">
                <AccordionTrigger className="hover:no-underline bg-transparent text-black hover:bg-gray-50 text-left py-4 border-b border-gray-200 [&>svg]:text-black [&>svg]:rotate-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center justify-center text-base md:text-lg montserrat-500 underline flex-1 text-left">
                    Triễn lãm thờ cúng có an toàn không?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 flex items-center justify-center">
                  <p className="text-sm md:text-base montserrat-400 text-black">
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
