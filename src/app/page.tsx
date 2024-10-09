"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { FlipWords } from "@/components/ui/flip-words";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function Home() {
  const words = [
    "Don't abuse drugs",
    "Stay healthy",
    "Choose life",
    "Say no to drugs",
    "Be drug-free",
  ];

  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScrollToCarousel = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="snap-y snap-mandatory overflow-y-scroll h-screen no-scrollbar">
      <BackgroundBeamsWithCollision className="min-h-screen flex flex-col justify-center snap-always snap-center">
        <div className="font-bold text-5xl text-center mb-4 text-red-500">
          #<FlipWords words={words} />
        </div>
        <Button
          variant={"outline"}
          size={"lg"}
          className="mt-4"
          onClick={handleScrollToCarousel}
        >
          Find Out More
        </Button>
      </BackgroundBeamsWithCollision>

      <div ref={carouselRef}>
        <Carousel
          className="snap-always snap-center"
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent>
            <CarouselItem>
              <div className="min-h-screen flex flex-col justify-center bg-no-repeat bg-center bg-cover bg-[url('/img/cannabisbanner.jpg')]">
                <p className="font-bold text-white text-3xl w-1/2 pl-10">
                  Information on Drugs
                </p>
                <p className="text-lg text-white w-1/2 pl-10">
                  An understanding of drugs, what they do, how to spot them and
                  the dangers and concerns associated with them is a critical
                  first step, to being able to actively choose not to pursue
                  them.
                </p>
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="relative min-h-screen flex flex-col justify-center bg-no-repeat bg-center bg-cover bg-[url('/img/sAbuse.jpg')]">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10">
                  <p className="font-bold text-3xl w-1/2 pl-10">
                    What is Substance Addiction?
                  </p>
                  <p className="text-lg w-1/2 pl-10">
                    Substance abuse can lead to addiction or dependence. When
                    addicted to a substance, the user has to depend on it for
                    his daily activities. He / She would no longer be in control
                    of his own life but becomes obsessed with the next fix. If
                    he does not have the money to finance the addiction, he is
                    likely to lie, cheat or steal to obtain money to buy
                    substances. This will lead to many other problems.
                  </p>
                </div>
              </div>
            </CarouselItem>

          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
