import React from "react";
import Input from "../UI/Input";

const BlogForm = ({ children, inputData, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-9 grid w-11/12 place-items-center"
    >
      <Input
        label="Blog Title"
        id="title"
        defaultValue={inputData?.title || ""}
        type="text"
      />
      <Input
        label="Blog Image"
        id="image"
        defaultValue={inputData?.image || ""}
        type="text"
      />

      <Input
        label="Blog Description"
        defaultValue={inputData?.description || ""}
        id="description"
        type="text"
      />

      <Input
        label="Blog Date"
        id="date"
        defaultValue={inputData?.date || ""}
        type="date"
      />
      <div className="relative left-16 flex items-center  gap-10">
        {children}
      </div>
    </form>
  );
};

export default BlogForm;
