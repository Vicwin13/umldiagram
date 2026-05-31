import { INote } from "../models/note.model";
import NoteController from "../controller/note.controller";
import { Router } from "express";
import { validateRequestBody } from "../middleware/validate.middleware";

const router = Router();

type NotePayload = Pick<INote, 'title' | 'content' | 'category'>;

router.get('/', NoteController.getNotes);
router.post('/', validateRequestBody<NotePayload>(['title', 'content', 'category']), NoteController.createNote);
router.get('/category/:categoryId',  NoteController.getNotesByCategory);
router.get('/:id',  NoteController.getNote);
router.put('/:id', validateRequestBody<NotePayload>(['title', 'content', 'category']), NoteController.updateNote);
router.delete('/:id',  NoteController.deleteNote);

export default router;
