import { useForm, Controller } from "react-hook-form";
import Input from "../Components/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import databaseService from "../appwrite/databaseService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addPost, updatePost } from "../store/postSlice";
import { v4 as uuidv4 } from "uuid";
export default function PostForm({ label, buttonlabel, initialData = null }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  }, [initialData]);
  async function submit(data) {
    try {
      if(initialData){
        const updatePostResponse = await databaseService.editPost(
          initialData.$id,
          data
        );
        if (!updatePostResponse) throw new Error("error updating post");
        dispatch(updatePost(updatePostResponse));
        toast.success("post updated successfully");
        setTimeout(() => {
          navigate(`/article/${updatePostResponse.$id}`);
          reset();
        }, 1500);
      }
      else {
        const payload = {
          ...data,
          id: uuidv4(),
          userId: currentUser.$id,
          date: new Date().toLocaleDateString(),
          author: currentUser.name,
        };
        const createPostResponse = await databaseService.createPost(payload);
        console.log(createPostResponse);
        if (!createPostResponse) throw new Error("Error creating Post");
        dispatch(addPost(createPostResponse));
        toast.success("Posted Successfully");
        setTimeout(() => {
          navigate(`/article/${createPostResponse.$id}`);
          reset();
        }, 1500);
      }
      } 
     catch (error) {
      toast.error(error.message || "OOPs something went wrong");
    }
  }

  return (
    <div className="min-h-[calc(100dvh-140px)] flex justify-center items-center pt-10 p-5 md:px-10 dark:bg-dark-primary">
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
          <div className="my-7 dark:text-white">
            <label htmlFor="select" className="font-semibold inline-block mb-2">Select a status</label>
            <select
              {...register("status")}
              className="inline-block w-full outline-none appearance-none border  border-accent rounded p-2"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className="group content-area dark:text-white">
                <label className="block text-sm font-semibold mb-2">
                  Content
                </label>
                <textarea
                  placeholder="Write your markdown content here..."
                  rows={16}
                  className="w-full  border border-accent rounded-2xl px-6 py-4 text-base outline-none"
                  {...register("content", { required: "Content is required" })}
                />
                {errors?.content && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.content.message}
                  </p>
                )}
              </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white bg-accent rounded whitespace-nowrap px-5 py-2 w-full font-medium mt-7 mx-auto block hover:scale-105 active:scale-95 transition duration-300 ease-linear"
          >
            {isSubmitting ? "Posting..." : buttonlabel}
          </button>
        </form>
      </div>
    </div>
  );
}
