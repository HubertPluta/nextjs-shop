import Image from "next/image";
import Link from "next/link";
import ItemColor from "@/components/ItemColor";
import ItemSize from "@/components/ItemsSize";
import AddCartButton from "@/components/AddCartButton";

export default async function Product({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`, {
    cache: "no-store",
  });


  const item = await res.json();

  if (item.isError) {
    return (
        <div className="text-center mb-5">
            <h1 className="p-5">Nie znaleziono produktu</h1>
            <Link href={"/"}>Powrot na strone głowną</Link>
        </div>
    )
  }

  const product = item;


  return (
    <div className="flex gap-10 p-5 justify-center items-center">
      <Image
        className="w-200 h-200 rounded-2xl"
        src={product.imageUrl}
        alt={product.name}
        width={300}
        height={600}
      />

      <div className="flex flex-col gap-5">
        <div>
            <h1 className="font-bold">{product.name}</h1>
            <p>{product.price} zł</p>
        </div>


        <h1 className="font-bold">Rozmiary</h1>
        <div className="flex gap-5">
          <ItemSize id={params.id} />
        </div>

        <h1 className="font-bold">Kolory</h1>
        <div className="flex gap-5">
          <ItemColor id={params.id} />
        </div>

        <AddCartButton id={item.id} />

        <p className="text-stone-600">
          {product.description}
        </p>
      </div>
    </div>
  );
}
