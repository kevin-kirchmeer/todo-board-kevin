
import { useState, useEffect } from "react";
import { getBoards } from "../services/boards";

export function useBoards(){
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const reload = async () => {
        try {
            setLoading(true);
            const data = await getBoards();
            setBoards(data);
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // ignore - Guard( cleanup )

    useEffect(() => {
        let ignore = false;

        getBoards()
            .then((data) => {
                if (!ignore) {
                    setBoards(data);
                }
            })
            .catch((error) => {
                if (!ignore) {
                    setError(error.message);
                }
            })
            .finally(() => {
                if (!ignore) {
                    setLoading(false);
                }
            });

            return () => {
                ignore = true;
            }
    }, []);

    return { boards, loading, error, reload }
}