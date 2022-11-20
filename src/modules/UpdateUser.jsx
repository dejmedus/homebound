import { Form, Link, redirect } from "react-router-dom";
import Userfront from "@userfront/react";

const UpdateUser = () => {

  return (
    <div className="mt-5 flex justify-center dark:text-zinc-900">
      <Form method="post">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            <h3 className="block text-md font-medium text-zinc-900 underline bold" >Private</h3>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
                  Full Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={Userfront.user.name}
                    className="block w-full flex-1  rounded border-zinc-300 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <h3 className="block text-md font-medium text-zinc-900 underline bold">Public</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="username" className="block text-sm font-medium text-zinc-700">
                  Username
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    defaultValue={Userfront.user.username}
                    className="block w-full flex-1 rounded border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="about" className="block text-sm font-medium text-zinc-700">
                About
              </label>
              <p className="mt-2 text-sm text-zinc-500">
                Tell potential drivers and passengers about yourself. What's your go-to road trip anthem?
              </p>
              <div className="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm max-w-4xl focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm"
                  defaultValue={Userfront.user.data['about']}
                />
              </div>
            </div>
            <Link to='/reset'><p className="block text-md font-medium text-sky-800 hover:underline mt-8">Reset password</p></Link>

            {/* <div>
              <label className="block text-sm font-medium text-zinc-700">Photo</label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-zinc-100">
                  <svg className="h-full w-full text-zinc-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button
                  type="button"
                  className="ml-5 rounded-md border border-zinc-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-zinc-700 shadow-sm hover:bg-zinc-50"
                >
                  Change
                </button>
              </div>
            </div> */}
          </div>
          <div className="bg-zinc-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700"
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
  let name = formData.get('name');
  let username = formData.get("username");
  let about = formData.get('about');
  try {
    Userfront.user.update({
      name: name,
      username: username.replace(' ', ''),
      data: {
        about: about,
        trips: Userfront.user.data['trips']
      },
    });
    return redirect("/")
  }
  catch (err) {
    throw err
  }
}