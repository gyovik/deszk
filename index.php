<?php
require 'Controller.php';

  $controller = new Controller;
  $houseOptions = $controller->getHouseOptions();
  $houseTypes = $controller->getHouseTypes();
  $heatingTypes = $controller->getHeatingTypes();
  $cookerTypes = $controller->getCookerTypes();
  $ageGroups = $controller->getAgeGroups();
  $educationLevels = $controller->getEducationLevels();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drag &amp; drop</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<div id="message" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="smallModal" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="modalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <button type="button" class="btn btn-success" data-dismiss="modal">Rendben</button>
      </div>
    </div>
  </div>
</div>
<div id="modalForm" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="smallModal" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-body">
        <form class="needs-validation" novalidate>
          <div class="form-row align-items-center">
            <div class="col-auto">
              <label class="mr-sm-2" for="age">Az Ön életkora:</label>
              <div id="ageErrMsg"></div>
              <select class="form-control mr-sm-2" id="age" required>
                <option value="0" selected disabled>Válasszon...</option>
                <?php
                foreach($ageGroups as $age) :
                  ?>
                  <option value="<?php echo $age['id']; ?>"><?php echo $age['name']; ?></option>
                  <?php
                endforeach;
                ?>
              </select>
              <label class="mr-sm-2" for="educationLevel">Az Ön legmagasabb iskolai végzettsége:</label>
              <div id="eduErrMsg"></div>
              <select class="custom-select mr-sm-2" id="educationLevel" required>
                <option value="0" selected disabled>Válasszon...</option>
                <?php
                foreach($educationLevels as $edLevel) :
                ?>
                  <option value="<?php echo $edLevel['id']; ?>"><?php echo $edLevel['name']; ?></option>
                <?php
                endforeach;
                ?>
              </select>
            </div>
          </div>
        </form>
        <div class="modal-footer">
          <button id="modalSaveBtn" type="button" class="btn btn-success">Mentés</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">Mégsem</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  <div class="boxes">
    <section id="drag">
      <div class="radioBtns" id="wallTypes">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <?php
          foreach($houseTypes as $houseType) :
          ?>
          <label class="btn btn-light pulse">
            <input name="wall_type" data-wall-id="<?php echo $houseType['id']; ?>" class="wallType" type="radio" data-base-index="<?php echo $houseType['green_index']; ?>" autocomplete="off">
            <span class="wall-item">
            <?php echo $houseType['icon'] ? '<img src="svg/' . $houseType['icon'] . '.svg"/>' : ''; ?>
            </span>
          </label>
          <?php
          endforeach;
          ?>
        </div> 
      </div> <!-- #wallTypes -->
      <div class="radioBtns" id="heatingTypes">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <?php
          foreach($heatingTypes as $heatingType) :
          ?>
            <label class="btn btn-light">
              <input name="heating_type" data-heating-id="<?php echo $heatingType['id']; ?>" class="heatingType" type="radio" data-base-index="<?php echo $heatingType['green_index']; ?>" autocomplete="off">
              <span class="heating-item">
              <?php echo $heatingType['icon'] ? '<img src="svg/' . $heatingType['icon'] . '.svg"/>' : ''; ?>
            </span>
          </label>
          <?php
          endforeach;
          ?>
        </div> 
      </div> <!-- /#heatingTypes -->
      <div class="radioBtns" id="cookerTypes">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <?php
          foreach($cookerTypes as $cookerType) :
            ?>
            <label class="btn btn-light">
              <input name="cooker_type" data-cooker-id="<?php echo $cookerType['id']; ?>" class="cookerType" type="radio" data-base-index="<?php echo $cookerType['green_index']; ?>" autocomplete="off">
              <span class="cooker-item"> 
                <?php echo $cookerType['icon'] ? '<img src="svg/' . $cookerType['icon'] . '.svg"/>' : ''; ?>
              </span>
            </label>
          <?php
          endforeach;
          ?>
        </div>
      </div> <!-- /#cookerTypes -->
      <div id="options">
        <?php
        foreach($houseOptions as $option) :
        ?>
        <div class="houseOption" data-option-id="<?php echo $option['id']; ?>" data-green-index="<?php echo $option['green_index']; ?>" draggable="true">
          <?php echo $option['icon'] ? '<img src="svg/' . $option['icon'] . '.svg"/>' : '' ?>
        </div>
        <?php
        endforeach;
        ?> 
      </div> <!-- /#options  --> 
    </section>
      <div class="swipeArrow hidden">
        <svg class="arrows">
          <path class="a1" d="M0 0 L30 32 L60 0"></path>
          <path class="a2" d="M0 20 L30 52 L60 20"></path>
          <path class="a3" d="M0 40 L30 72 L60 40"></path>
        </svg>
      </div>  
    <section id="drop"></section>
  </div> <!-- /.boxes -->
  <footer>    
    <div class="progress">
      <div class="progress-bar" role="progressbar" ></div>
    </div> 
    <div class="d-flex justify-content-center buttons">
      <button class="btn btn-lg btn-success" id="mainSaveBtn">Mentés</button>
      <button class="btn btn-lg btn-danger" onclick="location.reload()">Alaphelyzet</button>
    </div>
  </footer>
 
  <!-- JS, Popper.js, and jQuery -->
  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
  <script src="js/DragDropTouch.js"></script>
  <script src="js/main.js"></script>
</body>
</html>