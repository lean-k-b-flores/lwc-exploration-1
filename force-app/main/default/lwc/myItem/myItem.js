import { LightningElement, api } from 'lwc';

export default class MyItem extends LightningElement {
    @api task;

    itemDragStart(evt) {
        evt.target.classList.add('dragging');
        this.dispatchEvent(new CustomEvent('itemdrag', {
            bubbles: true,
            composed: true,
            detail: this.task.taskid
        }));
    }

    itemDragEnd(evt) {
        evt.target.classList.remove('dragging');
    }
}