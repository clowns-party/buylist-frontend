const Activity = () => {
  return (
    <>
      <div className="items-center py-1 mt-5 text-sm font-medium text-gray-800">
        Activity
      </div>
      <div className="flex p-2 rounded">
        <div className="flex">
          <div className="text-sm ml-1 py-1 text-gray-800 antialiased tracking-normal font-normal ">
            Show :
          </div>
          <div className="text-sm ml-2 py-1 cursor-pointer rounded px-2 text-white bg-gray-700 antialiased tracking-normal font-normal ">
            Comments
          </div>
          <div className="text-sm ml-2 py-1 cursor-pointer rounded px-2 text-gray-800 bg-gray-200 antialiased tracking-normal font-normal ">
            Products
          </div>
        </div>
      </div>
    </>
  );
};

export default Activity;
