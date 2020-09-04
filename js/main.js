    const boxValue = document.querySelector('#boxValue');
    const drop = document.querySelector('#drop');
    const drag = document.querySelector('#drag');
    const houseOptions = document.querySelectorAll('.houseOption');
    const mainSaveBtn = document.querySelector('#mainSaveBtn');
    const modalSaveBtn = document.querySelector('#modalSaveBtn');
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
    // drop.addEventListener('dragleave', dragLeave);
    drop.addEventListener('drop', dragDrop);

    drag.addEventListener('dragover', dragOver);
    drag.addEventListener('dragenter', dragEnter);
    // drag.addEventListener('dragleave', dragLeave);
    drag.addEventListener('drop', dropDrag);

    // Main save btn listener
    mainSaveBtn.addEventListener('click', function() {

        if(!findSelectedOption('.wallType')){
            $('#modalLabel').text('Kérjük válasszon épület típust!');
            $('#message').modal('show');
            $('#wallTypes').addClass('redBorder');
            return;
        }

        const selectedOptions = collectSelectedOptions();
        if (selectedOptions.length === 0) {
            $('#modalLabel').text('Kérjük válasszon opció(ka)t!');
            $('#message').modal('show');
            $('#options').addClass('redBorder');
            return;
        }

        $('#modalForm').modal('show');
    });

    modalSaveBtn.addEventListener('click', sendAjaxReq);

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
        if(!findSelectedOption('.wallType')) {
            $('#modalLabel').text('Először válasszon épület típust!');
            $('#message').modal('show');
        }
    }

    function dragEnd(e) {
        e.preventDefault();
    }
    
    function dragOver(e) {
        e.preventDefault();
    }
    function dragEnter(e) {
        e.preventDefault();
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
  
    /**
     * Return the selected option
     * 
     * @param string selectClass The name of the select tag's class or id ('.className'|'#idName')
     * 
     * @return int|bool The id of the selected item or false if nothing selected  
     */
    function findSelectedOption(selectClass) {

        const selectOptions = document.querySelectorAll(selectClass);
    
        for (const option of selectOptions){
            if (option.checked){
                return option;
            }
        }
        return false;
    }

    // function findSelectedCookerType() {
    // }

    //  Calculate the actual "green point" of user house
    function calcGreenValue() {
        const itemsInTheBox = document.querySelectorAll('.itemIn');
        let total = 0;

        $('#wallTypes').removeClass('redBorder');
        $('#options').removeClass('redBorder');
        
        let wallType = findSelectedOption('.wallType');
        let heatingType = findSelectedOption('.heatingType');
        let cookerType = findSelectedOption('.cookerType')
        
        if(!wallType){
            $('#modalLabel').text('Kérjük válasszon épület típust!');
            $('#message').modal('show');
            $('#wallTypes').addClass('redBorder');
            return;
        }
        
        total = Number(wallType.dataset.baseIndex);

        // Check the heating type, if it is selected, add it to total
        if (heatingType) {
            total += Number(heatingType.dataset.baseIndex);
        }

        // Check the cooker type, if it is selected, add it to total
        if (cookerType) {
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

    function getAgeGroupId() {
        $('#age').removeClass('border border-danger');
        const formVal = $('#age').children("option:selected").val();
        if (formVal === '0') {
            return false;
        }
        return formVal;
    }

    function getEducationLevelId() {
        $('#educationLevel').removeClass('border border-danger');
        const formVal = $('#educationLevel').children("option:selected").val();
        if (formVal === '0') {
            return false;
        }
        return formVal;
    }
    
    //  Send user data to db using AJAX
    function sendAjaxReq() {
        $('#modalForm').modal('hide');
        // debugger;
        const totalGreenValue = calcGreenValue();
        const selectedOptions = collectSelectedOptions();
        const wallTypeNode = findSelectedOption('.wallType');
        const heatingTypeNode = findSelectedOption('.heatingType');
        const cookerTypeNode = findSelectedOption('.cookerType');
        const ageGroupId = getAgeGroupId();
        const educationLevelId = getEducationLevelId();

        let heatingType = 0;
        let cookerType = 0;

        if(!wallTypeNode){
            $('#modalLabel').text('Kérjük válasszon épület típust!');
            $('#message').modal('show');
            $('#wallTypes').addClass('redBorder');
            return;
        }

        if (selectedOptions.length === 0) {
            $('#modalLabel').text('Kérjük válasszon opció(ka)t!');
            $('#message').modal('show');
            $('#options').addClass('redBorder');
            return;
        }

        if(!ageGroupId) {
            $('#ageErrMsg').text('Kérem válasszon korcsoportot!');
            $('#age').addClass('border border-danger');
            return;
        }

        if(!educationLevelId) {
            $('#eduErrMsg').text('Kérem válasszon iskolai végzettséget!');
            $('#educationLevel').addClass('border border-danger');
            return;
        }

        if (heatingTypeNode) {
            heatingType = heatingTypeNode.dataset.heatingId
        }

        if (cookerTypeNode) {
            cookerType = cookerTypeNode.dataset.cookerId
        }

        const wallType = wallTypeNode.dataset.wallId;
        let data = {
            'save': 'true',
            'totalGreenValue' : totalGreenValue,
            'options' : selectedOptions,
            'wallType' : wallType,
            'heatingType' : heatingType,
            'cookerType' : cookerType,
            'educationLevelId': educationLevelId,
            'ageGroupId': ageGroupId
        }

        $.ajax({
            method: "POST",
            url:'reqHandler.php',
            data: data
        })
        .done(function(response){
            $('#modalLabel').text(response);
            $('#message').modal('show');
            $('#message').on('hide.bs.modal', function() {
                location.reload();
            });
                
        });
    }