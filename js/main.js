    const boxValue = document.querySelector('#boxValue');
    const drop = document.querySelector('#drop');
    const drag = document.querySelector('#drag');
    const items = document.querySelectorAll('.item');

    // Drag and Drop listeners
    drop.addEventListener('dragover', dragOver);
    drop.addEventListener('dragenter', dragEnter);
    drop.addEventListener('dragleave', dragLeave);
    drop.addEventListener('drop', dragDrop);

    drag.addEventListener('dragover', dragOver);
    drag.addEventListener('dragenter', dragEnter);
    drag.addEventListener('dragleave', dragLeave);
    drag.addEventListener('drop', dropDrag);

    // Loop through the items and call drag events
    for(const item of items) {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    }

    // Dragged item
    let currentItem;

    // Drag functions
    function dragStart() {
        currentItem = this;
    }

    function dragEnd() {
    }

    function dragOver(e) {
        e.preventDefault();
    }
    function dragEnter(e) {
        e.preventDefault();
    }
    function dragLeave() {
    }
    function dragDrop() {
        currentItem.classList.add("itemIn");
        this.append(currentItem);
        boxValue.innerHTML = getBoxValue();
    }

    function dropDrag() {
        currentItem.classList.remove("itemIn");
        this.append(currentItem);
        boxValue.innerHTML = getBoxValue();
    }

    function getBoxValue() {
        const itemsInTheBox = document.querySelectorAll('.itemIn');
        const wallTypes = document.querySelectorAll('.wallType');
        
        let baseIndex = 0;
        let total = 0;

        // Get the base value from wall type radio buttons
        for (const wallType of wallTypes){
            if (wallType.checked){
                total = Number(wallType.dataset.baseIndex);
            }
        }

        // Collect all items in drop area and calculate the actual greenIndex value
        for (const item of itemsInTheBox){
            let currNum = Number(item.dataset.greenIndex);
            total += currNum;   
        }

        return total;
    }        