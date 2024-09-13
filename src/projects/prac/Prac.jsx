import { createContext, useContext, useState } from "react";

export const PracContext = createContext();
function Parent() {
  const [val, setVal] = useState(0);
  console.log(val, " valchange");
  return (
    <PracContext.Provider value={{ val: val, setVal: setVal }}>
      <Child />
    </PracContext.Provider>
  );
}

function Child() {
  return (
    <div>
      <GChild />
    </div>
  );
}
function GChild() {
  const obj = useContext(PracContext);
  console.log(obj, "obj");
  return <div>hello2</div>;
}

function Prac() {
  return (
    <div>
      <Parent />
    </div>
  );
}

export default Prac;
