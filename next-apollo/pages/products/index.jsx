import Link from "next/link";

const fakeData = [
  { id: 1, description: "product1", price: 100 },
  { id: 2, description: "product2", price: 200 },
  { id: 3, description: "product3", price: 300 },
];

const products = () => {
  return (
    <div>
      {fakeData.map((prod) => (
        <Link
          key={prod.id}
          href="/products/[productId]"
          as={`/products/${prod.id}`}
        >
          <a>
            <div>{prod.description}</div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default products;
