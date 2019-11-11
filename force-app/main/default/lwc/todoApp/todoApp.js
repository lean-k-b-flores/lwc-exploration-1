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
    idCounter = 2;


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
        evt.stopPropagation();
        this.draggingid = evt.detail;
    }
	
    handleItemDrop(evt) {
        evt.stopPropagation();
        const newCategory = evt.currentTarget.title;

        const idx = this.tasklist.findIndex(task => task.taskid === this.draggingid);
        this.tasklist[idx].category = newCategory;

        this.distributeTasks();
    }
    handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
    }
    handleKeyPress(evt) {
        if(evt.keyCode === 13) {
            evt.preventDefault();
            this.idCounter++;
            this.lists.push({
                Id: this.idCounter,
                category: evt.target.value,
                tasks: []
            })
        }
    }
    handleNewItem(evt) {
        
        const lastTaskId = this.tasklist[this.tasklist.length - 1].taskid;

        const currentCount = Number.parseInt(lastTaskId.slice(2), 10);

        this.tasklist.push({
            taskid: `ta${currentCount + 1}`,
            name: evt.detail.taskName, 
            category: evt.detail.category
        })

        this.distributeTasks();

    }
}