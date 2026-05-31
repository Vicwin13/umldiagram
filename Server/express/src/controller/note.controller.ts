import { NextFunction, Request, Response } from "express";

import NoteService from "../services/note.service";

class NoteController {
    async getNotes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const notes = await NoteService.getAllNotes();
            res.status(200).json(notes);
        } catch (err) {
            next(err);
        }
    }

    async getNote(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const noteId = String(req.params.id);
            const note = await NoteService.getNoteById(noteId);
            res.status(200).json(note);
        } catch (err) {
            next(err);
        }
    }

    async getNotesByCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId = String(req.params.categoryId);
            const notes = await NoteService.getNotesByCategoryId(categoryId);
            res.status(200).json(notes);
        } catch (err) {
            next(err);
        }
    }

    async createNote(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const newNote = await NoteService.createNote(req.body);
            res.status(201).json(newNote);
        } catch (err) {
            next(err);
        }
    }

    async updateNote(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const noteId = String(req.params.id);
            const updateNote = await NoteService.updateNote(noteId, req.body);
            res.status(200).json(updateNote);
        } catch (err) {
            next(err);
        }
    }

    async deleteNote(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const noteId = String(req.params.id);
            await NoteService.deleteNote(noteId);
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    }

}

export default new NoteController();