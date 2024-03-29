import React from "react";
import NavModal from "../../UI/NavModal";
import BlogForm from "../../components/BlogForm";
import {
  Link,
  useRouteLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getSingleBlog, queryClient, updateBlog } from "../../utils/http";
import Loader from "../../UI/Loader";
import ErrorBlock from "../../components/ErrorBlock";

const EditBlog = () => {
  const { id } = useParams();
  const token = useRouteLoaderData("root");
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["blogs", { id }],
    queryFn: ({ signal }) => getSingleBlog({ id, signal }),
  });

  const {
    mutate,
    isPending: updateIsPending,
    isError: updateIsError,
    error: updateError,
  } = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs", { id }],
      });
      navigate(`/blogs/${id}`);
    },
  });

  const handleSubmitData = (formData) => {
    mutate({ postId: id, postData: formData, token: token });
  };

  let content;

  if (isPending) {
    content = <Loader />;
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load blog!"
          message={error?.message || "Can't load blog"}
        />
        <Link className="font-semibold text-blue-900" to="..">
          Okay
        </Link>
      </>
    );
  }

  if (data) {
    content = (
      <BlogForm onSubmit={handleSubmitData} inputData={data}>
        {updateIsPending ? (
          <p className="font-semibold text-blue-900">Updating...</p>
        ) : (
          <>
            <Link to="../">Cancel</Link>
            <button className="mx-auto inline-block transform rounded-lg bg-blue-700 px-6 py-3 text-white shadow-lg transition duration-300 hover:scale-105">
              Update
            </button>
          </>
        )}
      </BlogForm>
    );
  }

  return (
    <>
      <NavModal className="grid min-w-[30vw] place-items-center bg-blue-100">
        {content}

        {updateIsError && (
          <ErrorBlock
            title="Failed to update blog!"
            message={updateError.message || "Can't update blog"}
          />
        )}
      </NavModal>
      <div className="h-[80vh]"></div>
    </>
  );
};

export default EditBlog;
