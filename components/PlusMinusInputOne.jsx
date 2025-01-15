const PlusMinusInputOne = ({ className, amount, setCount }) => {
  // If minus is clicked
  const onMinusHandler = (e) => {
    e.preventDefault();
    if (amount !== 1) setCount((prev) => prev - 1);
    if (amount === "") setCount(1);
  };

  // If plus is clicked
  const onPlusHandler = (e) => {
    e.preventDefault();
    if (amount === "") setCount(1);
    else setCount((prev) => prev + 1);
  };

  // If value is typed in
  const onInputChange = (e) => {
    if (!isNaN(e.target.value)) {
      if (+e.target.value < 1) setCount("");
      else setCount(+e.target.value);
    }
  };

  return (
    <div className="">
      <div className="relative">
        <input
          maxLength="2"
          type="number"
          value={amount}
          onChange={onInputChange}
          className="w-20  bg-croonus-3 text-white text-center border-none"
        ></input>
        <div className="absolute top-[23%] right-[0.45rem] flex flex-col justify-between h-full">
            <button
                onClick={onPlusHandler}
                className="w-full h-1/2 text-white border-none"
            >
                +
            </button>
        </div>
        <div className="absolute top-[23%] left-[0.45rem] flex flex-col justify-between h-full">
            <button
                onClick={onMinusHandler}
                className="w-full h-1/2 text-white border-none"
            >
                -
            </button>
        </div>
      </div>
    </div>
  );
};

export default PlusMinusInputOne;
