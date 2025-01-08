
import { useTodosIds } from "@/services/queries";

export default function Todo() {
    const todoIdsQuery = useTodosIds();

    if (todoIdsQuery.isPending) {
        return <span> loading. ...</span>;
    }

    if (todoIdsQuery.isError) {
        return <span> there is an error !</span>;
    }

    return (
        <div>
            {todoIdsQuery.data.map((id) => (
                <p key={id}>{id}</p>
            ))}
        </div>
    );
}