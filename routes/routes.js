// filename routes
// author : andreferi

module.exports = (app) => {
    const noteController = require("../controller/notesController");
    const categoryController = require("../controller/categoryController");
    const appController = require("../controller/appController");
    const categoriesController = require("../controller/categoriesController");
    const note = require("../controller/noteController");

    // GET NOTES
    app.get("/", noteController.home);
    app.get("/notes", noteController.allNotes);
    app.get("/notes/:id", noteController.notes);
    app.post("/notes", noteController.addNote);
    app.patch("/notes/:id", noteController.editNote);
    app.delete("/notes/:id", noteController.deleteNote);

    app.get("/note", note.allData);
    app.post("/note", note.addNote);
    app.patch("/note/:id", note.updNote);
    app.delete("/note/:id", note.delNote);
    app.get("/note/:id", note.getOneNote);

    // GET CATEGORIES
    app.get("/", categoryController.home);
    app.get("/category", categoryController.allCat);
    app.get("/category/:id", categoryController.category);
    app.post("/category", categoryController.addCat);
    app.patch("/category/:id", categoryController.editCat);
    app.delete("/category/:id", categoryController.deleteCat);
    app.get("/note/categories/:id", appController.noteByCatId);

    app.get("/categories", categoriesController.get);
    app.post("/categories", categoriesController.add);
    app.patch("/categories/:id", categoriesController.update);
    app.delete("/categories/:id", categoriesController.delete);
    app.get("/note/category/:id", categoriesController.getByCategory);
}