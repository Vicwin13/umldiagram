import { NextFunction, Request, Response } from "express";

import NoteService from "../services/note.service";

class NoteController {
    async getNotes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user?.id) {
                res.status(401).json({ error: "User not authenticated" });
                return;
            }
            const notes = await NoteService.getAllNotes(req.user.id);
            res.status(200).json(notes);
        } catch (err) {
            next(err);
        }
    }

    async getNote(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const noteId = String(req.params.id);
            const userId = String(req.user?.id);
            const note = await NoteService.getNoteById(noteId, userId);
            res.status(200).json(note);
        } catch (err) {
            next(err);
        }
    }

    async getNotesByCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId = String(req.params.categoryId);
            const userId = String(req.user?.id);
            const notes = await NoteService.getNotesByCategoryId(categoryId, userId);
            res.status(200).json(notes);
        } catch (err) {
            next(err);
        }
    }

    async createNote(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = String(req.user?.id);
            const newNote = await NoteService.createNote(req.body, userId);
            res.status(201).json(newNote);
        } catch (err) {
            next(err);
        }
    }

    async updateNote(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const noteId = String(req.params.id);
            const userId = String(req.user?.id);
            const updateNote = await NoteService.updateNote(noteId, req.body, userId);
            res.status(200).json(updateNote);
        } catch (err) {
            next(err);
        }
    }

    async deleteNote(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const noteId = String(req.params.id);
            const userId = String(req.user?.id);
            await NoteService.deleteNote(noteId, userId);
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    }

}

export default new NoteController();