// filename routes
// author : andreferi

module.exports = (app) => {
    const categoriesController = require("../controller/categoriesController");
    const note = require("../controller/noteController");

    // GET NOTES
    app.get("/note", note.allData);
    app.get("/note/:id", note.getOneNote);
    app.post("/note", note.addNote);
    app.patch("/note/:id", note.updNote);
    app.delete("/note/:id", note.delNote);

    // GET CATEGORIES
    app.get("/categories", categoriesController.get);
    app.get("/note/category/:id", categoriesController.getByCategory);
    app.post("/categories", categoriesController.add);
    app.patch("/categories/:id", categoriesController.update);
    app.delete("/categories/:id", categoriesController.delete);
}