import { getTodosIds } from "./api"
import { useQuery } from "@tanstack/react-query"

export function useTodosIds() {
    return useQuery({
        queryKey: ['todos'],
        queryFn: getTodosIds,
        // refetchOnWindowFocus: false,
        // enabled: true

    });
}