"use client";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const SearchFromReset = () => {
  const reset = () => {
    //Access to the form by class name search-form  and reset it
    //This is a workaround for the form reset issue in Next.js
    //Next.js does not support form reset in the same way as regular HTML forms
    //So we need to access the form element directly and reset it
    //This is not the best practice but it works for now
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset();
  };

  return (
    <button type="reset" onClick={reset}>
      <Link href="/" className="search-btn text-white">
        <X className="size-5" />
      </Link>
    </button>
  );
};

export default SearchFromReset;
