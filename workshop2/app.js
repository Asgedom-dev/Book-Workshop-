fetch("http://localhost:3000/api/v1/books")
  .then((res) => res.json())
  .then((data) => {
    let x = data.result;
    // console.log(x[1].id)
    if (data.status === "success") {
      for (let i = 0; i < x.length; i++) {
        document.querySelector(".allBooks1").innerHTML=x[i].id;
        document.querySelector(".allBooks2").innerHTML = x[i].title;
        document.querySelector(".allBooks3").innerHTML = x[i].isbn;
        document.querySelector(".allBooks4").innerHTML = x[i].publishDate;
        document.querySelector(".allBooks5").innerHTML = x[i].author;
      }
    } else {
      document.querySelector(".allBooks").innerHTML = "null";
    }
  });

  document.querySelector("#button").addEventListener('click',()=>{
      const book = {};
      book.id = document.querySelector("#bookid").value
      book.title = document.querySelector("#title").value
      book.isbn = document.querySelector("#isbn").value
      book.publishDate = document.querySelector("#publishDate").value
      book.author = document.querySelector("#author").value
console.log(book)
      fetch('http://localhost:3000/api/v1/books',{
          headers:{
              'Content-Type' : 'Application/json'
          },
          method: 'POST',
          body:JSON.stringify(book)
      })
      .then(res=>res.json())
      .then(data=>{
          console.log(data)
      })
  })
