// filename routes
// author : andreferi

module.exports = (app) => {
    const noteController = require("../controller/notesController");
    const categoryController = require("../controller/categoryController");
    const appController = require("../controller/appController");

    // GET NOTES
    app.get("/", noteController.home);
    app.get("/notes", noteController.allNotes);
    app.get("/notes/:id", noteController.notes);
    app.post("/notes", noteController.addNote);
    app.patch("/notes/:id", noteController.editNote);
    app.delete("/notes/:id", noteController.deleteNote);

    // GET CATEGORIES
    app.get("/", categoryController.home);
    app.get("/category", categoryController.allCat);
    app.get("/category/:id", categoryController.category);
    app.post("/category", categoryController.addCat);
    app.patch("/category/:id", categoryController.editCat);
    app.delete("/category/:id", categoryController.deleteCat);
    app.get("/notes/category/:id", appController.noteByCatId);
}