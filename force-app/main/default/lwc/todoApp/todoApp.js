import { LightningElement, track } from 'lwc';
import { tasks } from 'c/data';

export default class TodoApp extends LightningElement {

    @track lists = [
        {
            Id: 1,
            category: 'WIP',
            tasks: []
        },
        {
            Id: 2,
            category: 'Complete',
            tasks: []
        }
    ]

    @track tasklist = tasks;
    @track leftTasks = [];
    @track rightTasks = [];

    connectedCallback() {
        this.distributeTasks();
    }

    distributeTasks() {
        const old = JSON.parse(JSON.stringify(this.lists));
        this.lists = old.map(list => {
            return {...list, tasks: this.tasklist.filter(task => task.category === list.category)};
        })
    }
	
	handleListItemDrag(evt) {
        console.log('Dragged id is: ' + evt.detail);
        this.draggingid = evt.detail;
    }
	
    handleItemDrop(evt) {
        
        const newCategory = evt.currentTarget.title;
        console.log('Dropped to: ' + newCategory);

        const idx = this.tasklist.findIndex(task => task.taskid === this.draggingid);
        this.tasklist[idx].category = newCategory;

        this.distributeTasks();
    }
    handleDragOver(evt) {
        evt.preventDefault();
    }    
}