import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Todo } from "@/types/todos";
import { createTodo } from "./api";

export function useCreateTodo() {
    const queryClient = useQueryClient();

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
        onSettled: async (data, error, variables) => {
            console.log("settled");
            if(error) {
                console.log(error);
            } else {
                await queryClient.invalidateQueries({queryKey: ["todos"]});
            }
        }
    });
}


// export function useUpdateTodo() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: (data: Todo) => updateTodo()
//     })
// }