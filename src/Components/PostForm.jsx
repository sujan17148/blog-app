import { useForm } from "react-hook-form";
import Input from "../Components/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import databaseService from "../appwrite/databaseService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaRegFilePdf } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { addNewPostStat, addPost, updatePost } from "../store/postSlice";
import { v4 as uuidv4 } from "uuid";
import { convertToMarkdown } from "../utils/convertToMarkdown";
export default function PostForm({ label,initialData = null }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clickedAction, setclickedAction] = useState(null);
  const currentUser = useSelector((state) => state.auth.userData);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
    if (!initialData) return;
    reset(initialData);
  }, [initialData, reset]);
  async function submit(data, event) {
    const status = event.nativeEvent.submitter.value || "published";
    //in the form event.target always point to form so for button had to use nativeEvent.submitter
    setclickedAction(status);
    const content = await convertToMarkdown(data.content);
    try {
      if (initialData) {
        const updatePostResponse = await databaseService.editPost(
          initialData.$id,
          { ...data, status, content }
        );
        if (!updatePostResponse) throw new Error("error updating post");
        dispatch(updatePost(updatePostResponse));
        toast.success("post updated successfully");
        setTimeout(() => {
          navigate(`/article/${updatePostResponse.$id}`);
          reset();
        }, 1500);
      } else {
        const payload = {
          ...data,
          id: uuidv4(),
          content,
          status,
          userId: currentUser.$id,
          date: new Date().toLocaleDateString(),
          author: currentUser.name,
        };
        const [createPostResponse] = await Promise.all([
          databaseService.createPost(payload),
          databaseService.createPostStats({ id: payload.id, userId: currentUser.$id }),
        ]);
        dispatch(addPost(createPostResponse));
        dispatch(
          addNewPostStat({ views: 0, likes: 0, $id: createPostResponse.$id })
        );
        toast.success("Posted Successfully");
        setTimeout(() => {
          navigate(`/article/${createPostResponse.$id}`);
          reset();
        }, 1500);
      }
    } catch (error) {
      toast.error(error.message || "OOPs something went wrong");
    } finally {
      setclickedAction(null);
    }
  }

  return (
    <div className="flex justify-center my-3 dark:bg-dark-primary">
      <div className="create-blog-form w-full max-w-[800px] relative min-h-[500px] p-5 rounded-2xl dark:bg-neutral-800 bg-white">
        <h1 className="mb-3 font-bold text-2xl dark:text-white">{label}</h1>
        <form action="" onSubmit={handleSubmit(submit)}>
          <Input
            label="Title"
            type="text"
            placeholder="Enter post title..."
            inputError={errors?.title?.message}
            {...register("title", { required: "Title is required" })}
          />
          <Input
            label="Tags"
            placeholder="Tags (comma separated)"
            inputError={errors?.tags?.message}
            {...register("tags", { required: "Atleast one tag is required" })}
          />
          <div className="group content-area dark:text-white mt-6">
            <label className="block text-sm font-semibold mb-2 ">Content</label>
            <textarea
              placeholder="Start writing your story here..."
              rows={16}
              className="w-full bg-primary dark:bg-dark-primary focus:border focus:border-accent rounded-2xl px-6 py-4 text-base outline-none hidescrollbar"
              {...register("content", { required: "Content is required" })}
            />
            {errors?.content && (
              <p className="mt-2 text-sm text-red-500 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.content.message}
              </p>
            )}
          </div>
          <div className="buttons flex justify-end gap-2 mt-2">
            <button
              className="dark:bg-white dark:text-black flex gap-2 items-center rounded px-5 py-2 font-medium bg-primary whitespace-nowrap"
              disabled={isSubmitting}
              type="submit"
              value="draft"
            >
              {" "}
              <FaRegFilePdf />{" "}
              {isSubmitting && clickedAction === "draft"
                ? "Saving..."
                : !isSubmitting && clickedAction === "draft"
                ? "Saved"
                : "Save Draft"}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              value="published"
              className="text-white bg-accent flex items-center gap-2 rounded whitespace-nowrap px-5 py-2  font-medium hover:scale-105 active:scale-95 transition duration-300 ease-linear"
            >
              <RiSendPlaneLine />{" "}
              {isSubmitting && clickedAction === "published"
                ? "Posting..."
                : !isSubmitting && clickedAction === "published"
                ? "Posted"
                : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
