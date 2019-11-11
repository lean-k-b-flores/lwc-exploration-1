import { LightningElement , api} from 'lwc';

export default class MyList extends LightningElement {
    @api tasklist;
    @api category;

    handleKeyPress(evt) {
        if(evt.keyCode === 13) {
            evt.preventDefault();
            this.dispatchEvent(new CustomEvent('newitem', 
                { detail: 
                    {
                        taskName: evt.target.value,
                        category: this.category
                    }
                }
            ));
            evt.target.value = null;
        }
    }
}