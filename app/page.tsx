"use client";

import { api } from "@/convex/_generated/api";
import ProductCard from "@/app/(components)/ProductCard";
import { useQuery, useMutation } from "convex/react";

export default function Home() {
  const outfits = useQuery(api.outfits.getOutfits);
  const deleteOutfit = useMutation(api.outfits.deleteOutfit);

  return (
    <>
      {outfits?.map((outfit) => (
        <div key={outfit._id}>
          <div className="flex flex-row items-center ml-2 mr-5">
            <h1 className="mt-5">
              <span className="text-4xl font-bold">{outfit?.title}</span>{" "}
            </h1>
            <div className="flex-grow"></div>
            <div className="text-3xl">
              $
              {outfit?.products?.reduce(
                (acc, product) => acc + (product?.price ?? 0),
                0
              )}
            </div>
            <div className="mx-2 p-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => deleteOutfit({ id: outfit._id })}
              >
                Delete
              </button>
            </div>
          </div>
          <ul role="list" className="flex flex-row overflow-x-scroll gap-2 m-2">
            {outfit.products.map((product) => (
              <li key={product._id}>
                <ProductCard {...product} fixedWidth />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
