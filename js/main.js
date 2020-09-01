    const boxValue = document.querySelector('#boxValue');
    const drop = document.querySelector('#drop');
    const drag = document.querySelector('#drag');
    const houseOptions = document.querySelectorAll('.houseOption');
    const saveBtn = document.querySelector('#saveBtn');
    const progressBar = document.querySelector('.progress-bar');

    const wallTypeNodes = document.querySelectorAll('[name="wall_type"]');
    const heatingTypeNodes = document.querySelectorAll('[name="heating_type"]');
    const cookerTypeNodes = document.querySelectorAll('[name="cooker_type"]');

    for(const wallTypeNode of wallTypeNodes) {
        wallTypeNode.addEventListener('click', handleProgressBar);
    }

    for(const heatingTypeNode of heatingTypeNodes) {
        heatingTypeNode.addEventListener('click', handleProgressBar);
    }

    for(const cookerTypeNode of cookerTypeNodes) {
        cookerTypeNode.addEventListener('click', handleProgressBar);
    }

    // we need this for the progress bar (1% of the width of the progressbar in greenpoints)
    const pointPerPercent = 100/150;

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
        houseOption.addEventListener('touchstart', dragStart);
        houseOption.addEventListener('touchend', dragEnd);
    }

    // Dragged item
    let currentItem;

    // Drag functions
    function dragStart() {
        currentItem = this;
        if(findSelectedWallType() == false) {
            $('#modalLabel').text('Először válasszon épület típust!');
            $('#message').modal('show');
        }
        // cancelDefaultBehavior(e);
    }

    function dragEnd(e) {
        // return this.cancelDefaultBehavior(e);
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
        // return this.cancelDefaultBehavior(e);
    }
    
    function dropDrag() {
        currentItem.classList.remove("itemIn");
        this.append(currentItem);
        handleProgressBar();
        // return this.cancelDefaultBehavior(e);
    }

    //  Return the selected radio button  
    function findSelectedWallType() {
        const wallTypes = document.querySelectorAll('.wallType');

        // let checkedWallType = false;

        for (const wallType of wallTypes){
            if (wallType.checked){
                return wallType;
            } 
        }
        return false;
        // return checkedWallType ? checkedWallType : false;
    }

    //  Return the selected radio button  
    function findSelectedHeatingType() {
        const heatingTypes = document.querySelectorAll('.heatingType');

        for (const heatingType of heatingTypes){
            if (heatingType.checked){
                return heatingType;
            }
        }
        return 0;
    }

    //  Return the selected radio button  
    function findSelectedCookerType() {
        const cookerTypes = document.querySelectorAll('.cookerType');

        for (const cookerType of cookerTypes){
            if (cookerType.checked){
                return cookerType;
            }
        }
        return 0;
    }

    //  Calculate the actual "green point" of user house
    function calcGreenValue() {
        const itemsInTheBox = document.querySelectorAll('.itemIn');
        let total = 0;

        $('#wallTypes').removeClass('redBorder');
        $('#options').removeClass('redBorder');

        if(!findSelectedWallType()){
            $('#modalLabel').text('Kérjük válasszon épület típust!');
            $('#message').modal('show');
            $('#wallTypes').addClass('redBorder');
            return;
        }

        let wallType = findSelectedWallType();
        let heatingType = findSelectedHeatingType();
        let cookerType = findSelectedCookerType();
        total = Number(wallType.dataset.baseIndex);
        console.log(heatingType);
        // Check the heating type, if it is selected, add it to total
        if (heatingType !== 0) {
            total += Number(heatingType.dataset.baseIndex);
        }

        // Check the cooker type, if it is selected, add it to total
        if (cookerType !== 0) {
            total += Number(cookerType.dataset.baseIndex);
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
 
        progressBar.style.width = `${greenValue * pointPerPercent}%`;
        progressBar.className = '';

        if (greenValue <= 10) {
            progressBar.style.width = '5%';
            progressBar.className = 'progress-bar prog-red';
        } else if(greenValue > 10 && greenValue <= 65) {
            progressBar.className = 'progress-bar prog-red';
        } else if(greenValue > 65 && greenValue <= 95) {
            progressBar.className = 'progress-bar prog-dark-orange';
        } else if(greenValue > 95 && greenValue <= 120) {
            progressBar.className = 'progress-bar prog-orange';
        } else if(greenValue > 120 && greenValue <= 140) {
            progressBar.className = 'progress-bar prog-green';
        } else if(greenValue > 140 && greenValue <= 160) {
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
        const heatingType = findSelectedHeatingType();
        const cookerType = findSelectedCookerType();

        if (selectedOptions.length === 0) {
            $('#modalLabel').text('Kérjük válasszon opció(ka)t!');
            $('#message').modal('show');
            $('#options').addClass('redBorder');
            return;
        }

        const wallType = wallTypeNode.dataset.wallId;
        let data = {
            'save': 'true',
            'totalGreenValue' : totalGreenValue,
            'options' : selectedOptions,
            'wallType' : wallType,
            'heatingType' : heatingType,
            'cookerType' : cookerType
        }

        $.ajax({
            method: "POST",
            url:'reqHandler.php',
            data: data
        })
        .done(function(response){

            // $('#modalLabel').text(response);
            // $('#message').modal('show');
            window.alert(response);
            location.reload();
           
        });
    }