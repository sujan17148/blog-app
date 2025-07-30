import { useForm, Controller } from "react-hook-form";
import Input from "../Components/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import databaseService from "../appwrite/databaseService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addPost, updatePost } from "../store/postSlice";
import { v4 as uuidv4 } from "uuid";
import  ContentEditor  from "./ContentEditor";
export default function PostForm({ label, buttonlabel, initialData = null }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.userData);
  const [previewImage, setPreviewImage] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
    if (!initialData) return;
    reset(initialData);
    setPreviewImage(databaseService.getFileView(initialData.image));
  }, [initialData]);
  const image = watch("image");
  useEffect(() => {
    if (image instanceof FileList && image.length > 0) {
      const file = image[0];
      const fileURL = URL.createObjectURL(file);
      setPreviewImage(fileURL);
      return () => URL.revokeObjectURL(fileURL);
    }
  }, [image]);
  async function submit(data) {
    try {
      const image = data.image[0] || initialData?.image;
      const responseFile = await databaseService.uploadFile(image);
      if (!responseFile) throw new Error("Error uploading image");
      const fileId = responseFile.$id;
      if (initialData) {
        const deleteFileResponse = await databaseService.deleteFile(
          initialData.image
        );
        if (!deleteFileResponse)
          throw new Error("error deleting previous image");
        const payload = {
          ...data,
          image: fileId,
        };
        const updatePostResponse = await databaseService.editPost(
          initialData.$id,
          payload
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
          image: fileId,
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
    } catch (error) {
      toast.error(error.message || "OOPs something went wrong");
    }
  }

  return (
    <div className="min-h-[calc(100dvh-140px)] flex justify-center items-center pt-10 p-5 md:px-10 dark:bg-slate-900">
      <div className="create-blog-form w-full max-w-[800px] relative min-h-[500px] p-5 rounded-2xl  shadow-[6px_6px_12px_#c5c5c5] dark:shadow-[6px_6px_12px_#000]">
        <h1 className="mb-3 font-bold text-2xl dark:text-white">{label}</h1>
        <form action="" onSubmit={handleSubmit(submit)}>
          <Input
            label="Title"
            type="text"
            placeholder="Enter post title..."
            inputError={errors?.title?.message}
            {...register("title", { required: "Title is required" })}
          />
          <div className="file relative dark:text-light-text">
            {previewImage && (
              <img src={previewImage} alt="preview" className="w-1/2 my-3" />
            )}
            <input
              type="file"
              label="Featured Image"
              accept="image/*"
              {...register("image", {
                required: "Featured Image is required",
              })}
              className="my-3"
            />
            {errors?.image && (
              <p className=" absolute mb-4 -bottom-5 left-0 text-sm text-red-600">
                *{errors?.image?.message}
              </p>
            )}
          </div>
          <Input
            label="Tags"
            placeholder="Tags (comma separated)"
            inputError={errors?.tags?.message}
            {...register("tags", { required: "Atleast one tag is required" })}
          />
          <div className="my-7 dark:text-light-text">
            <label htmlFor="select" className="dark:text-white font-semibold inline-block mb-2">Select a status</label>
            <select
              {...register("status")}
              className="inline-block w-full outline-none appearance-none border dark:border-slate-700 border-accent rounded p-2"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className=" relative mt-4 ">
          <Controller
          name="content"
          control={control}
          rules={{ required: 'Content is required' }}
          render={({ field: { onChange, value } }) => (
            <ContentEditor value={value} onChange={onChange} />
          )}
        />
            {errors?.content && (
              <p className=" absolute -bottom-5 left-0 text-sm text-red-600">
                *{errors?.content?.message}
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
