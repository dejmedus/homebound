import { Form, Navigate } from "react-router-dom";
import Userfront from "@userfront/react";

const UpdateUser = () => {
  return (
    <div className="mt-5 md:col-span-2 md:mt-0">
    <Form method="post">
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
              About
            </label>
            <p className="mt-2 text-sm text-gray-500">
              Tell potential drivers and passengers about you! What's your go-to roadtrip anthem?
            </p>
            <div className="mt-1">
              <textarea
                id="about"
                name="about"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                placeholder="you@example.com"
                defaultValue={''}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <div className="mt-1 flex items-center">
              <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <button
                type="button"
                className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
              >
                Change
              </button>
            </div>
          </div>
        </div> 
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-neutral-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </Form>
  </div>
  )
}

export default UpdateUser 

export async function action({ request }) {
  let formData = await request.formData();
  let username = formData.get("username");
  let about = formData.get('about')
  try{
    Userfront.user.update({
      username: username,
      data: {
        about: about,
      },
    });
  }
  catch (err){
    throw err
  }
  return (
    <Navigate
      to={{
        pathname: "/",
      }}
    />
  );
}