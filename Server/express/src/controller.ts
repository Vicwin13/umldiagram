import { INote, Note } from './noteModel';

import { NotFoundError } from './errors';

class NoteController { 
    async getNotes(): Promise<INote[]> { 
        return await Note.find({});
    }

    async getNote(id: string): Promise<INote> {
        const note = await Note.findById(id);

        if(!note) {
            throw new NotFoundError(`Note with ID ${id} was not found`);
        }
        return note;
    }

    async createNote(noteData: Partial<INote>): Promise<INote> {
      
        return await Note.create(noteData);
    }


    async updateNote(id:string, updatedData: Partial<INote>): Promise<INote> { 
        const updatedNote = await Note.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if(!updatedNote) {
            throw new NotFoundError(`Note with ID ${id} was not found`);
        }
        return updatedNote;
    }

    async deleteNote(id: string): Promise<{message: string, deleteNote: INote}> { 
       
        const  deleteNote = await Note.findByIdAndDelete(id);

         if(!deleteNote) {
            throw new NotFoundError(`Note with ID ${id} was not found`);
        }
        
        return {message: `Note with ID ${id} was successfully deleted`, deleteNote};
    }

 }

 export default new NoteController();







