// API to access the bookSearch server (mongodb)

const sampleBooks = [

  {
    authors: ["Suzanne Collins"],
    description: "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
    image: "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    link: "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
    title: "The Hunger Games"
  },
  {
    authors: ["Me"],
    description: "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
    image: "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    link: "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
    title: "Not the Hunger Games"
  }
];

export default {
  getAllBooks: ()  => {
    return new Promise( (resolve, reject) => {
      console.log("getAllBooks");
      $.ajax({
        url: `/api`,
        method: "GET"
      })
      .done(function (body) {
        console.log(body);
        resolve(body);
      })
      .fail((xhr) => {
        console.log("AJAX GET failed with error code " + xhr.status);
        reject();
      });
    });
  },
  deleteOneBook(bookId) {
    return new Promise( (resolve, reject) => {
      resolve(sampleBooks);
    });
  },
  saveOneBook(book) {
    return new Promise((resolve, reject) => {
      console.log("saveOneBook");
      console.log(book);
      $.ajax({
        url: `/api`,
        method: "POST",
        data: JSON.stringify(book),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      })
        .done(function (body, textStatus, xhdr) {
          if (body.postSuccessful) {
            console.log("Posted successfully");
            resolve();
          } else {
            console.log("Could not save in database  http error ", xhr.status);
            reject();
          }
          
        })
        .fail((xhr) => {
          console.log("AJAX POST failed with error code " + xhr.status);
          reject();
        });
    });
  }
}