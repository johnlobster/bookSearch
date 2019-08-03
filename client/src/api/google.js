// GET https://www.googleapis.com/books/v1/volumes?q=Call+of+the+wild&key={YOUR_API_KEY}
// GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
// intitle: Returns results where the text following this keyword is found in the title.
//   inauthor: Returns results where the text following this keyword is found in the author.
//     inpublisher: Returns results where the text following this keyword is found in the publisher.
//       subject: Returns results where the text following this keyword is listed in the category list of the volume.
//         isbn: Returns results where the text following this keyword is the ISBN number.
//           lccn: Returns results where the text following this keyword is the Library of Congress Control Number.
//             oclc: Returns results where the text following this keyword is the Online Computer Library Center number.

// Google project book-search-248603

import axios from "axios";

const GOOGLE_BOOKS_API = "AIzaSyB_5CTWSHfCqh-m985JHvDtLcnoWFsDt1M";
const GOOGLE_BASE_URL = "https://www.googleapis.com/books/v1/volumes";
// const sampleBooks = [

//   {
//     _id: "something weird",
//     authors: ["Suzanne Collins"],
//     description: "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
//     image: "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
//     link: "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
//     title: "The Hunger Games"
//   },
//   {
//     _id: "something else weird",
//     authors: ["Me"],
//     description: "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
//     image: "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
//     link: "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
//     title: "Not the Hunger Games"
//   }
// ];

export default {
  searchGoogleBooks: (title, author) => {
    return new Promise( (resolve,reject) => {
      // console.log("searchGoogleBooks author=" + author + " title=" + title);
      let query = "?q=";
      if (title !== "") {
        query += "intitle:" + title.replace(/ /g, "+");
        if (author !== "") {
          query += "+inauthor:" + author.replace(/ /g, "+");
        }
      }
      else {
        if (author !== "") {
          query += "inauthor:" + author.replace(/ /g, "+");
        }
        else {
          console.log("searchGoogleBooks: both author and title are empty");
          reject();
        }
      }
      // console.log(GOOGLE_BASE_URL + query + "&key=" + GOOGLE_BOOKS_API);
      axios.get(GOOGLE_BASE_URL + query +"&key=" + GOOGLE_BOOKS_API)
        .then(function (response) {
          if (response.data) {
            // console.log("searchGoogleBooks: returned " + response.data.items.length + " items");
            resolve(response.data.items);
          }
          else {
            console.log("searchGoogleBooks: no items returned");
            console.log(response);
            // returning empty list, but would need to analyze why it went wrong
            resolve([]);
          }})
        .catch( (error) => {
          console.log("searchGoogleBooks: Google API returned error " + error.response.status);
          console.log(error);
          reject(error);
      })
    });
  }
}