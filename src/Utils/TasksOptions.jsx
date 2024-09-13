import { useContext } from "react";
import { BiTask } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";

const TasksOptions = ({
  data,
  setData,
  val,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setOpenOptions,
  index
}) => {

  const { setIndex } = useContext(DataContext);

  // Function to get the current date and time
  const getCurrentTime = () => {
    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    let hours = now.getHours();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = (hours % 12 || 12).toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${date}/${month}/${year}, ${hours}:${minutes} ${amOrPm}`;
  };

  const handleDelete = (isData) => {
    const deleteData = data.filter((val) => val.id !== isData.id);
    setData(deleteData);
    localStorage.setItem("todoItems", JSON.stringify(deleteData));

    setDeleteNotificationTitle(isData.title);

    setDeleteNotification(true);
    setOpenOptions(false);
    setTimeout(() => {
      setDeleteNotification(false);
      setDeleteNotificationTitle("Task Deleted");
    }, 4000);
  };

  const handleCheck = (id) => {
    const doneData = data.map((val) =>
      val.id === id ? { ...val, check: !val.check } : val
    );
    setData(doneData);
    setOpenOptions(false);
    localStorage.setItem("todoItems", JSON.stringify(doneData));
  };

  const handleEdit = () => {
    if (val.check) {
      alert("You cannot edit a completed task.");
    } else {
      const updatedTime = getCurrentTime(); // Get the current time
      setIndex(index);
      setEdit({
        id: val.id,
        title: val.title,
        description: val.description,
        check: val.check,
        currentTime: updatedTime, // Update the time when editing
        catagory: val.catagory,
      });
    }
  };

  return (
    <div className="absolute z-10 w-[215px] shadow bg-white top-8 left-0 max-xl:-left-48 p-3 rounded-2xl">
      <ul className="flex flex-col text-black">
        {/* Conditionally render "Mark as done" only if task is not completed */}
        {!val.check && (
          <li
            onClick={() => handleCheck(val.id)}
            className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 max-sm:py-2 px-2 rounded-md"
          >
            <FaCheck className="text-2xl max-sm:text-xl text-slate-700" />
            Mark as done
          </li>
        )}

        <li
          onClick={handleEdit}
          className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
        >
          <RiEdit2Fill className="text-2xl max-sm:text-xl text-slate-700" />
          {/* Only navigate to edit page if task is not completed */}
          {val.check ? "Edit" : <Link to="/edit">Edit</Link>}
        </li>

        {/* Remove the Copy button */}

        <li
          onClick={() => handleDelete(val)}
          className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
        >
          <MdDelete className="text-2xl max-sm:text-xl text-slate-700" />
          Delete
        </li>
        <li>
          <Link
            to={`/todo/${val.id}`}
            className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
          >
            <BiTask className="text-2xl max-sm:text-xl text-slate-700" />
            Task details
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TasksOptions;
