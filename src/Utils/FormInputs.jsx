/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { IoIosCloseCircle, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CatagoryBtn from "./CatagoryBtn";
import { v4 as uuidv4 } from "uuid";
import { catagory } from "../constants/Data";

const FormInputs = ({ data, setData, setAddNotification, setAddNotificationTitle }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedCatagory, setSelectedCatagory] = useState([]);

  const [inputError, setInputError] = useState({
    nameError: "",
    descriptionError: "",
    maxCategoryError: false,
    noCategoryError: false,
  });

  const [CategoryOpen, setCategoryOpen] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = (e) => e.key === "Enter" && e.preventDefault();

  const handleName = (e) => {
    const title = e.target.value;
    setTaskName(title);

    setInputError((prev) => ({
      ...prev,
      nameError: title.length > 35 ? "Name should be less than or equal to 30 characters" : "",
    }));
  };

  const handleDescription = (e) => {
    const description = e.target.value;
    setTaskDescription(description);

    setInputError((prev) => ({
      ...prev,
      descriptionError: description.length > 250 ? "Description should be less than or equal to 200 characters" : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !taskDescription || !selectedCatagory.length) {
      setInputError({
        nameError: !taskName ? "Please enter a task name" : "",
        descriptionError: !taskDescription ? "Please enter a task description" : "",
        noCategoryError: !selectedCatagory.length,
      });
      return;
    }

    const now = new Date();
    const currentTime = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}, ${now
      .getHours()
      .toString()
      .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;

    const newTask = {
      id: uuidv4(),
      title: taskName,
      description: taskDescription,
      currentTime,
      check: false,
      catagory: selectedCatagory,
    };

    localStorage.setItem("todoItems", JSON.stringify([...data, newTask]));
    setData([...data, newTask]);
    setTaskName("");
    setTaskDescription("");
    setSelectedCatagory([]);
    setInputError({ nameError: "", descriptionError: "", maxCategoryError: false, noCategoryError: false });
    navigate("/");

    setAddNotificationTitle(taskName);
    setAddNotification(true);
    setTimeout(() => {
      setAddNotification(false);
      setAddNotificationTitle("");
    }, 4000);
  };

  const handleSelected = (catagoryObj) => {
    const isSelected = selectedCatagory.some((cat) => cat.id === catagoryObj.id);

    if (isSelected) {
      setSelectedCatagory(selectedCatagory.filter((cat) => cat.id !== catagoryObj.id));
    } else {
      if (selectedCatagory.length < 3) {
        setSelectedCatagory([...selectedCatagory, catagoryObj]);
        setInputError((prev) => ({ ...prev, maxCategoryError: false, noCategoryError: false }));
      } else {
        setInputError((prev) => ({ ...prev, maxCategoryError: true }));
        setTimeout(() => setInputError((prev) => ({ ...prev, maxCategoryError: false })), 4000);
      }
    }
  };

  const catagoryRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => !catagoryRef.current.contains(e.target) && setCategoryOpen(false);
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="py-10">
      <form onSubmit={handleSubmit} className="max-w-[600px] m-auto">
        <div>
          <label className={`text-sm ${inputError.nameError ? "text-red-500" : "text-blue-200"}`} htmlFor="taskName">
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            placeholder="Enter task name"
            value={taskName}
            onChange={handleName}
            onKeyDown={handleKeyDown}
            className={`w-full h-14 rounded-xl p-4 text-base mt-1 outline-none ${
              inputError.nameError ? "border-red-500 border-2" : ""
            }`}
          />
          {inputError.nameError && <p className="text-red-500 text-sm mt-1">{inputError.nameError}</p>}
        </div>
        <div className="mt-7">
          <label className={`text-sm ${inputError.descriptionError ? "text-red-500" : "text-blue-200"}`}>
            Task Description
          </label>
          <textarea
            id="taskDescription"
            placeholder="Enter task description"
            value={taskDescription}
            onChange={handleDescription}
            className={`resize-none w-full h-48 rounded-xl p-4 mt-1 outline-none ${
              inputError.descriptionError ? "border-red-500 border-2" : ""
            }`}
          ></textarea>
          {inputError.descriptionError && <p className="text-red-500 text-sm mt-1">{inputError.descriptionError}</p>}
        </div>
        <div ref={catagoryRef} className="mt-7">
          <label className="text-sm text-blue-200">Category</label>
          <div
            onClick={() => setCategoryOpen(!CategoryOpen)}
            className="bg-white flex justify-between items-center min-h-14 px-3 py-3 rounded-xl w-full mt-1 cursor-pointer"
          >
            <div className="flex gap-2 flex-wrap">
              {selectedCatagory.map((val, index) => (
                <div
                  key={index}
                  className="bg-blue-500 text-white text-sm flex items-center gap-1 px-3 py-2 font-medium rounded-lg"
                >
                  <span>{val.emoji}</span> {val.catagory}
                </div>
              ))}
            </div>
            <div>{CategoryOpen ? <IoIosArrowUp className="text-2xl" /> : <IoIosArrowDown className="text-2xl" />}</div>
          </div>
          {CategoryOpen && (
            <div className="mt-3">
              <ul className="p-2 bg-blue-400 flex flex-col gap-2 rounded-xl">
                <li className="my-2 px-3 text-white">Select max (3 Categories)</li>
                {catagory.map((val, index) => (
                  <CatagoryBtn
                    key={index}
                    val={val}
                    selectedCatagory={selectedCatagory}
                    handleSelected={handleSelected}
                  />
                ))}
              </ul>
            </div>
          )}
          {inputError.noCategoryError && (
            <p className="text-red-600 text-sm mt-1">Please select at least one category.</p>
          )}
        </div>
        <div className="text-center mt-4">
          <button
            disabled={!!inputError.nameError || !!inputError.descriptionError}
            type="submit"
            className={`transition text-xl font-bold p-4 rounded-xl w-full ${
              !!inputError.nameError || !!inputError.descriptionError
                ? "bg-blue-700 cursor-not-allowed text-blue-400"
                : "bg-blue-400 hover:bg-blue-800 text-white"
            }`}
          >
            Create Task
          </button>
        </div>
      </form>


      {inputError.maxCategoryError && (
        <div className="notification bg-white border-l-4 border-red-600 text-red-600 fixed top-8 left-1/2 -translate-x-1/2">
          <IoIosCloseCircle className="text-3xl" /> You cannot add more than 3 categories.
        </div>
      )}
    </div>
  );
};

export default FormInputs;
