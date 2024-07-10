import React, { useState } from "react";
import BookInfo from "./BookInfo";
import BookReserve from "./BookReserve";
import BookTutors from "./BookTutors";
import BookTutorials from "./BookTutorials";

const BookTutoring = () => {

const[reloadSubjects, setReloadSubjects] = useState(false);

const changingReload =()=>{
setReloadSubjects(true);
}

const updateReload = () =>{
setReloadSubjects(false);
}

  return (
    <>
      <BookInfo />
      <BookTutorials sendingReload={reloadSubjects} updateReload={updateReload} />
      <BookReserve sendingReload={changingReload} />
      <BookTutors />
    </>
  );
};

export default BookTutoring;
