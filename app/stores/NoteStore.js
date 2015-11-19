import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

/* We call bindActions to map each action to a method by name. We trigger the appropriate logic at
each method based on that. Finally we connect the store with Alt using alt.createStore.
*/

class NoteStore{
  constructor(){
    this.bindActions(NoteActions);

    this.notes = [];
  }

  create(note){
    const notes = this.notes;

    note.id = uuid.v4();
    /* 
      To keep the implementation clean, we are using this.setState. It is a feature of Alt that allows us
      to signify that we are going to alter the store state. Alt will signal the change to possible listeners.
    */
    this.setState({
      notes: notes.concat(note)
    });
  }

  update({id, task}){
    let notes = this.notes;
    const noteIndex = this.findNote(id);

    if(noteIndex < 0){
      return;
    }

    notes[noteIndex].task = task;
    this.setState({notes});
  }

  delete(id){
    const notes = this.notes;
    const noteIndex = this.findNote(id);

    if(noteIndex < 0){
      return;
    }

    this.setState({
      notes: notes.slice(0, noteIndex).concat(notes.slice(noteIndex + 1))
    });
  }

  findNote(id){
    const note = this.notes;
    const noteIndex = notes.findIndex((note)=> note.id === id);

    if(noteIndex < 0){
      console.warn('failed to find note', notes, id);
    }

    return noteIndex;
  }
}

export default alt.createStore(NoteStore, 'NoteStore');