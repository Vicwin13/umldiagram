import express, { NextFunction, Request, Response } from 'express';

import {AppError} from './errors';
import NoteController from './controller';
import connectDB from './db';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();


app.use(express.json());

// Routes

app.get('/api/notes', async(req:Request, res: Response, next: NextFunction) => {
    try{
        const notes = await NoteController.getNotes();
        res.status(200).json(notes);
    }catch(err){
        next(err)
    }
});

app.post('/api/notes', async(req: Request, res: Response, next: NextFunction) => {
    try{
        const newNote = await NoteController.createNote(req.body);
        res.status(201).json(newNote);
    }catch(err){
        next(err);
    }
})

app.get('/api/notes/:id', async(req: Request, res: Response, next: NextFunction) => {
    try{
        const noteId = String(req.params.id);
        const note = await NoteController.getNote(noteId);
        res.status(200).json(note);
    }catch(err){
        next(err);
    }
})

app.put('/api/notes/:id', async(req: Request, res: Response, next: NextFunction) => {
    try{
        const noteId = String(req.params.id);
        const updateNote = await NoteController.updateNote(noteId, req.body);
        res.status(200).json(updateNote);
    }catch(err){
        next(err);
    }
})

app.delete('/api/notes/:id', async(req: Request, res: Response, next: NextFunction) => {
    try{
        const noteId = String(req.params.id);
        await NoteController.deleteNote(noteId);
        res.status(204).end();
    }catch(err){
        next(err);
    }
})

app.patch('/api/notes/:id', async(req: Request, res: Response, next: NextFunction) => {
    try{
        const noteId = String(req.params.id);
        const updateNote = await NoteController.updateNote(noteId, req.body);
        res.status(200).json(updateNote);
    }catch(err){
        next(err);
    }
})

app.use((err: AppError, req: Request, res: Response) => {
    if(err instanceof AppError) {
        res.status(err.statusCode).json({error: err.message});
        return;
    }

    res.status(500).json({error: 'Internal Server Error'});
});

app.listen(PORT, () => {
    console.log(`TypeScript ExpressServer running at http://localhost:${PORT}/`);
});