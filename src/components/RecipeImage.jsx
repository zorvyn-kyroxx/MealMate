import { ImageOff } from "lucide-react";
import { useState } from "react";

export default function RecipeImage({ src, alt, className = "", loading = "lazy" }) {
  const [unavailableSrc, setUnavailableSrc] = useState(null);
  const unavailable = !src || unavailableSrc === src;

  if (unavailable) {
    return (
      <div className={`recipe-image-fallback ${className}`} role="img" aria-label={`${alt} photo unavailable`}>
        <ImageOff size={22} />
        <span>{alt}</span>
        <small>Photo unavailable</small>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setUnavailableSrc(src)}
    />
  );
}
