import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { RootState } from "../../store";
import { clearUser, setUser, UserState } from "./userSlice";

const useUserSlice = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const handleUser = (userInfo: UserState) => {
    dispatch(setUser(userInfo));
  };

  const handleClearUser = () => {
    dispatch(clearUser());
  };

  return {
    user,
    setUser: handleUser,
    clearUser: handleClearUser,
  };
};

export default useUserSlice;
