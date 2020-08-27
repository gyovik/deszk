    const boxValue = document.querySelector('#boxValue');
    const drop = document.querySelector('#drop');
    const drag = document.querySelector('#drag');
    const houseOptions = document.querySelectorAll('.houseOption');
    const saveBtn = document.querySelector('#saveBtn');

    // we need this for the progressbar
    const pointPerPercent = 100/140;

    console.log(pointPerPercent);

    // Drag and Drop listeners
    drop.addEventListener('dragover', dragOver);
    drop.addEventListener('dragenter', dragEnter);
    drop.addEventListener('dragleave', dragLeave);
    drop.addEventListener('drop', dragDrop);

    drag.addEventListener('dragover', dragOver);
    drag.addEventListener('dragenter', dragEnter);
    drag.addEventListener('dragleave', dragLeave);
    drag.addEventListener('drop', dropDrag);

    // Save btn listener
    saveBtn.addEventListener('click', sendAjaxReq);

    // Loop through the items and call drag events
    for(const houseOption of houseOptions) {
        houseOption.addEventListener('dragstart', dragStart);
        houseOption.addEventListener('dragend', dragEnd);
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
        boxValue.innerHTML = calcGreenValue();
    }

    function dropDrag() {
        currentItem.classList.remove("itemIn");
        this.append(currentItem);
        boxValue.innerHTML = calcGreenValue();
    }

    /**
     * Return the selected radio button
     */
    function findSelectedWallType() {
        const wallTypes = document.querySelectorAll('.wallType');
        for (const wallType of wallTypes){
            if (wallType.checked){
                return wallType;
            }
        }
    }

    function calcGreenValue() {
        const itemsInTheBox = document.querySelectorAll('.itemIn');

        let baseIndex = 0;
        let total = 0;

        let wallType = findSelectedWallType();
        total = Number(wallType.dataset.baseIndex);
        wallType = null;

        // Collect all items in drop area and calculate the actual greenIndex value
        for (const item of itemsInTheBox){
            let currNum = Number(item.dataset.greenIndex);
            total += currNum;   
        }

        return total;
    }   

    function collectSelectedOptions() {
        const selectedOptions = document.querySelectorAll('.itemIn');
        let selectedOptionIds = [];
        let i = 0;
        selectedOptions.forEach(option => {
            selectedOptionIds[i] = option.dataset.optionId;
            i++;
        });
        return selectedOptionIds;
    }
    
    function sendAjaxReq() {
        const totalGreenValue = calcGreenValue();
        const selectedOptions = collectSelectedOptions();
        const wallTypeNode = findSelectedWallType();

        const errorDiv = document.querySelector('#error');
        const wallType = wallTypeNode.dataset.wallId;
        let data = {
            'save': 'true',
            'totalGreenValue' : totalGreenValue,
            'options' : selectedOptions,
            'wallType' : wallType
        }

        $.ajax({
            method: "POST",
            url:'reqHandler.php',
            data: data
        })
        .done(function(response){
            // errorDiv.innerHTML = response;
            console.log(response);
        });
    }