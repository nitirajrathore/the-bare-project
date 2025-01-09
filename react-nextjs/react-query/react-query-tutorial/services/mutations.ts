import { useMutation } from "@tanstack/react-query";
import { Todo } from "@/types/todos";

import { createTodo } from "./api";

export function useCreateTodo() {
    return useMutation({
        mutationFn: (data: Todo) => createTodo(data),
        onMutate: () => {
            console.log("mutate");
        },
        onError: () => {
            console.log("error")
        },
        onSuccess: () => {
            console.log("succcess")
        },
        onSettled: (data, error, variables) => {
            
            console.log("settled");
        }
    });
}