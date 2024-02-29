import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import axiosInstance from "./axiosInstance";

const useAxios = () => {
    const { auth, setAuth } = useAuth();
    useEffect(() => {

        //add a request interceptor
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                const authToken = auth?.authToken;
                if (authToken) {
                    config.headers.Authorization = `Bearer ${authToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );


        //add a response interceptor
        const responseInterceptor = axiosInstance.interceptors.response.use(
            (res) => res,

            //handle the response error
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = auth?.refreshToken;
                        const res = await axiosInstance.post("/auth/refresh-token", { refreshToken });

                        if (res.status === 200) {
                            const newAuthToken = res.data.token;
                            setAuth({ ...auth, authToken: newAuthToken });

                            originalRequest.headers.Authorization = `Bearer ${newAuthToken}`;

                            return axiosInstance(originalRequest);
                        }

                    } catch (error) {

                        return Promise.reject(error);
                    }
                }
            }
        )

        //clean up
        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        }

    }, [auth, setAuth])

    return { axiosInstance }
}

export default useAxios;