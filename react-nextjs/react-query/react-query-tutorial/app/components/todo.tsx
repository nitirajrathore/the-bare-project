import { useDeleteTodo, useCreateTodo, useUpdateTodo } from "@/services/mutations";
import { useTodos, useTodosIds } from "@/services/queries";
import { Todo } from "@/types/todos";
import { SubmitHandler, useForm } from 'react-hook-form'

export default function TodoComponent() {
    const todosIdsQuery = useTodosIds();
    const todosQueries = useTodos(todosIdsQuery.data);
    const createTodoMutation = useCreateTodo();
    const updateTodoMutation = useUpdateTodo();
    const deleteTodoMutation = useDeleteTodo();

    const { register, handleSubmit } = useForm<Todo>();

    // Early return if the todosIdsQuery is still loading or has an error
    if (todosIdsQuery.isPending) {
        return <span> loading... </span>;
    }

    if (todosIdsQuery.isError) {
        return <span> there is an error! </span>;
    }

    // Ensure todosIdsQuery.data is defined before using it
    if (!todosIdsQuery.data) {
        return <span> No data available. </span>;
    }

    // Ensure todosQueries is fully loaded and contains data
    if (!todosQueries || todosQueries.some(query => query.isPending)) {
        return <span> loading... </span>;
    }

    if (todosQueries.some(query => query.isError)) {
        return <span> there is an error with one or more todos! </span>;
    }

    const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
        createTodoMutation.mutate(data);
    }

    const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
        if (data) {
            updateTodoMutation.mutate({ ...data, checked: true })
        }
    }

    const handleDeleteTodo = async (id: number) => {
        await deleteTodoMutation.mutateAsync(id)
        console.log("deletion completed.")
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
                <h4> New Todo: </h4>
                <input placeholder="Title" {...register("title")} />
                <br />
                <input placeholder="Description" {...register("description")} />
                <br />
                <input type="submit" />
            </form>

            <ul>
                {todosQueries.map(({ data }) => (
                    <li key={data?.id}>
                        <div>Id: {data?.id}</div>
                        <span>
                            <strong>Title:</strong> {data?.title},{" "}
                            <strong>Description:</strong> {data?.description}
                        </span>
                        <div>
                            <button onClick={() => handleMarkAsDoneSubmit(data)} disabled={data?.checked}>
                                {data?.checked ? "Done" : "Mark as done"}
                            </button>
                            {data && data.id && (
                                <button onClick={() => handleDeleteTodo(data.id!)}> Delete</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
