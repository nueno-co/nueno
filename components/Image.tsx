import Image from "next/image";

interface ImageProps {
  src: string;
  width?: number;
  height?: number;
}

const ImageComponent: React.FC<ImageProps> = ({ src, width, height }) => (
  <Image src={src} className="w-auto h-12 mx-auto" width={width} height={height} />
);

export default ImageComponent;
