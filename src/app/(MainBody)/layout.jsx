"use client";
//redux
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/hooks";
import {
  setSideBarToggle,
  setEditHabitData,
} from "@/ReduxToolkit/Reducers/Layout/LayoutReducer";
import { nextDate, prevDate } from "@/ReduxToolkit/Reducers/Date/dateSlice";
import ImgInBtn from "@/components/ui/ImgInBtn";

//components
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import SideBarLog from "@/components/layout/SideBarLog";
import CommonSideBarOffcanvas from "@/components/sideBarModal/CommonSideBarOffCanvas";
import HabitForm from "@/components/sideBarModal/HabitForm";
import SessionHydrator from "@/utils/auth/SessionHydrator";
//services & helpers
import {
  useCreateHabit,
  useUpdateHabit,
} from "@/app/hooks/habitAPI/habitQuery";
import { useGetLogsByDate } from "@/app/hooks/habitLogAPI/logQuery";
import { IsoDate } from "@/utils/helpers/dateFormat";
import { useLogout } from "../hooks/authAPI/useAuth";
import { deleteToken } from "../services/auth/authService";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearUser } from "@/ReduxToolkit/Reducers/Auth/authSlice";

const defaultFormData = {
  habitName: "",
  isPositiveHabit: true,
  weekFrequency: [true, true, true, true, true, true, true],
  palette: "var(--habit-1)",
};

export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutate: logout } = useLogout();

  const isSidebarOpen = useAppSelector((state) => state.layout.sideBarToggle);
  const editHabit = useAppSelector((state) => state.layout.editHabitData);
  const userDetails = useAppSelector((state) => state.auth.user);
  const selectedDate = useAppSelector((state) => state.date.selectedDate);
  const [canMvFwd, setCanMvFwd] = useState(false);
  const [canMvBwd, setCanMvBwd] = useState(true);

  useEffect(() => {
  if (!userDetails?.createdAt) return;

  const today = new Date();
  const selected = new Date(selectedDate);
  const userCreatedAt = new Date(userDetails.createdAt);

  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const selectedOnly = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate()).getTime();
  const userCreatedOnly = new Date(userCreatedAt.getFullYear(), userCreatedAt.getMonth(), userCreatedAt.getDate()).getTime();

  setCanMvFwd(selectedOnly < todayOnly);

  setCanMvBwd(selectedOnly > userCreatedOnly);
}, [selectedDate, userDetails?.createdAt]);

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

  const logoutUser = async () => {
    await deleteToken();
    logout(undefined, {
      onSuccess: () => {
        router.push("/auth/login");
        dispatch(clearUser());
      },
    });
  };

  return (
    <SessionHydrator>
      <>
        <TopBar logoutUser={logoutUser} />
        <div className="main-grid">
          <div className="left-area">
            <Header userDetails={userDetails} />

            {/* ---- MAIN PAGE CONTENT ---- */}
            <div className="main-content d-flex flex-column gap-4">
              {children}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="sidebar-area">
            {/* ---- DATE HEADER + CHEVRONS ---- */}
            <div className="date-nav my-3 d-flex justify-content-between align-items-center">
              <h3 className="fw-light">{selectedDate.toDateString()}</h3>

              <div className="d-flex gap-3">
                <ImgInBtn
                  className={`chevron-btn ${
                    canMvBwd ? "" : "chevron-disabled"
                  }`}
                  dir="arrowsAndChevrons/chevron-left.svg"
                  clickEvent={() => canMvBwd && dispatch(prevDate())}
                />
                <ImgInBtn
                  className={`chevron-btn ${
                    canMvFwd ? "" : "chevron-disabled"
                  }`}
                  dir="arrowsAndChevrons/chevron-right.svg"
                  clickEvent={() => canMvFwd && dispatch(nextDate())}
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
    </SessionHydrator>
  );
}
