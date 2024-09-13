import { useState } from "react";

const file1 = { id: crypto.randomUUID(), name: "File1", type: "file" };
const file2 = { id: crypto.randomUUID(), name: "File2", type: "file" };
const file3 = { id: crypto.randomUUID(), name: "File3", type: "file" };

const folder4 = {
  id: crypto.randomUUID(),
  name: "Folder4",
  children: [],
  type: "folder",
};
const folder3 = {
  id: crypto.randomUUID(),
  name: "Folder3",
  children: [file1],
  type: "folder",
};
const folder2 = {
  id: crypto.randomUUID(),
  name: "Folder2",
  children: [file1, file2, folder3, folder4],
  type: "folder",
};
const folder1 = {
  id: crypto.randomUUID(),
  name: "Folder1",
  children: [folder2, file1, file3],
  type: "folder",
};

const rootFolder = {
  id: crypto.randomUUID(),
  name: "rootFolder",
  children: [folder1, folder2, folder3, folder4],
  type: "folder",
};
// console.log(rootFolder, "root*folder");
function Folder() {
  const [rootObj, setRootObj] = useState(rootFolder);
  console.log(rootObj, "rootOb*");

  function recursiveAdd(root, fId, fName, fType) {
    if (root.type === "file") return root;

    if (root.id === fId) {
      console.log(root, " rootbro");
      let newR = { ...root };
      let newC = [...newR.children];
      const newObj = {
        id: crypto.randomUUID(),
        name: fName.slice(0, fName.indexOf(".")),
        children: [],
        type: fType,
      };
      newC.push(newObj);
      newR.children = newC;
      return newR;
    }
    if (root.children.length === 0) return root;
    const rootC = [...root.children];
    let newRootC = [];
    rootC.forEach((item, index) => {
      let updatedFileSys = recursiveAdd(item, fId, fName, fType);
      console.log(root, "root", item, index, updatedFileSys, "upda");
      newRootC.push(updatedFileSys);
    });
    root.children = newRootC;
    return root;
  }
  function addToFile(id, name, fType) {
    const rootObj2 = structuredClone(rootObj);
    const newRootObj = recursiveAdd(rootObj2, id, name, fType);
    console.log(newRootObj, "id******", rootObj);
    setRootObj(newRootObj);
  }
  function getFileSystem() {
    console.log(rootObj, "rootObj");
    return rootObj.children.map((item) => {
      console.log(item.type, "type");
      if (item.type === "folder")
        return (
          <FolderEl
            {...item}
            key={item.id}
            marginVal={10}
            addToFile={addToFile}
          />
        );
      return <FileEl {...item} key={item.id} marginVal={10} />;
    });
  }
  console.log("yooo");
  return (
    <div>
      {
        <div>
          {rootFolder.name}

          {getFileSystem()}
        </div>
      }
    </div>
  );
}

export default Folder;
function FolderEl({ id, name, children, marginVal, addToFile }) {
  console.log(children, "newC", name);
  const [showChild, setShowChild] = useState(false);
  const [add, setAdd] = useState(false);
  const [newFname, setNewFname] = useState("");

  function getFolders() {
    if (!children.length) return null;
    return children.map((item) => {
      if (item.type === "file")
        return <FileEl {...item} key={item.id} marginVal={marginVal + 15} />;
      return (
        <FolderEl
          key={item.id}
          {...item}
          marginVal={marginVal + 15}
          addToFile={addToFile}
        />
      );
    });
  }
  function addNew() {
    const type = newFname.slice(newFname.indexOf(".") + 1);
    console.log(type);
    if (type === "file" || type === "folder") {
      setAdd(false);
      addToFile(id, newFname, type);
    } else {
      alert("Enter valid filename");
    }
  }
  return (
    <div style={{ marginLeft: marginVal }}>
      <span> {name}</span>
      <button
        onClick={(e) => {
          setAdd(true);
        }}
      >
        +
      </button>
      {children.length > 0 && (
        <button
          onClick={(e) => {
            setShowChild((child) => !child);
          }}
        >
          {">"}
        </button>
      )}

      {showChild && getFolders()}
      {add && (
        <>
          <label htmlFor="fname">Enter New File/Folder</label>
          <input
            type="text"
            name="fname"
            id="fname"
            onChange={(e) => {
              setNewFname(e.target.value);
            }}
            value={newFname}
            // onBlur={(e) => {
            //   addNew();
            // }}
          />
          <button
            type="button"
            onClick={(e) => {
              addNew();
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={(e) => {
              setAdd(false);
            }}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

function FileEl({ id, name, marginVal }) {
  console.log("broo");
  return <div style={{ marginLeft: marginVal }}>{name}</div>;
}
