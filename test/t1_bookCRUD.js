// test CRD routes for book database
// creates a new item, then deletes it

const mongoose = require("mongoose");
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

let { server, db } = require("../server");
// connect directly to db so can remove all items (mostly an issue with failing tests)
mongoose.connect("mongodb://localhost/booksearch_test", { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to mongoose/mongodb database");
        return db.Book.bulkWrite([{ deleteMany: { filter: {} } }]); // returns promise
    })
    .catch(err => {
        console.log("Problem connecting to mongodb");
        throw new Error(err);
    });

describe("t1_bookCRUD\n", () => {
    it("Server should start", (done) => {
        // wait for server to start before doing anything
        setTimeout(() => {
            // server should have lots of data in it, just check that it isn't still a blank object
            expect(typeof (server.settings)).to.equal("object");
            done();
        }, 1500);
    });
});

describe("CRD using /api route", () => {
    it("Read all books - should be empty", (done) => {
        chai.request(server)
        .get(`/api`)
        .end( function (err, res)  {
            if (err) {
                console.log("Error in get test");
                console.log(err);
                throw err;
            }
            // console.log("chai-http server return");
            expect(res.status).to.equal(200,"http response code");
            expect(res.body.length).to.equal(0);
            done();
        });
    });
    it("Create new book", (done) => {
        chai.request(server)
            .post(`/api`)
            .type('form')
            .send(
                sampleBooks[0]
                )
            .end((err, res) => {
                if (err) throw err;
                // books controller sends object with postSuccessful key
                expect(res.status).to.equal(201, "http response code");
                expect(res.body.postSuccessful).to.equal(true);
                savedBookId = res.body.newBookId;
                done();
            });
    });
    it("Read all books - expect one", (done) => {
        chai.request(server)
        .get(`/api`)
        .end( function (err, res)  {
            if (err) {
                console.log("Error in get test");
                console.log(err);
                throw err;
            }
            expect(res.status).to.equal(200,"http response code");
            expect(res.body.length).to.equal(1);
            done();
        });
    });
    it("Delete a book", (done) => {
        chai.request(server)
            .delete(`/api`)
            .send({deleteId: savedBookId})
            .end((err, res) => {
                if (err) throw err;
                expect(res.status).to.equal(200, "http response code");
                expect(res.body.deleteSuccessful).to.equal(true);
                done();
            });
    });
    it("Delete a book with wrong id", (done) => {
        // note, mongoose throws an error if the deleteId isn't
        // a valid mongodb Object Id
        // copied this value from a log file
        chai.request(server)
            .delete(`/api`)
            .send({ deleteId: "5d43569659b76f522498b786" })
            .end((err, res) => {
                if (err) throw err;
                expect(res.status).to.equal(422, "http response code");
                expect(res.body.deleteSuccessful).to.equal(false);
                done();
            });
    });
    it("End test: read all books - should be empty", (done) => {
        chai.request(server)
            .get(`/api`)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in get test");
                    console.log(err);
                    throw err;
                }
                expect(res.status).to.equal(200, "http response code");
                expect(res.body.length).to.equal(0);
                done();
            });
    });
});
