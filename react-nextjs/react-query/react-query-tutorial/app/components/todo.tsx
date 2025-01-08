import { useTodos, useTodosIds } from "@/services/queries";

export default function Todo() {
    const todosIdsQuery = useTodosIds();
    const todosQueries = useTodos(todosIdsQuery.data);

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

    return (
        <>
            <ul>
                {todosQueries.map(({ data }) => (
                    <li key={data?.id}>
                        <div>Id: {data?.id}</div>
                        <span>
                            <strong>Title:</strong> {data?.title},{" "}
                            <strong>Description:</strong> {data?.description}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
}
