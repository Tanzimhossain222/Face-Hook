import React, { useRef } from "react";
import useProfile from "../../hooks/useProfile";
import editIcon from "./../../assets/icons/edit.svg";
import useAxios from "../../api/useAxios";
import { actions } from "../../actions";
// {{BASE_URL}}/profile/1aeef0f0-77ba-456b-8b5b-d4145a9b5410/avatar
const ProfileImage = () => {
  const { state, dispatch } = useProfile();
  const { axiosInstance } = useAxios();
  const fileUploadRef = useRef(null);

  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener("change", updateImageDisplay);
    fileUploadRef.current.click();
  };

  const updateImageDisplay = async () => {
    const formData = new FormData();
    for (const file of fileUploadRef.current.files) {
      formData.append("avatar", file);
    }

    try {
      const response = await axiosInstance.post(
        `/profile/${state?.user?.id}/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        dispatch({ type: actions.profile.IMAGE_UPLOADED, data: response.data });
      } 

    } catch (err) {
      dispatch({type: actions.profile.DATA_FETCHED_ERROR, error: err.message })
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="max-w-full"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
        alt={state?.user?.firstName}
      />

      <form>
        <button
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
          onClick={handleImageUpload}
        >
          <img src={editIcon} alt="Edit" />
        </button>
        <input type="file" id="file" ref={fileUploadRef} hidden />
      </form>
    </div>
  );
};

export default ProfileImage;
