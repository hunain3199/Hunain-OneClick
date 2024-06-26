"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div className="bg-gray-100 py-20 flex justify-center">
        <form
          className="bg-white w-[400px] mx-[30px] rounded-md shadow-md px-6 py-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl font-bold text-[#c30404] mb-2">
            Doctor Sign Up
          </h2>{" "}
          <div className="sm:flex sm:justify-between sm:gap-4">
            <div className="w-full">
              <div className="flex flex-col items-start gap-2 ">
                <div className="w-full">
                  <label htmlFor="email" className="mb-2">
                    Email
                  </label>
                  {errors.email && (
                    <p className="bg-red-300 p-2 rounded-md">
                      Email is required
                    </p>
                  )}
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    id="email"
                    placeholder="default@gmail.com"
                    className="bg-transparent mt-1 mb-8 outline-none border border-gray-300 focus:border-[#c30404] focus:outline-none focus:shadow-md px-4 py-2 w-full rounded-md"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="username" className="mb-2">
                    User Name
                  </label>
                  {errors.username && (
                    <p className="bg-red-300 p-2 rounded-md">
                      Username is required
                    </p>
                  )}
                  <input
                    {...register("username", { required: true })}
                    type="text"
                    id="username"
                    placeholder="default123"
                    className="bg-transparent mt-1 mb-8 outline-none border border-gray-300 focus:border-[#c30404] focus:outline-none focus:shadow-md px-4 py-2 w-full rounded-md"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="password" className="mb-2">
                    Password
                  </label>
                  {errors.password && (
                    <p className="bg-red-300 p-2 rounded-md">
                      Password is required
                    </p>
                  )}
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    id="password"
                    placeholder="******"
                    className="bg-transparent mt-1 mb-8 outline-none border border-gray-300 focus:border-[#c30404] focus:outline-none focus:shadow-md px-4 py-2 w-full rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-[90%] border text-[#c30404] border-[#c30404] rounded-full py-1 hover:bg-[#c30404] hover:text-white transition-all ease-in-out duration-300 hover:shadow-md font-semibold"
                >
                  Sign Up
                </button>
              </div>

              <div className="flex justify-center mt-4">
                <p className="text-sm text-gray-500 font-medium">
                  Already Have An Account?{" "}
                  <Link href="/doctor/login" className="text-[#c30304]">
                    Login In Here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
