fetch("http://localhost:3000/api/v1/books")
  .then((res) => res.json())
  .then((data) => {
    let x = data.result;
    // console.log(x[0].id)
    if (data.status === "success") {
      for (let i = 0; i < x.length; i++) {
        document.querySelectorAll(".allBooks1").innerHTML = x[i].id;
        document.querySelectorAll(".allBooks2").innerHTML = x[i].title;
        document.querySelectorAll(".allBooks3").innerHTML = x[i].isbn;
        document.querySelectorAll(".allBooks4").innerHTML = x[i].publishDate;
        document.querySelectorAll(".allBooks5").innerHTML = x[i].author;
      }
    } else {
      document.querySelector(".allBooks").innerHTML = "null";
    }
  });
