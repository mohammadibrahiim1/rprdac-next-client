"use client";
import { setUser } from "@/redux/features/auth/authSlice";
import { useMeQuery } from "@/redux/services/authApi";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface AppInitializerProps {
  children: ReactNode;
}

export default function AppInitializer({ children }: AppInitializerProps) {
  const dispatch = useDispatch();
  const { data, isFetching, isLoading } = useMeQuery();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!isLoading && !isFetching) {
      if (data?.success && data.user) dispatch(setUser(data.user));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInitialized(true);
    }
  }, [data, dispatch, isFetching, isLoading]);

  if (!initialized) return null; // wait until user state is loaded

  return <>{children}</>;
}
