"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ProductCard from "@/app/(components)/ProductCard";

const CreatePage = () => {
  const products = useQuery(api.products.getProducts);
  const addOutfit = useMutation(api.outfits.createOutfit);

  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState<Set<Id<"products">>>(new Set());

  return products ? (
    <>
      <div className="flex flex-row gap-2 my-5">
        <input
          type="text"
          placeholder="Name your outfit"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={async () => {
            await addOutfit({ title, products: Array.from(selected) });
            setSelected(new Set());
            setTitle("");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Outfit
        </button>
      </div>
      <h2 className="px-5 text-3xl mb-2 font-bold">Select Your Products</h2>
      <ul role="list" className="flex flex-row flex-wrap gap-2 mt-2">
        {products.map((product) => (
          <li
            key={product._id}
            className={`border-4 rounded-xl ${
              selected.has(product._id)
                ? "border-red-600 bg-zinc-800"
                : "border-gray-800"
            }`}
            onClick={() =>
              setSelected((selected) => {
                const newSelected = new Set(selected);
                if (newSelected.has(product._id)) {
                  newSelected.delete(product._id);
                } else {
                  newSelected.add(product._id);
                }
                return newSelected;
              })
            }
          >
            <ProductCard {...product} fixedWidth />
          </li>
        ))}
      </ul>
    </>
  ) : null;
};

export default CreatePage;
