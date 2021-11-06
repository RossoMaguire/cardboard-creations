import React from "react";

interface IBestSellerProps {
  products: Product[];
}

function BestSeller({ products }: IBestSellerProps): JSX.Element {
  const [bestSeller, setBestSeller] = React.useState({} as Product);

  React.useEffect(() => {
    const featured = products.filter((product) => {
      return product.featured;
    });
    setBestSeller(featured[0]);
  }, [products]);

  return <div className="wrap">{bestSeller?.name}</div>;
}

export default BestSeller;
