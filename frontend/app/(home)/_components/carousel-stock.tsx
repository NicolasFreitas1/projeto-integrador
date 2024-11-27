"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/_components/ui/carousel";
import { LowStockProducts } from "./low-stock-products";
import { Product } from "@/app/_types/product";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

interface CarouselStockProps {
  lowQuantityProducts: Product[];
}

export function CarouselStock({ lowQuantityProducts }: CarouselStockProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        <CarouselItem>
          <LowStockProducts lowStockProducts={lowQuantityProducts} />
        </CarouselItem>
        <CarouselItem>
          <LowStockProducts lowStockProducts={lowQuantityProducts} />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
