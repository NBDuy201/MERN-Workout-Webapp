import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useQuery, useQueryClient } from "react-query";
import { workoutApi } from "~/api/workoutApi";
import WorkoutDetails from "~/components/WorkoutDetails";
import WorkoutForm from "~/components/WorkoutForm";
import { reactQueryKey, sleep } from "~/utils/fetch";

const Home = () => {
  const [sortedData, setSortedData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  console.log("🚀 ~ file: Home.jsx:11 ~ Home ~ sortedData:", sortedData);
  const { data: workouts, isFetching } = useQuery({
    queryKey: reactQueryKey.WORKOUT_LIST(),
    queryFn: () => workoutApi.getWorkouts(),
    select: (res) =>
      res?.data?.map((item, index) => ({ ...item, index: index })) ?? [],
    onSuccess: (data) => {
      setSortedData(data ?? []);
    },
  });
  // console.log("🚀 ~ file: Home.jsx:8 ~ Home ~ workouts:", workouts);

  const queryClient = useQueryClient();

  function moveItem(arr = [], from = 0, to = 0) {
    let res = [...arr];
    let fromItem = res.splice(from, 1)[0]; // remove 'from' item + store it
    res.splice(to, 0, fromItem); // insert stored 'from' item

    return res;
  }

  function handleDragDrop(results) {
    // console.log("🚀 ~ file: Home.jsx:16 ~ Home ~ results:", results);
    const { destination, source, type } = results;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Move item
    let movedWorkouts = moveItem(sortedData, source.index, destination.index);
    setSortedData(movedWorkouts);
  }

  async function handleSaveOrder() {
    try {
      const reqData = sortedData.map((item) => item._id);
      console.log("🚀 ~ file: Home.jsx:100 ~ reqData ~ reqData:", reqData);
      await workoutApi.updateWorkoutOrder(reqData);
      queryClient.invalidateQueries({ queryKey: reactQueryKey.WORKOUT_LIST() });
    } catch (error) {
      console.log("🚀 ~ file: Home.jsx:96 ~ handleDragDrop ~ error:", error);
    }
  }

  async function handleResetOrder() {
    setIsLoading(true);
    await sleep(500);
    setSortedData(workouts);
    setIsLoading(false);
  }

  const disableSave = React.useMemo(() => {
    return isSameArray() ? true : false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedData, workouts?.length]);

  function isSameArray() {
    if (!workouts || (sortedData?.length === 0 && workouts?.length === 0)) {
      return true;
    }
    return JSON.stringify(sortedData) === JSON.stringify(workouts);
  }

  return (
    <div className="page-container my-4 flex gap-x-4">
      <div className="workout-list w-3/4 flex flex-col gap-y-4 justify-between min-h-[calc(100vh-116px-2rem)]">
        <DragDropContext onDragEnd={handleDragDrop}>
          <Droppable droppableId="workout-droppable" type="group">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col gap-y-4"
              >
                {isFetching || isLoading
                  ? "Loading..."
                  : sortedData?.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided) => (
                          <WorkoutDetails
                            workout={item}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="sticky bottom-0 bg-white p-2 rounded-md flex gap-x-4">
          <button
            className={`text-white p-2 rounded-md ${
              disableSave ? "bg-slate-300" : "bg-green-500"
            }`}
            onClick={handleSaveOrder}
            disabled={disableSave}
          >
            Save Order
          </button>
          <button
            className={`text-white p-2 rounded-md ${
              disableSave ? "bg-slate-300" : "bg-blue-500"
            }`}
            onClick={handleResetOrder}
            disabled={disableSave}
          >
            Reset Order
          </button>
        </div>
      </div>
      <div className="flex-1 self-start sticky top-[calc(116px+1rem)]">
        <WorkoutForm />
      </div>
      {/* <h2>Home</h2> */}
    </div>
  );
};

export default Home;
