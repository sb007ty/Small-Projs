import { useMemo, useState, useRef, useEffect } from "react";
import "./pagination.css";
function PaginationComponent() {
  const [pages, setPages] = useState(0);
  const pageRef = useRef(0);
  const [activePage, setActivePage] = useState(1);
  const activePageRef = useRef(0);
  //   const pages = +prompt("Enter pages");
  //   console.log(pages, "pages");
  return (
    <div>
      <label htmlFor="page-input">Enter Pages</label>
      <input
        type="text"
        onChange={(e) => {
          pageRef.current = +e.target.value;
          console.log(pageRef.current);
        }}
        onBlur={() => {
          setPages(pageRef.current);
          setActivePage(1);
        }}
        id="page-input"
      />
      {/* <label htmlFor="act-page-input">Enter Act Page</label>
      <input
        type="text"
        onChange={(e) => {
          activePageRef.current = +e.target.value;
          console.log(activePageRef.current);
        }}
        onBlur={() => {
          setActivePage(activePageRef.current);
        }}
        id="act-page-input"
      /> */}
      {pages !== 0 && (
        <Pagination
          pages={pages}
          slots={7}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </div>
  );
}

export default PaginationComponent;

function Pagination({ pages, activePage, setActivePage }) {
  console.log(activePage, "activepage", pages);
  const getSpan = (el, index) => {
    if (el === "...")
      return (
        <span key={el + index} className="page">
          {el}
        </span>
      );
    if (el == activePage)
      return (
        <span key={el} className="page active">
          {el}
        </span>
      );
    return (
      <span key={el} className="page">
        {el}
      </span>
    );
  };
  const displayArr = useMemo(() => {
    // console.log(activePage, "ac", pages);
    const dispArr = [];

    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) {
        dispArr.push(i);
      }
      //   console.log("*************", dispArr.length);
    } else if (activePage <= pages && activePage >= pages - 3) {
      dispArr.push(1);
      dispArr.push("...");
      dispArr.push(pages - 4);
      dispArr.push(pages - 3);
      dispArr.push(pages - 2);
      dispArr.push(pages - 1);
      dispArr.push(pages);
    } else if (activePage >= 1 && activePage <= 4) {
      dispArr.push(1);
      dispArr.push(2);
      dispArr.push(3);
      dispArr.push(4);
      dispArr.push(5);
      dispArr.push("...");
      dispArr.push(pages);
    } else {
      dispArr.push(1);
      dispArr.push("...");
      dispArr.push(activePage - 1);
      dispArr.push(activePage);
      dispArr.push(activePage + 1);
      dispArr.push("...");
      dispArr.push(pages);
    }
    return dispArr;
  }, [pages, activePage]);

  function clickPage(e) {
    if (e.target.className === "page") {
      //   console.log("bro", e.target.textContent);
      //   e.target.
      if (!isNaN(e.target.textContent)) setActivePage(+e.target.textContent);
    }
    if (e.target.className === "arrow") {
      if (e.target.textContent === ">")
        if (activePage < pages) setActivePage((activePage) => activePage + 1);
      if (e.target.textContent === "<")
        if (activePage > 1) setActivePage((activePage) => activePage - 1);
    }
  }
  console.log(displayArr, "dis");
  return (
    <>
      <div className="pagination" onClick={clickPage}>
        <span className="arrow">{"<"}</span>
        <div className="page-parent">
          {displayArr.map((item, index) => getSpan(item, index))}
        </div>
        <span className="arrow">{">"}</span>
      </div>
    </>
  );
}
