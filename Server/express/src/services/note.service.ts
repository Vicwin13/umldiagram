import { BadRequestError, NotFoundError } from '../errors/errors';
import { INote, Note } from './../models/note.model';

class NoteService {
    async getAllNotes(): Promise<INote[]> {
        return await Note.find({})
    }

    async getNoteById(id: string): Promise<INote> {
        const note = await Note.findById(id);
        if (!note) {
            throw new NotFoundError(`Note with ID ${id} was not found`);
        }
        return note;
    }

    async getNotesByCategoryId(categoryId: string): Promise<INote[]> {
        return await Note.find({ category: categoryId })
    }

    async createNote(noteData: Partial<INote>): Promise<INote> {
        const existingNote = await Note.findOne({ name: noteData.title});
        if (existingNote) {
            throw new BadRequestError(`Note with name ${noteData.title} already exists`);
        }
        return await Note.create(noteData);
    }

    async updateNote(id: string, updatedData: Partial<INote>): Promise<INote> {
        const updateNote = await Note.findByIdAndUpdate(
            id,
            updatedData,
            { returnDocument: 'after', runValidators: true }
        )

        if (!updateNote) {
            throw new NotFoundError(`Note with ID ${id} was not found`);
        }
        return updateNote;
    }

    async deleteNote(id: string): Promise<INote> {
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            throw new NotFoundError(`Note with ID ${id} was not found`);
        }
        return deletedNote;
    }


}

export default new NoteService();
