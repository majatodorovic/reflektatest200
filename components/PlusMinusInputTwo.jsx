const PlusMinusInputTwo = ({ className, amount, setCount }) => {
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
    <div className="ring-slate-500 ring-[1px] text-black rounded-lg">
      <div className="rounded-lg flex items-center flex-row bg-slate-100">
        <button onClick={onMinusHandler} className="ml-1">
          -
        </button>
        <input
          maxLength="2"
          value={amount}
          onChange={onInputChange}
          className="w-20 h-7 border-[2px] rounded-lg border-slate-100 bg-slate-100 text-center"
        ></input>
        <button onClick={onPlusHandler} className="mr-1">
          +
        </button>
      </div>
    </div>
  );
};

export default PlusMinusInputTwo;
