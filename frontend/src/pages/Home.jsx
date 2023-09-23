import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useQuery } from "react-query";
import { workoutApi } from "~/api/workoutApi";
import WorkoutDetails from "~/components/WorkoutDetails";
import WorkoutForm from "~/components/WorkoutForm";
import { reactQueryKey } from "~/utils/fetch";

const Home = () => {
  const [sortedData, setSortedData] = React.useState([]);
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

  function handleDragDrop(results) {
    console.log("🚀 ~ file: Home.jsx:16 ~ Home ~ results:", results);
    const { destination, source, type } = results;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let swappedWorkouts = [...sortedData];
    [swappedWorkouts[source.index], swappedWorkouts[destination.index]] = [
      swappedWorkouts[destination.index],
      swappedWorkouts[source.index],
    ];
    setSortedData(
      swappedWorkouts?.map((item, index) => ({
        ...item,
        index: index,
      })) ?? []
    );
  }

  const disableSave = true;

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
                {isFetching
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
        <div className="sticky bottom-0 bg-white p-2 rounded-md">
          <button
            className={`bg-green-500 text-white p-2 rounded-md ${
              isSameArray() ? "bg-slate-300" : ""
            }`}
            disabled={isSameArray() ? disableSave : true}
          >
            Save Workout Order
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
