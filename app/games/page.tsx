'use client'

import DragDropGame, { ImageItem } from '../components/drag-drop-game'
import Image from 'next/image'

export default function GamesPage() {
  const images: ImageItem[] = [
    {
      id: 'image-1',
      src: '/den-cay.svg'
    },
    {
      id: 'image-2',
      src: '/binh-bong.svg'
    },
    {
      id: 'image-3',
      src: '/luhuong.svg'
    },
    {
      id: 'image-4',
      src: '/hoa-qua.svg'
    },
    {
      id: 'image-5',
      src: '/den-cay.svg'
    }
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .responsive-background {
          background-image: url(/background.svg);
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          background-size: auto 180%;
        }
        @media (min-width: 640px) {
          .responsive-background {
            background-size: cover;
          }
        }
        @media (min-width: 1024px) {
          .responsive-background {
            background-size: cover;
          }
        }
      `}} />
      <div className="min-h-screen w-full relative responsive-background">
      {/* Bantho.svg positioned at bottom */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pointer-events-none z-0 h-screen">
        <div className="w-full max-w-4xl flex items-end justify-center">
          <Image 
            src="/Bantho.svg" 
            alt="Bantho" 
            className="w-full h-auto object-contain object-bottom sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh]"
            width={1000}
            height={1000}
            priority
            style={{ maxHeight: '100vh' }}
          />
        </div>
      </div>
      
      {/* Game content on top */}
      <div className="container mx-auto px-4 py-8 h-screen relative z-10">
        <DragDropGame images={images} />
      </div>
      </div>
    </>
  )
}