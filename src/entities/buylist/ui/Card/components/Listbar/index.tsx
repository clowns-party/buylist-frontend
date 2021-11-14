const ListBar = () => {
  return (
    <div className=" ml-10 h-full" style={{ width: 400 }}>
      <div className="text-2xl mt-3 text-black font-semibold antialiased tracking-normal">
        All Buylists
      </div>
      <div className="flex mt-5 w-full">
        <input
          type="text"
          className="w-1/2 h-7 px-2 text-gray-500 border rounded text-xs"
          placeholder="Filter Buylist ..."
        />
      </div>
      <div className="bg-gray-100 mt-4 rounded">
        <div className="flex  justify-between px-1 text-center items-center">
          <div className="flex px-3 py-1 self-center text-sm font-medium text-gray-800 antialiased rounded-md focus:outline-none hover:bg-blue-100 text-blue-500 focus:bg-blue-100">
            <a href="#" className="">
              Priority
            </a>
            <svg
              className="h-4 w-4 mt-1 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 01-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z"
              />
            </svg>
          </div>
          <div className="p-2">
            <button className="flex rounded px-4 py-2 focus:outline-none text-gray-500 hover:bg-blue-100 justify-around">
              <svg
                className="h-3 w-3 "
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path
                  fillRule="evenodd"
                  d="M441.156 322.876L392.49 275.49a8.523 8.523 0 00-11.93.017l-81.894 80.299V8.533A8.536 8.536 0 00290.133 0h-68.267a8.536 8.536 0 00-8.533 8.533v347.273l-81.894-80.299a8.528 8.528 0 00-11.921-.017l-48.666 47.386a8.503 8.503 0 00-2.586 6.11c0 2.304.939 4.506 2.586 6.11l179.2 174.481A8.508 8.508 0 00256 512c2.15 0 4.292-.811 5.956-2.423l179.2-174.481a8.526 8.526 0 002.577-6.11c0-2.304-.93-4.506-2.577-6.11z"
                />
              </svg>
            </button>
          </div>
        </div>

        <ListBar.Item />
        <ListBar.Item />
        <ListBar.Item />
      </div>
    </div>
  );
};

ListBar.Item = () => {
  return (
    <div className="mx-2 bg-white rounded">
      <div className="overflow-auto flex-col" style={{ height: "auto" }}>
        <div className="flex-col cursor-pointer bg-blue-100">
          <div className="py-3 px-3 cursor-pointer text-gray-700 rounded text-sm font-normal antialiased tracking-normal">
            Project & Company Slug
          </div>
          <div className="flex px-3 justify-between">
            <div className="flex">
              <div className="bg-red-500 rounded h-4 w-4 p-1">
                <svg
                  className="h-2 w-2 text-white"
                  fill="currentColor "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a7 7 0 10.001 13.999A7 7 0 0010 3z"
                  />
                </svg>
              </div>
              <div className="font-bold line-through text-gray-500 ml-1 text-xs">
                NITSWEBAPP-02
              </div>
            </div>
            <button className="flex rounded-full p-1 pb-1 h-6 w-6 bg-orange-500 justify-around">
              <span className="text-xs font-bold">AS</span>
            </button>
          </div>
          <div className="border mt-3"></div>
        </div>
      </div>
    </div>
  );
};

export default ListBar;
