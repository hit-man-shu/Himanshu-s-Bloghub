import React, { useState } from "react";
import {
  Link,
  useParams,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { deleteBlog, getSingleBlog, queryClient } from "../../utils/http";
import { useQuery, useMutation } from "@tanstack/react-query";
import Loader from "../../UI/Loader";
import NavModal from "../../UI/NavModal";
import ErrorBlock from "../../components/ErrorBlock";

const BlogDetails = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();
  const token = useRouteLoaderData("root");
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["blogs", { id }],
    queryFn: ({ signal }) => getSingleBlog({ id, signal }),
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDelete,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
        refetchType: "none",
      });
      navigate("/blogs");
    },
  });

  const handleDelete = () => {
    mutate({ postId: id, token: token });
  };

  const handleStartDelete = () => {
    setIsDeleting(true);
  };
  const handleStopDelete = () => {
    setIsDeleting(false);
  };

  let content;

  if (isPending) {
    content = <Loader />;
  }

  if (isError) {
    content = (
      <div className="my-32 flex flex-col items-center justify-center text-rose-900">
        <h1 className="text-xl font-bold">Failed to load blog!</h1>
        <p>{error.message || "Couldn't load blog."}</p>
      </div>
    );
  }

  if (data) {
    const formatteDate = new Date(data.date).toLocaleDateString("en-IN", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    content = (
      <>
        <div className="relative flex flex-col items-center justify-between gap-8 rounded-xl border p-6 lg:flex-row">
          <img
            src={data.image}
            alt={data.title}
            className="w-full rounded-xl object-cover  md:h-96 md:w-auto"
          />
          <div className="mb-6 flex w-full flex-col">
            {token && token.username === data.author && (
              <div className="flex justify-center gap-4 py-8 md:justify-end">
                <Link to="edit">
                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-green-600">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={handleStartDelete}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white transition duration-300 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
            <h1 className="text-2xl font-bold text-gray-800">{data.title}</h1>
            <div className="mt-8 text-gray-700">
              <p className="mb-4">{data.description}</p>
            </div>

            <div className="mt-12 flex flex-col items-center justify-between gap-3 md:items-end">
              <h1>{data.author}</h1>
              <p>{formatteDate}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting && (
        <NavModal onClose={handleStopDelete} className="bg-blue-100 py-8">
          <h1 className="my-4 py-3 text-2xl font-bold text-blue-900">
            Are you sure?
          </h1>
          <p className="py-4">
            Do you really want to delete this blog? This action cannot be
            undone.
          </p>
          <div className="flex items-center justify-end gap-4 font-semibold text-blue-900">
            {isPendingDeletion ? (
              <p> "Deleting, please wait..!"</p>
            ) : (
              <>
                <button onClick={handleStopDelete}>Cancel</button>
                <button
                  onClick={handleDelete}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-red-600"
                >
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDelete && (
            <ErrorBlock
              title="Failed to delete blog!"
              message={deleteError.message || "Can't delete blog"}
            />
          )}
        </NavModal>
      )}

      <div className="container mx-auto my-10 min-h-[65vh] rounded-md bg-white py-8">
        <div className="mx-auto w-full px-8">{content}</div>
      </div>
    </>
  );
};

export default BlogDetails;

// export const loader = ({ request, params }) => {
//   const id = params.id;
//   return queryClient.fetchQuery({
//     queryKey: ["blogs", { id }],
//     queryFn: ({ signal }) => getSingleBlog({ id, signal }),
//   });
// };
