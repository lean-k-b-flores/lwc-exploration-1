import { LightningElement, api } from 'lwc';

export default class MyItem extends LightningElement {
    @api task;

    itemDragStart() {
        const event = new CustomEvent('itemdrag', {
            bubbles: true,
            composed: true,
            detail: this.task.taskid
        });

        this.dispatchEvent(event);
    }
}