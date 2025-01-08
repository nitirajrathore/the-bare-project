import { useTodos, useTodosIds } from "@/services/queries";

export default function Todo() {
    const todosIdsQuery = useTodosIds();
    const todosQueries = useTodos(todosIdsQuery.data);

    if (todosIdsQuery.isPending) {
        return <span> loading. ...</span>;
    }

    if (todosIdsQuery.isError) {
        return <span> there is an error !</span>;
    }


    return (
        <>
            <ul>
                {todosQueries.map(({ data }) => (
                    <li key={data?.id}>
                        <div>Id: {data?.id}</div>
                        <span>
                            <strong> Title: </strong> {data?.title}, {" "}
                            <strong>Description: </strong> {data?.description}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
}