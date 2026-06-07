import { BadRequestError, NotFoundError } from '../errors/errors';
import { INote, Note } from './../models/note.model';

class NoteService {
    async getAllNotes(userId: string): Promise<INote[]> {
        return await Note.find({ userId: userId})
    }

    async getNoteById(id: string, userId:string): Promise<INote> {
        const note = await Note.findOne({ _id: id, userId: userId });
        if (!note) {
            throw new NotFoundError(`Note not found`);
        }
        return note;
    }

    async getNotesByCategoryId(categoryId: string, userId: string): Promise<INote[]> {
        return await Note.find({ category: categoryId, userId: userId });
    }

    async createNote(noteData: Partial<INote>, userId: string): Promise<INote> {
        const noteWithUserId = { ...noteData, userId };

        const existingNote = await Note.findOne({ title: noteData.title, userId: userId });
        if (existingNote) {
            throw new BadRequestError(`Note with name ${noteData.title} already exists`);
        }
        return await Note.create(noteWithUserId);
    }

    async updateNote(id: string, updatedData: Partial<INote>, userId: string): Promise<INote> {
  
        const updateNote = await Note.findByIdAndUpdate(
            {_id:id, userId: userId},
            updatedData,
            { new: true, runValidators: true } 
            
        )

        if (!updateNote) {
            throw new NotFoundError(`Note was not found`);
        }
        return updateNote;
    }

    async deleteNote(id: string, userId:string): Promise<INote> {
        
        const deletedNote = await Note.findOneAndDelete({ _id: id, userId: userId });
        if (!deletedNote) {
            throw new NotFoundError(`Note  was not found`);
        }
        return deletedNote;
    }


}

export default new NoteService();
