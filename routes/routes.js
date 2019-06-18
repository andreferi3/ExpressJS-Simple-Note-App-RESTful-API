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

    // GET APP
    app.get("/notes/category/:id", appController.noteByCatId)

    // GET CATEGORIES
    app.get("/", categoryController.home);
    app.get("/category", categoryController.allCat);
    app.get("/category/:id", categoryController.category);

    // GET JOINED DATA
    app.get('/app', appController.app);

    // POST NOTES
    app.post("/add-note", noteController.addNote);

    // POST CATEGORIES
    app.post("/add-category", categoryController.addCat);

    // PATCH NOTES
    app.patch('/edit-note/:id', noteController.editNote);

    // PATCH CATEGORIES
    app.patch('/edit-category/:id', categoryController.editCat);

    // DELETE NOTES
    app.delete('/notes/delete/:id', noteController.deleteNote);

    // DELETE CATEGORIES
    app.delete('/category/delete/:id', categoryController.deleteCat);
}