"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const MediaGallery = ({ items }: MediaGalleryProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 w-full">
      {items.map((item, index) => (
        <MediaItem key={index} {...item} />
      ))}
    </div>
  );
};

const MediaItem = ({ media, spoiler, description }: GalleryItem) => {
  const [showSpoiler, setShowSpoiler] = useState(spoiler);
  const src = media.proxy_url || media.url;
  const hasDimensions = !!media.width && !!media.height;

  const handleRevealSpoiler = () => {
    if (showSpoiler) {
      setShowSpoiler(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      {hasDimensions ? (
        <>
          <Image
            src={src}
            alt={description || "Media"}
            width={media.width!}
            height={media.height!}
            sizes="100vw"
            loading="lazy"
            className={`object-contain transition duration-300 ${
              showSpoiler ? "blur-3xl" : ""
            }`}
          />
          {showSpoiler && (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20"
              onClick={handleRevealSpoiler}
            >
              <div className="bg-black/70 rounded-full p-3">
                <Eye className="text-white" size={24} />
              </div>
            </div>
          )}
        </>
      ) : (
        <DynamicAspectImage
          src={src}
          description={description}
          spoiler={showSpoiler}
          onRevealSpoiler={handleRevealSpoiler}
        />
      )}
    </div>
  );
};

const DynamicAspectImage = ({
  src, 
  description, 
  spoiler,
  onRevealSpoiler
}: {
  src: string;
  description?: string;
  spoiler?: boolean;
  onRevealSpoiler: () => void;
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
    <div className="relative">
      <Image
        src={src}
        alt={description || "Media"}
        width={dimensions.width}
        height={dimensions.height}
        sizes="100vw"
        loading="lazy"
        className={`object-contain transition duration-300 ${
          spoiler ? "blur-3xl" : ""
        }`}
      />
      {spoiler && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20"
          onClick={onRevealSpoiler}
        >
          <div className="bg-black/70 rounded-full p-3">
            <Eye className="text-white" size={24} />
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="w-full h-64 bg-gray-200 animate-pulse" />
  );
};

export default MediaGallery;