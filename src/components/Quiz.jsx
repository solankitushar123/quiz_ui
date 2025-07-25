import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  nextStep,
  prevStep,
  setCategory,
  setSubCategory,
  setLevel,
  setMode,
} from "../redux/quizSlice";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import SignupForm from "./SignupForm";

const Quiz = () => {
  const dispatch = useDispatch();
  const totalSteps = 5;

  const [startQuiz, setStartQuiz] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [step, setStep] = useState(1);
  const [category, setCategoryState] = useState("");
  const [subCategory, setSubCategoryState] = useState("");
  const [level, setLevelState] = useState("");
  const [mode, setModeState] = useState("");

  const [shake, setShake] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const boxRef = useRef(null);

  const stepTitle = [
    "What do you want to learn?",
    `What ${category?.toLowerCase()} do you want to learn?`,
    "What is your level of learning?",
    "Preferred learning mode?",
    "Review your selections",
  ];

  const stepSubtitle =
    "Choose your preferences to personalize your learning journey.";

  const renderOptions = (options, selected, setAction) => (
    <div className="space-y-3 mt-4">
      {options.map((opt) => (
        <div
          key={opt}
          className={`border p-3 rounded-lg cursor-pointer text-center font-medium transition-all ${
            selected === opt
              ? "border-blue-600 bg-blue-100 text-blue-800"
              : "hover:bg-blue-50"
          }`}
          onClick={() => {
            setAction(opt);
            setShowAlert(false);
          }}
        >
          {opt}
        </div>
      ))}
    </div>
  );

  const handleSubmit = () => {
    Swal.fire({
      icon: "success",
      title: "🎉 Quiz Submitted!",
      html: `<div style='text-align:left'><p><strong>Category:</strong> ${category}</p><p><strong>Option:</strong> ${subCategory}</p><p><strong>Level:</strong> ${level}</p><p><strong>Mode:</strong> ${mode}</p></div>`,
      confirmButtonText: "Back to Home",
      confirmButtonColor: "#007bff",
    }).then(() => {
      setStartQuiz(false);
      setShowSignup(false);
      setStep(1);
      setCategoryState("");
      setSubCategoryState("");
      setLevelState("");
      setModeState("");
    });
  };

  const handleNext = () => {
    let valid = true;
    if (
      (step === 1 && !category) ||
      (step === 2 && !subCategory) ||
      (step === 3 && !level) ||
      (step === 4 && !mode)
    ) {
      valid = false;
    }

    if (!valid) {
      setShowAlert(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setShowAlert(false);
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => setStep((prev) => prev - 1);

  const getSubCategoryOptions = () => {
    if (category === "Music") {
      return ["Keyboard", "Guitar", "Violin", "Drums", "Ukulele", "Vocals"];
    } else if (category === "Arts & Crafts") {
      return [
        "Origami",
        "Sketching",
        "Crochet",
        "Drawing",
        "Painting",
        "Sculpture",
      ];
    } else if (category === "Dance") {
      return ["Ballet", "Hip Hop", "Contemporary", "Kathak"];
    } else if (category === "Games") {
      return ["Chess", "Sudoku", "Puzzles"];
    } else if (category === "Languages") {
      return ["English", "Spanish", "French"];
    } else if (category === "Drama") {
      return ["Acting", "Voice Modulation", "Script Reading"];
    } else {
      return [];
    }
  };

  if (!startQuiz && !showSignup) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-4 space-y-6">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-sky-500 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:from-blue-600 hover:to-sky-600 transition"
          onClick={() => setStartQuiz(true)}
        >
          Start Quiz
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:from-green-600 hover:to-teal-600 transition"
          onClick={() => setShowSignup(true)}
        >
          Sign Up
        </motion.button>
      </div>
    );
  }

  if (showSignup) return <SignupForm />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <motion.div
        ref={boxRef}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`bg-white shadow-xl rounded-2xl w-full max-w-lg h-[560px] sm:h-[600px] flex flex-col transition-all duration-300 ${
          shake ? "animate-shake" : ""
        }`}
      >
        <div className="p-6 border-b relative">
          <div className="text-sm font-medium text-gray-500 text-center mb-2">
            Step {step} of {totalSteps}
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-sky-400 transition-all duration-300"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {stepTitle[step - 1]}
            </h2>
            <p className="text-sm text-gray-500">{stepSubtitle}</p>

            {showAlert && (
              <div className="mt-4 text-sm text-red-600 font-semibold animate-pulse">
                ⚠️ Please choose an option to continue.
              </div>
            )}
          </div>

          {step === 1 &&
            renderOptions(
              [
                "Music",
                "Dance",
                "Games",
                "Arts & Crafts",
                "Languages",
                "Drama",
              ],
              category,
              setCategoryState
            )}

          {step === 2 &&
            renderOptions(
              getSubCategoryOptions(),
              subCategory,
              setSubCategoryState
            )}

          {step === 3 &&
            renderOptions(
              ["Beginner", "Intermediate", "Advanced", "Certified"],
              level,
              setLevelState
            )}

          {step === 4 &&
            renderOptions(["Online", "Offline", "Both"], mode, setModeState)}

          {step === 5 && (
            <div className="text-gray-700 space-y-4 text-base bg-blue-50 p-5 rounded-xl border border-blue-200">
              <p>
                <strong>Category:</strong> {category}
              </p>
              <p>
                <strong>Option:</strong> {subCategory}
              </p>
              <p>
                <strong>Level:</strong> {level}
              </p>
              <p>
                <strong>Mode:</strong> {mode}
              </p>
              <button
                className="mt-6 w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 px-6 text-base font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 transition"
                onClick={handleSubmit}
              >
                ✅ Confirm and Submit
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center p-6 border-t">
          {step > 1 ? (
            <button
              className="bg-blue-500 text-white px-6 py-2 text-sm rounded-md hover:bg-blue-600 transition"
              onClick={handlePrev}
            >
              ← Previous
            </button>
          ) : (
            <div></div>
          )}

          {step < 5 && (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-6 py-2 text-sm rounded-md hover:bg-blue-600 transition"
            >
              Next →
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;
