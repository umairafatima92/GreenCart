const NewsLetter = () => {
  return (
    <div className="flex justify-center mt-10 mb-0">
      <div className="flex flex-col items-center text-gray-900/60 rounded-xl max-w-lg w-11/12 md:w-full md:py-8 py-6 pb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-black mb-6">
          Never Miss a Deal!
        </h1>

        <p className="text-sm text-slate-900/60 mt-1 md:w-80 w-72 text-center">
          Subscribe to get latest offers, new arrivals, and exclusive discounts
        </p>

        <div className="flex items-center mt-5 w-full md:px-16 px-6">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="text-sm border-r-0 outline-none border border-gray-500/50 pl-3 w-full h-10 rounded-l-md"
          />
          <button
            type="button"
            className="font-medium text-sm text-white bg-[#24a47c] hover:bg-[#1e8c69] w-36 h-10 rounded-r-md"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
