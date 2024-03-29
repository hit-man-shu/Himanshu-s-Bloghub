import React from "react";
import BlogForm from "../../components/BlogForm";
import NavModal from "../../UI/NavModal";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postBlog, queryClient } from "../../utils/http";
import ErrorBlock from "../../components/ErrorBlock";

const NewBlog = () => {
  const token = useRouteLoaderData("root");
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
      navigate("/blogs");
    },
  });

  const handleSubnit = (formData) => {
    mutate({
      postData: { ...formData, username: token.username },
      token: token.token,
    });
  };

  return (
    <>
      <NavModal className="grid min-w-[30vw] place-items-center bg-blue-100">
        <BlogForm onSubmit={handleSubnit}>
          {isPending ? (
            <p className="font-semibold text-blue-900">Submitting...</p>
          ) : (
            <>
              <Link to="../">Cancel</Link>

              <button className="mx-auto inline-block transform rounded-lg bg-blue-700 px-6 py-3 text-white shadow-lg transition duration-300 hover:scale-105">
                Create
              </button>
            </>
          )}
        </BlogForm>

        {isError && (
          <ErrorBlock
            title="Failed to create blog!"
            message={error.message || "Can't create blog"}
          />
        )}
      </NavModal>

      <div className="h-[80vh]"></div>
    </>
  );
};

export default NewBlog;
