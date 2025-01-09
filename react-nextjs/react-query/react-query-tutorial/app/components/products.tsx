import { useProducts } from "@/services/queries"
import { Fragment, useState } from "react";

export default function Products() {
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const productsQuery = useProducts();

    return <>
        {productsQuery.data?.pages.map((group, index) => (
            <Fragment key={index}>
                {group.map((product) => (
                    <Fragment key={product.id}>
                        <button onClick={() => setSelectedProductId(product.id)}>
                            {product.name}
                        </button>
                        <br />
                    </Fragment>
                ))}
            </Fragment>
        ))}
        <br />
        <div>
            <button onClick={() => productsQuery.fetchNextPage()} disabled={!productsQuery.hasNextPage || productsQuery.isFetchingNextPage}>{productsQuery.isFetchingNextPage ? 'Loading more..' :
                productsQuery.hasNextPage ? "Load More" : "Nothing more to load"}</button>
        </div>
    </>
}