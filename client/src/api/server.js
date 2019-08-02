// API to access the bookSearch server (mongodb)
import axios from "axios";

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

// axios notes
// by default, axios sends data in json format
export default {
  getAllBooks: ()  => {
    return new Promise( (resolve, reject) => {
      // console.log("getAllBooks");
      axios.get("/api")
      .then(function (response) {
        if (response.data) {
          console.log("GET returned " + response.data.length + " books");
          resolve(response.data);
        }
        else {
          // successful request but no data returned
          // not sure that this can happen
          console.log("GET failed - request succeeded but no data returned");
          // return something to print out as an error
          reject(response.headers);
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("GET failed with http error code " + error.response.status);
        } 
        else {
          // The request was made but no response was received
          console.log("GET timed out, nothing received");
        }
        reject(error);
      });
    });
  },
  deleteOneBook(bookId) {
    return new Promise( (resolve, reject) => {
      // console.log("deleteOneBook id=" + bookId);
      axios.delete("/api", {
        data: {
          deleteId: bookId
        }
      })
        .then(function (response) {
          if (response.data.deleteSuccessful) {
            // console.log("DELETE success (" + response.status + ")");
            resolve(response.data.books);
          } else {
            // console.log("DELETE success but could not save in database: http code ", response.status);
            reject(response);
          }

        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("DELETE failed with error code " + error.response.status);
            console.log(error.response.data)
          }
          else {
            // The request was made but no response was received
            console.log("DELETE timed out, nothing received");
          }
          reject(error);
        });
      resolve(sampleBooks);
    });
  },
  saveOneBook(book) {
    return new Promise((resolve, reject) => {
      // console.log("saveOneBook");
      axios.post("/api", book)
      .then(function (response) {
        if (response.data.postSuccessful) {
          console.log("POST success (" + response.status +")");
          resolve(response.data.books);
        } else {
          console.log("POST success but could not save in database: http code ", response.status);
          reject(response);
        }
        
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("POST failed with error code " + error.response.status);
        }
        else {
          // The request was made but no response was received
          console.log("POST timed out, nothing received");
        }
        reject(error);
      });
    });
  }
}