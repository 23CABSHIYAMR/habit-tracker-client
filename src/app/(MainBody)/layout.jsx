"use client";

import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/hooks";
import {
  setSideBarToggle,
  setEditHabitData,
} from "@/ReduxToolkit/Reducers/Layout/LayoutReducer";
import { nextDate, prevDate } from "@/ReduxToolkit/Reducers/Date/dateSlice";
import Image from "next/image";
import Header from "@/components/layout/header/Header";
import SideBarLog from "@/components/SideBarLog";
import CommonSideBarOffcanvas from "@/components/ui/CommonSideBarOffCanvas";
import HabitForm from "@/components/habits/HabitForm";

import {
  useCreateHabit,
  useUpdateHabit,
} from "@/app/hooks/habitAPI/habitQuery";
import { useGetLogsByDate } from "@/app/hooks/habitLogAPI/logQuery";
import { IsoDate } from "@/utils/helpers/dateFormat";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { useState, useEffect } from "react";
import { deleteToken } from "../services/auth/authService";
import { useRouter } from "next/navigation";
const defaultFormData = {
  habitName: "",
  isPositiveHabit: true,
  weekFrequency: [true, true, true, true, true, true, true],
  palette: "#155EEF",
};

export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.layout.sideBarToggle);
  const editHabit = useAppSelector((state) => state.layout.editHabitData);

  const selectedDate = useAppSelector((state) => state.date.selectedDate);

  const {
    data: logsForDate,
    isLoading,
    error,
  } = useGetLogsByDate(IsoDate(selectedDate));

  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});

  const resetFormData = () => {
    setFormData(defaultFormData);
    setErrors({});
  };
  useEffect(() => {
    if (editHabit) {
      setFormData({
        habitName: editHabit.habitName,
        isPositiveHabit: editHabit.isPositiveHabit,
        weekFrequency: editHabit.weekFrequency,
        palette: editHabit.palette,
      });
    } else {
      resetFormData();
    }
  }, [editHabit]);

  const { mutate: createHabit, isPending } = useCreateHabit();
  const { mutate: updateHabit } = useUpdateHabit();

  const validateForm = () => {
    let err = {};
    if (!formData.habitName.trim()) err.habitName = "Habit name is required";
    if (!formData.weekFrequency.some(Boolean))
      err.weekFrequency = "Select at least one day";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editHabit) {
      updateHabit(
        {
          habitId: editHabit.habitId,
          updates: {
            habitName: formData.habitName,
            isPositiveHabit: formData.isPositiveHabit,
            palette: formData.palette,
          },
        },
        {
          onSuccess: () => {
            dispatch(setEditHabitData(null));
            dispatch(setSideBarToggle(false));
            resetFormData();
          },
        }
      );
    } else {
      createHabit(formData, {
        onSuccess: () => {
          dispatch(setSideBarToggle(false));
          resetFormData();
        },
      });
    }
  };

  const logoutUser= async() =>{
    const response= await deleteToken();
    console.log("Logged out successfully");
    router.push("/auth/login")
  }

  return (
    <>
      <div className="w-100 p-1">
        <button
        className="rmv-btn-style circle-border p-1"
        onClick={logoutUser}
        >
          <Image
            src={"/assets/images/topBar/logout.svg"}
            alt={"logout"}
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className="main-grid">
        {/* LEFT SIDE */}
        <div className="left-area">
          <Header />

          {/* ---- MAIN PAGE CONTENT ---- */}
          <div className="main-content">{children}</div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="sidebar-area">
          {/* ---- DATE HEADER + CHEVRONS ---- */}
          <div className="date-nav my-3 d-flex justify-content-between align-items-center">
            <h3 className="fw-light">{selectedDate.toDateString()}</h3>

            <div className="d-flex gap-3">
              <IoIosArrowBack
                className="chevron-btn"
                onClick={() => dispatch(prevDate())}
              />
              <IoIosArrowForward
                className="chevron-btn"
                onClick={() => dispatch(nextDate())}
              />
            </div>
          </div>
          <SideBarLog
            isLoading={isLoading}
            logs={logsForDate || []}
            date={selectedDate}
          />
        </div>
      </div>

      {/* ---- ADD HABIT OFFCANVAS ---- */}
      <CommonSideBarOffcanvas
        isOpen={isSidebarOpen}
        toggle={() => dispatch(setSideBarToggle(false))}
        headerTitle={editHabit ? "Edit Habit" : "Add Habit"}
        headerSubTitle={
          editHabit ? "Update your habit details" : "Tackle your goals daily"
        }
        bodyContent={
          <HabitForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        }
        primaryBtnTxt={editHabit ? "Save Changes" : "Add Habit"}
        secondaryBtnTxt="Cancel"
        primaryAction={handleSubmit}
        secondaryAction={() => {
          dispatch(setEditHabitData(null));
          dispatch(setSideBarToggle(false));
        }}
      />
    </>
  );
}
