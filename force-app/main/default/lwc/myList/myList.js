import { LightningElement , api} from 'lwc';

export default class MyList extends LightningElement {
    @api tasklist;
    @api category;

    handleDragOver(evt) {
        evt.preventDefault();
    }

    handleItemDrag(evt) {
        // const event = new CustomEvent('listitemdrag', {
        //     bubbles: true,
        //     detail: evt.detail
        // });

        // this.dispatchEvent(event);
    }
	
	handleDrop(evt) {
        // const event = new CustomEvent('itemdrop', {
        //     bubbles: true,
        //     detail: this.category
        // });
        
        // this.dispatchEvent(event);
    }	
}