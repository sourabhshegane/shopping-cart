export class Command {
  execute() { throw new Error('execute() must be implemented'); }
  undo() { throw new Error('undo() must be implemented'); }
}

export class AddItemCommand extends Command {
  constructor(cart, item) {
    super();
    this.cart = cart;
    this.item = item;
  }

  execute() {
    this.cart.items.push(this.item);
    this.cart.recalculateTotal();
  }

  undo() {
    const index = this.cart.items.lastIndexOf(this.item);
    if (index !== -1) {
      this.cart.items.splice(index, 1);
      this.cart.recalculateTotal();
    }
  }
}

export class CommandManager {
  constructor() {
    this.undoStack = [];
    this.redoStack = [];
  }

  execute(command) {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = []; // Clear redo stack
  }

  undo() {
    if (this.undoStack.length === 0) return;
    const command = this.undoStack.pop();
    command.undo();
    this.redoStack.push(command);
  }

  redo() {
    if (this.redoStack.length === 0) return;
    const command = this.redoStack.pop();
    command.execute();
    this.undoStack.push(command);
  }
}