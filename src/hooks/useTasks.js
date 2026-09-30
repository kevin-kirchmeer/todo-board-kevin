import { useState, useEffect } from "react";
import { getTasks } from "../services/tasks";
import { supabase } from '../lib/supabase'

export function useTasks(boardId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = async () => {
    if (!boardId) return;

    try {
      setLoading(true);
      const data = await getTasks(boardId);
      setTasks(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!boardId) {
      return;
    }

    let ignore = false;

    getTasks(boardId)
      .then((data) => {
        if (!ignore) {
          setTasks(data);
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

      const channel = supabase
        .channel(`tasks-board-${boardId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'tasks',
            filter: `board_id=eq.${boardId}`
          },
          () => {
            getTasks(boardId).then((data) => {
              if (!ignore) {
                setTasks(data);
              }
            });
          }
        )

    return () => {
      ignore = true;
      supabase.removeChannel(channel);
    };

  }, [boardId]);

  return { tasks, loading, error, reload };
}
