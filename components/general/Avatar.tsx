// Avatar.tsx
import Image from "next/image";

interface AvatarProps {
  image?: string;
}

function Avatar({ image }: AvatarProps) {
  return (
    <Image
      src={
        image ||
        "https://res.cloudinary.com/dgoothqal/image/upload/v1730673960/avatar3_oronth.png"
      }
      alt="Avatar"
      width={64}
      height={64}
      className="object-cover rounded-full"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

export default Avatar;
