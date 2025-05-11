"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

type ThumbnailProps = {
  media: MediaObject;
  description?: string;
  spoiler?: boolean;
  onClick?: () => void;
  compact?: boolean;
  className?: string;
};

type MediaObject = {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
  content_type?: string;
};

const Thumbnail = ({
  media,
  description,
  spoiler = false,
  onClick,
  compact = false,
  className = ""
}: ThumbnailProps) => {
  const [showSpoiler, setShowSpoiler] = useState(spoiler);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const src = media.proxy_url || media.url;
  const hasDimensions = !!media.width && !!media.height;

  useEffect(() => {
    if (!hasDimensions) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight
        });
        setIsLoading(false);
      };
      img.onerror = () => {
        setDimensions({ width: 320, height: 240 });
        setIsLoading(false);
      };
    } else {
      setDimensions({
        width: media.width!,
        height: media.height!
      });
      setIsLoading(false);
    }
  }, [src, hasDimensions, media.width, media.height]);

  const handleRevealSpoiler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showSpoiler) {
      setShowSpoiler(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  const aspectRatio = dimensions.width / dimensions.height || 16/9;
  const isWide = aspectRatio > 1.7;
  const isTall = aspectRatio < 0.7;
  
  const thumbnailHeight = compact ? 80 : 100;
  const thumbnailWidth = isTall 
    ? (compact ? 56 : 70) 
    : isWide 
      ? (compact ? 144 : 180) 
      : Math.round(thumbnailHeight * aspectRatio);

  return (
    <div 
      className={`relative rounded-md overflow-hidden bg-black/5 border border-border flex-shrink-0 ${className}`}
      style={{ 
        width: thumbnailWidth,
        height: thumbnailHeight
      }}
      onClick={handleClick}
    >
      {isLoading ? (
        <div className="w-full h-full bg-neutral-800/10 animate-pulse" />
      ) : (
        <>
          <Image
            src={src}
            alt={description || "Thumbnail"}
            width={dimensions.width}
            height={dimensions.height}
            sizes={`${thumbnailWidth}px`}
            className={`object-cover w-full h-full ${
              showSpoiler ? "filter blur-lg" : ""
            } transition-all duration-200`}
            loading="lazy"
          />

          {showSpoiler && (
            <div
              className="absolute inset-0 cursor-pointer group"
              onClick={handleRevealSpoiler}
            >
              <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-neutral-500/80 backdrop-blur-xl transition-opacity duration-200 group-hover:opacity-60 opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/90 backdrop-blur-md rounded px-2 py-1 shadow-lg border border-border text-xs flex items-center">
                  <Eye className="text-foreground inline-block mr-1" size={14} />
                  <span className="font-medium text-foreground text-xs">SPOILER</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Thumbnail;