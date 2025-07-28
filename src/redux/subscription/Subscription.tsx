import { useDispatch } from "react-redux";
import { taskAdded } from "../slices/TasksSlice";
import supabase from "../../config/supabaseClient";

export const subscribeToTasks = (dispatch: ReturnType<typeof useDispatch>) => {
  const channel = supabase.channel("tasks_channel");

  channel
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "tasks",
      },
      (payload) => {
        const newTask = payload.new;
        dispatch(taskAdded(newTask)); // 👈 Dispatch Redux action
      }
    )
    .subscribe((status) => {
      console.log("Subscription status:", status);
    });

  return () => {
    supabase.removeChannel(channel); // cleanup
  };
};
