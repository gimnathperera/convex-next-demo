import Image from "next/image";

const ProductCard = ({
  title,
  url,
  fixedWidth = false,
}: {
  title?: string;
  url?: string | null;
  fixedWidth?: boolean;
}) => (
  <div className="p-2">
    <Image
      className={`aspect-[2/2] ${
        fixedWidth ? "w-[12rem] min-w-[12rem]" : "w-full"
      } rounded-md object-cover`}
      src={url ?? ""}
      alt={`${title} url`}
      width={1024}
      height={1024}
    />
    {title && (
      <h3 className="mt-2 text-lg font-bold leading-10 text-gray-100">
        {title}
      </h3>
    )}
  </div>
);

export default ProductCard;
