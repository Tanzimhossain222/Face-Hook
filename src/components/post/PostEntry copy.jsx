import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import useAxios from "../../api/useAxios";
import AddPhoto from "../../assets/icons/addPhoto.svg";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";
import useProfile from "../../hooks/useProfile";
import Field from "../common/Field";

const PostEntry = ({ onCreate, post }) => {
  const { auth } = useAuth();
  const { axiosInstance } = useAxios();
  const { dispatch } = usePost();
  const { state: profile } = useProfile();
  const [isEditMode, setIsEditMode] = useState(post ? true : false);

  console.log(isEditMode, post?.content);

  const user = profile?.user ?? auth?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handlePostSubmit = async (formData) => {
    console.log(formData);
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
        { formData }
      );

      if (response.status === 200) {
        dispatch({
          type: actions.post.DATA_CREATED,
          data: response.data,
        });
        onCreate();
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: error.message,
      });

      setError("content", {
        type: "manual",
        message: "Failed to create post",
      });
    }
  };

  const handleEditSubmit = async (formData) => {
    console.log(formData);
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`,
        { formData }
      );

      if (response.status === 200) {
        dispatch({
          type: actions.post.DATA_UPDATED,
          data: response.data,
        });
        onCreate();
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: error.message,
      });

      setError("content", {
        type: "manual",
        message: "Failed to update post",
      });
    }
  };

  return (
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        {isEditMode ? "Update Post" : "Create Post"}
      </h6>
      <form onSubmit={handleSubmit(isEditMode ? handleEditSubmit : handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}{" "}
              </h6>

              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            className="btn-primary cursor-pointer !text-gray-100"
            htmlFor="photo"
          >
            <img src={AddPhoto} alt="Add Photo" />
            Add Photo
          </label>
          <input type="file" name="photo" id="photo" className="hidden" />
        </div>
        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some text is mandatory!",
            })}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
          ></textarea>
        </Field>
        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            {isEditMode ? "Update" : "Post"}
          </button>
        </div>
      </form>
      {isEditMode && post && (
        <div>
          <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
            Original Post
          </h6>
          <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
            <div className="flex items-center gap-3">
              <img
                className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${post.author.avatar}`}
                alt="avatar"
              />
              <div>
                <h6 className="text-lg lg:text-xl">
                  {post.author.name}{" "}
                </h6>

                <span className="text-sm text-gray-400 lg:text-base">Public</span>
              </div>
            </div>
            {post.image && (
              <img
                className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${post.image}`}
                alt="post image"
              />
            )}
          </div>
          <Field label="Content" error={errors.content}>
            <textarea
              {...register("content", {
                required: "Adding some text is mandatory!",
              })}
              name="content"
              id="content"
              placeholder="Share your thoughts..."
              className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
            ></textarea>
          </Field>
          <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
            <button
              className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

PostEntry.propTypes = {
  onCreate: PropTypes.func,
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    postType: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        author: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    likes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    createAt: PropTypes.string.isRequired,
  }),
};

export default PostEntry;
