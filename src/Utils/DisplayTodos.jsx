/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState, useMemo, useCallback } from "react";
import { IoMdSearch } from "react-icons/io";
import Todo from "./Todo";

const DisplayTodos = ({
  data,
  setData,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setTaskDetails,
}) => {
  const [search, setSearch] = useState("");
  const [showProgressBox, setShowProgressBox] = useState(true);

  const completedTask = useMemo(() => {
    const completed = data.filter((val) => val.check);
    return data.length ? ((completed.length / data.length) * 100).toFixed() : 0;
  }, [data]);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const searchResults = useMemo(() => {
    return data.filter(
      (val) =>
        val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const handleTasksStatus = useCallback(() => {
    const parsePercentage = parseFloat(completedTask);
    if (parsePercentage === 0) return "No tasks completed";
    if (parsePercentage === 100) return "All tasks completed";
    return parsePercentage >= 50
      ? "More than half tasks completed"
      : "Less than half tasks completed";
  }, [completedTask]);

  const toggleProgressBox = () => setShowProgressBox((prev) => !prev);

  return (
    <>
      {data.length ? (
        <div>
          {showProgressBox && (
            <div className=" max-md:container border text-white max-w-[700px] mt-8 max-sm:mt-2 m-auto rounded-3xl bg-blue-400 p-10 max-sm:p-5">
              <h1 className="text-2xl max-sm:text-base font-medium">
                Progress summary
              </h1>
              <h3 className="max-sm:text-xs">{`${data.length} ${
                data.length > 1 ? "Tasks" : "Task"
              }`}</h3>

              <div className="flex flex-col w-[60%] max-sm:w-[100%] mt-7 max-sm:mt-5">
                <div className="flex justify-between items-center">
                  <p className="max-sm:text-xs">
                    Progress
                    <span
                      className={`text-sm max-sm:text-xs ${
                        handleTasksStatus() === "No tasks completed" ||
                        handleTasksStatus() === "Less than half tasks completed"
                          ? "text-red-500"
                          : "text-green-500"
                      } font-semibold`}
                    >
                      {" "}
                      ({handleTasksStatus()})
                    </span>
                  </p>
                  <p className="text-sm">{completedTask}%</p>
                </div>

                <div className="bg-blue-500 w-full h-2 mt-2 rounded-3xl">
                  <div
                    className="h-full rounded-3xl transition-all bg-blue-700"
                    style={{ width: `${completedTask}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div className="max-md:container max-w-[700px] m-auto mt-7 max-sm:mt-5 mb-7 max-sm:mb-5 relative flex items-center">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for task..."
                value={search}
                onChange={handleSearch}
                className="w-full h-14 max-sm:h-12 rounded-xl pl-11 pr-4 placeholder:text-sm outline-none"
              />
              <IoMdSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-blue-600 text-2xl max-sm:text-xl" />
            </div>
            <button
              onClick={toggleProgressBox}
              className="ml-4 bg-blue-700 hover:bg-blue-500 text-white p-4 rounded-xl border-white-100 border-solid border"
            >
              {showProgressBox ? "Hide Progress" : "View Progress"}
            </button>
            
          </div>

          <div className="max-md:container max-w-[700px] m-auto flex flex-col gap-4 max-sm:gap-3 pb-5">
            {searchResults.map((val, index) => (
              <Todo
                key={val.id || index}
                i={index}
                val={val}
                data={data}
                setData={setData}
                setEdit={setEdit}
                setDeleteNotificationTitle={setDeleteNotificationTitle}
                setDeleteNotification={setDeleteNotification}
                setTaskDetails={setTaskDetails}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="w-full text-center text-2xl max-md:text-2xl max-sm:text-xl text-white font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          You don't have any tasks
        </h1>
      )}
    </>
  );
};

export default DisplayTodos;