"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

const MediaGallery = ({ items }: MediaGalleryProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 w-full">
      {items.map((item, index) => {
        const { media, spoiler, description } = item;
        const { width, height } = media;
        const src = media.proxy_url || media.url;

        const hasDimensions = width && height;
        const aspectRatio = hasDimensions ? width / height : null;

        return (
          <div
            key={index}
            className="relative w-full overflow-hidden rounded-lg"
            style={
              aspectRatio
                ? { aspectRatio: `${aspectRatio}` }
                : { height: 'auto' }
            }
          >
            {hasDimensions ? (
              <Image
                src={src}
                alt={description || "Media"}
                width={width}
                height={height}
                sizes="100vw"
                loading="lazy"
                className={`object-contain transition duration-300 ${
                  spoiler ? "blur-md hover:blur-none cursor-pointer" : ""
                }`}
              />
            ) : (
              <DynamicAspectImage 
                src={src} 
                description={description}
                spoiler={spoiler}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Component for images without dimensions
const DynamicAspectImage = ({ src, description, spoiler }: { 
  src: string, 
  description?: string, 
  spoiler?: boolean 
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
  }, [src]);

  return dimensions.width > 0 ? (
    <Image
      src={src}
      alt={description || "Media"}
      width={dimensions.width}
      height={dimensions.height}
      sizes="100vw"
      loading="lazy"
      className={`object-contain transition duration-300 ${
        spoiler ? "blur-md hover:blur-none cursor-pointer" : ""
      }`}
    />
  ) : (
    <div className="w-full h-64 bg-gray-200 animate-pulse" />
  );
};

export default MediaGallery;