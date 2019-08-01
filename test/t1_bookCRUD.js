// test CRD routes for book database
// creates a new item, then deletes it

const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = require("chai").expect;
chai.use(chaiHttp);

let savedBookId = "";
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

var app = require("../server");

describe("t1_bookCRUD\n", () => {
    it("Server should start", (done) => {
        // wait for server to start before doing anything
        setTimeout(() => {
            // app should have lots of data in it, just check that it isn't still a blank object
            expect(typeof (app.settings)).to.equal("object");
            done();
        }, 1500);
    });
});
describe("CRD using /api route", () => {
    it("Create new book" + notWritten, (done) => {
        chai.request(app)
            .post(`/api`)
            .type('form')
            .send(
                JSON.stringify(sampleBooks[0])
                )
            .end((err, res) => {
                if (err) throw err;
                // fs.writeFileSync("temp3", JSON.stringify(res));
                const body = JSON.parse(res.body);
                expect(res.status).to.equal(201, "http response code");
                expect(body.length).to.equal(1);
                savedBookId = body._id;
                console.log("Create book");
                console.log(savedBookId);
                done();
            });
    });
    it("Read all books", (done) => {
        chai.request(app)
        .get(`/api`)
        .end((err, res) => {
            if (err) throw err;
            const body = JSON.parse(res.body);
            expect(res.status).to.equal(200,"http response code");
            expect(body.length).to.equal(1);
            done();
        });
    });
    it("Delete a book", (done) => {
        chai.request(app)
            .delete(`/api`)
            .send(JSON.stringify({deleteId: savedBookId}))
            .end((err, res) => {
                if (err) throw err;
                const body = JSON.parse(res.body);
                expect(res.status).to.equal(200, "http response code");
                expect(body.length).to.equal(1);
                done();
            });
    });
});
