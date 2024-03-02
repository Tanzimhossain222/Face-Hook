import { useContext } from "react";
import { PostContext } from "../context";

export const usePost = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error("usePost must be used within a PostProvider");
    }
    return context;
}

