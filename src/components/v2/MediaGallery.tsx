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
            className={`object-contain w-full ${
              showSpoiler ? "filter blur-sm" : ""
            }`}
          />
          {showSpoiler && (
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={handleRevealSpoiler}
            >
              <div className={`absolute inset-0 bg-radial from-transparent via-black/10 to-neutral-500/80 backdrop-blur-3xl transition-opacity duration-200 group-hover:opacity-60 opacity-80`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/90 backdrop-blur-md rounded-lg px-3 py-1.5 shadow-lg border border-border">
                    <Eye className="text-foreground inline-block mr-2" size={18} />
                    <span className="font-medium text-foreground">SPOILER</span>
                  </div>
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
        className={`object-contain w-full ${
          spoiler ? "filter blur-sm" : ""
        }`}
      />
      {spoiler && (
        <div
          className="absolute inset-0 cursor-pointer group"
          onClick={onRevealSpoiler}
        >
          <div className={`absolute inset-0 bg-radial from-transparent via-black/10 to-neutral-500/80 backdrop-blur-3xl transition-opacity duration-200 group-hover:opacity-60 opacity-80`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/90 backdrop-blur-md rounded-lg px-3 py-1.5 shadow-lg border border-border">
              <Eye className="text-foreground inline-block mr-2" size={18} />
              <span className="font-medium text-foreground">SPOILER</span>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="w-full h-64 bg-gray-200 animate-pulse" />
  );
};

export default MediaGallery;