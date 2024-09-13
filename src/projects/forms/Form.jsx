import { useState } from "react";
function Form() {
  const [def, setDef] = useState("abc");
  const [check, setCheck] = useState(true);
  const [games, setGames] = useState(["tennis", "cricket"]);
  const [dateVal, setDateVal] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    // Prevent the browser from reloading the page
    setDef("def");
    return;
  }
  console.log(def);
  return (
    <form method="post" onSubmit={handleSubmit}>
      <label>
        Select games
        <select
          name="games"
          id="games"
          multiple={true}
          value={games}
          // size={2}
          onChange={(e) => {
            console.log("change", e.target.selectedOptions);
            // console.log();
            const optionList = [...e.target.selectedOptions];
            let newGames = optionList.map((item) => item.value);
            console.log(newGames);
            setGames(newGames);
          }}
        >
          <optgroup>
            <option value="cricket">Cricket</option>
            <option value="chess">Chess</option>
            <option value="tennis">Tennis</option>
          </optgroup>
        </select>
      </label>
      <label htmlFor="">
        <textarea name="comment" id="" cols="30" rows="2" />
      </label>

      <button type="submit">Submit form</button>
      <label>
        Male
        <input
          type="radio"
          name="gender"
          id=""
          value={"male"}
          checked={check === "male"}
          onChange={(e) => {
            setCheck(e.target.value);
          }}
        />
      </label>
      <label>
        Female
        <input
          type="radio"
          name="gender"
          id=""
          value={"female"}
          checked={check === "female"}
          onChange={(e) => {
            setCheck(e.target.value);
          }}
        />
      </label>
      <div>{dateVal}</div>
      <label htmlFor="">
        Date-Time
        <input
          type="datetime-local"
          name="date"
          id=""
          value={dateVal}
          onChange={(e) => {
            setDateVal(e.target.value);
          }}
        />
      </label>
    </form>
  );
}

export default Form;
