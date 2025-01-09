import { getProjects, getTodosIds } from "./api"
import { useQuery, useQueries, keepPreviousData } from "@tanstack/react-query"
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


export function useProjects(page: number) {
    return useQuery({
        queryKey: ["projects", {page}],
        queryFn: () => getProjects(page),
        placeholderData: keepPreviousData, // keep previous page data till new new page data loads, so that there is no flicker between page change.
    });
}


