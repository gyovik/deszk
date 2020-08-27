    const boxValue = document.querySelector('#boxValue');
    const drop = document.querySelector('#drop');
    const drag = document.querySelector('#drag');
    const houseOptions = document.querySelectorAll('.houseOption');
    const saveBtn = document.querySelector('#saveBtn');
    const progressBar = document.querySelector('.progress-bar');

    const wallTypeNodes = document.querySelectorAll('[name="wall_type"]');
    const heatingTypeNodes = document.querySelectorAll('[name="heating_type"]');

    for(const wallTypeNode of wallTypeNodes) {
        wallTypeNode.addEventListener('click', handleProgressBar);
    }

    for(const heatingTypeNode of heatingTypeNodes) {
        heatingTypeNode.addEventListener('click', handleProgressBar);
    }

    // we need this for the progress bar (1% of the width of the progressbar in greenpoints)
    const pointPerPercent = 100/160;

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
        // houseOption.addEventListener('touchstart', onTouch, false);
        houseOption.addEventListener('dragend', dragEnd);
        // houseOption.addEventListener('touchend', dragEnd, false);
    }

    // Dragged item
    let currentItem;

    // Drag functions
    function dragStart(e) {
        currentItem = this;
        if(findSelectedWallType() == false) {
            window.alert('Először válasszon épület típust!');
            e.preventDefault();
        }
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
        handleProgressBar();
    }

    function dropDrag() {
        currentItem.classList.remove("itemIn");
        this.append(currentItem);
        handleProgressBar();
    }

    //  Return the selected radio button  
    function findSelectedWallType() {
        const wallTypes = document.querySelectorAll('.wallType');
        let checkedWallType = false;
        console.log(wallTypes);

        for (const wallType of wallTypes){
            if (wallType.checked){
                checkedWallType = wallType;
            } 
        }
        return checkedWallType ? checkedWallType : false;
    }

    //  Return the selected radio button  
    function findSelectedHeatingType() {
        const heatingTypes = document.querySelectorAll('.heatingType');

        for (const heatingType of heatingTypes){
            if (heatingType.checked){
                return heatingType;
            }
        }
    }

    //  Calculate the actual "green point" of user house
    function calcGreenValue() {
        const itemsInTheBox = document.querySelectorAll('.itemIn');

        let baseIndex = 0;
        let total = 0;

        let wallType = findSelectedWallType();
        let heatingType = findSelectedHeatingType();
        total = Number(wallType.dataset.baseIndex);
        
        // Check the heating type, if it is selected, add it to total
        if (typeof(heatingType) !== 'undefined') {
            total += Number(heatingType.dataset.baseIndex);
        }

        // Collect all items in drop area and calculate the actual greenIndex value
        for (const item of itemsInTheBox){
            let currNum = Number(item.dataset.greenIndex);
            total += currNum;   
        }
        return total;
    }   

    function handleProgressBar() {

        const darkGreen = '#4bb549';
        const green = '#a6c34c';
        const orange = '#ffc84a';
        const darkOrange = '#f48847';
        const red = '#eb4841';
          
        let greenValue = calcGreenValue();
 
        progressBar.innerText = greenValue;
        progressBar.style.width = `${greenValue * pointPerPercent}%`;
        progressBar.className = '';

        if (greenValue <= 10) {
            progressBar.style.width = '5%';
            progressBar.className = 'progress-bar prog-red';
        } else if(greenValue > 10 && greenValue <= 28) {
            progressBar.className = 'progress-bar prog-red';
        } else if(greenValue > 28 && greenValue <= 56) {
            progressBar.className = 'progress-bar prog-dark-orange';
        } else if(greenValue > 56 && greenValue <= 84) {
            progressBar.className = 'progress-bar prog-orange';
        } else if(greenValue > 84 && greenValue <= 100) {
            progressBar.className = 'progress-bar prog-green';
        } else if(greenValue > 100 && greenValue <= 160) {
            progressBar.className = 'progress-bar prog-dark-green';
        }
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
    
    
    //  Send user data to db using AJAX
    function sendAjaxReq() {
        const totalGreenValue = calcGreenValue();
        const selectedOptions = collectSelectedOptions();
        const wallTypeNode = findSelectedWallType();
        const heatingTypeNode = findSelectedHeatingType();

        const wallType = wallTypeNode.dataset.wallId;
        const heatingType = heatingTypeNode.dataset.heatingId;
        let data = {
            'save': 'true',
            'totalGreenValue' : totalGreenValue,
            'options' : selectedOptions,
            'wallType' : wallType,
            'heatingType' : heatingType
        }

        $.ajax({
            method: "POST",
            url:'reqHandler.php',
            data: data
        })
        .done(function(response){
            window.location.reload();
            window.alert(response);
        });
    }