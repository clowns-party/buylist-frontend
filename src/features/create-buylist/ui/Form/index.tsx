import { useRouter } from "next/router";
import { Routes } from "shared/routes";
import { Button, Input } from "shared/ui";

const CreateBuylist = () => {
  const router = useRouter();

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-5">
            <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
              i
            </div>
            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
              <h2 className="leading-relaxed">Create an Buylist</h2>
              <p
                className="text-sm text-gray-500 font-normal leading-relaxed w-50"
                style={{ width: 230 }}
              >
                Create your buylist that you want to schedule alone or together.
              </p>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="flex flex-col">
                <label className="leading-loose">Title</label>
                <Input type="text" placeholder="buylist name" name="name" />
              </div>

              <div className="flex items-center space-x-4 justify-between">
                <div className="flex flex-col">
                  <label className="leading-loose">Description</label>
                  <Input
                    type="text"
                    placeholder="Optional"
                    name="description"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Total price</label>
                  <div className="relative focus-within:text-gray-600 text-gray-400">
                    <Input
                      type="text"
                      className="pr-4 pl-10"
                      placeholder="Optional"
                      name="totalPrice"
                    />
                    <div className="absolute left-3 top-2">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 flex items-center space-x-4">
              <Button
                onClick={() => router.push(Routes.profile)}
                variant="text"
                className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none bg-transparent"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>{" "}
                Cancel
              </Button>
              <Button className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBuylist;
