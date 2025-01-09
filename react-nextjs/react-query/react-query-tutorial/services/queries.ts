import { getTodosIds } from "./api"
import { useQuery, useQueries } from "@tanstack/react-query"
import { getTodo } from "./api";

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