export const StackLoading = () => {
  return (
    <div className="flex justify-center items-center p-10">
      <p className="flex justify-center items-center font-bold text-xl p-4 rounded-full w-24 h-24 border-4 border-green-500 border-b-0 animate-spin">
        StackUp
      </p>
    </div>
  );
};

export const Loading = () => {
  return (
    <span className="border-white w-6 h-6 border-2 rounded-full animate-spin border-b-0"></span>
  );
};
