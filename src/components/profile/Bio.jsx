import React, { useState } from "react";
import useAxios from "../../api/useAxios";
import useProfile from "../../hooks/useProfile";
import checkIcon from "./../../assets/icons/check.svg";
import editIcon from "./../../assets/icons/edit.svg";
import { actions } from "../../actions";

const Bio = () => {
  const { state, dispatch } = useProfile();
  const [bio, setBio] = useState(state?.user?.bio);
  const [isEditing, setIsEditing] = useState(false);
  const { axiosInstance } = useAxios();

  const handleBioEdit = async () => {
    dispatch({type: actions.profile.DATA_FETCHING})
    try{
      const response = await axiosInstance.patch(`/profile/${state?.user?.id}`, {bio});

      if(response.status === 200){
        dispatch({type: actions.profile.USER_DATA_EDITED, data: response.data})
        setIsEditing(false);
      } 

    }catch(err){
      dispatch({type: actions.profile.DATA_FETCHED_ERROR, error: err.message })
    }
  }

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!isEditing ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio}
          </p>
        ) : (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            cols={55}
            className="w-full h-24 lg:h-32 p-2 rounded-md bg-[#333] text-gray-300"
          ></textarea>
        )}
      </div>

      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="flex-center h-7 w-7 rounded-full"
        >
          <img src={editIcon} alt="Edit" />
        </button>
      ) : ( 
        <button
          onClick={handleBioEdit}
          className="flex-center h-7 w-7 rounded-full"
        >
          <img src={checkIcon} alt="Check" />
        </button>
      )}
    </div>
  );
};

export default Bio;
