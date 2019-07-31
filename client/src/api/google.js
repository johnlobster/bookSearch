// GET https://www.googleapis.com/books/v1/volumes?q=Call+of+the+wild&key={YOUR_API_KEY}
// GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
// intitle: Returns results where the text following this keyword is found in the title.
//   inauthor: Returns results where the text following this keyword is found in the author.
//     inpublisher: Returns results where the text following this keyword is found in the publisher.
//       subject: Returns results where the text following this keyword is listed in the category list of the volume.
//         isbn: Returns results where the text following this keyword is the ISBN number.
//           lccn: Returns results where the text following this keyword is the Library of Congress Control Number.
//             oclc: Returns results where the text following this keyword is the Online Computer Library Center number.

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
  searchGoogleBooks: (title, author) => {
    return new Promise( (resolve,reject) => {
      resolve(sampleBooks);
    });
  }
}