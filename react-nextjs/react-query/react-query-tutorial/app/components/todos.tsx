
import { useTodosIds } from "@/services/queries";
import { useIsFetching } from "@tanstack/react-query";

export default function Todos() {
    const todoIdsQuery = useTodosIds();
    const isFetching = useIsFetching();

    if (todoIdsQuery.isPending) {
        return <span> loading. ...</span>;
    }

    if (todoIdsQuery.isError) {
        return <span> there is an error !</span>;
    }

    return (
        <div>
            <p> query function status : {todoIdsQuery.fetchStatus}</p>
            <p> query data status : {todoIdsQuery.status}</p>
            <p> Global isFetching : {isFetching}</p>
            {todoIdsQuery.data?.map((id) => (
                <p key={id + 100}>{id}</p>
            ))}
        </div>
    );
}