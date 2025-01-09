import { getProducts, getProjects, getTodosIds } from "./api"
import { useQuery, useQueries, keepPreviousData, useQueryClient } from "@tanstack/react-query"
import { getTodo } from "./api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProduct } from "./api";
import { Product } from "@/types/product";

export function useTodosIds() {
    return useQuery({
        queryKey: ['todos'],
        queryFn: getTodosIds,
        // refetchOnWindowFocus: false,
        // enabled: true

    });
}


export function useTodos(ids: (number | undefined)[] | undefined) {
    return useQueries({
        queries: (ids ?? []).map((id) => {
            return {
                queryKey: ["todo", { id }],
                queryFn: () => getTodo(id!),
            }
        })
    })

}


export function useProjects(page: number) {
    return useQuery({
        queryKey: ["projects", { page }],
        queryFn: () => getProjects(page),
        placeholderData: keepPreviousData, // keep previous page data till new new page data loads, so that there is no flicker between page change.
    });
}

export function useProducts() {
    return useInfiniteQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.length === 0) {
                return undefined;
            }
            return lastPageParam + 1;
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
            if (firstPageParam <= 1) {
                return undefined;
            }
            return firstPageParam - 1;
        },
    });
}

export function useProduct(id: number | null) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["product", { id }],
        queryFn: () => getProduct(id!),
        enabled: Boolean(id),  // only run if id is non null
        placeholderData: () => {
            const cachedPrdoucts = (queryClient.getQueryData(["products"]) as {
                pages: Product[] | undefined;
            })?.pages?.flat(2);

            if (cachedPrdoucts) {
                return { ...cachedPrdoucts.find((item) => item.id === id), name: "coming up.." };
            }
        },
    });
}


