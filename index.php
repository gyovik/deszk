<?php
  require 'Controller.php';

  $controller = new Controller;
  $houseOptions = $controller->getHouseOptions();
  $houseTypes = $controller->getHouseTypes();
  $heatingTypes = $controller->getHeatingTypes();
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
  <div id="error"></div>
    <div class="boxes">
        <section id="drag">
          <?php
          foreach($houseOptions as $option) :
          ?>
            <div class="houseOption" data-option-id="<?php echo $option['id']; ?>" data-green-index="<?php echo $option['green_index']; ?>" draggable="true">
            <?php echo $option['icon'] ? '<img src="data:image/jpeg;base64,' . base64_encode( $option['icon'] ) . '"/>' : '' ?>
            <p>
            <?php echo $option['name']; ?>
            </p>
            </div>
          <?php
          endforeach;
          ?>
        </section>
        <section id="drop">
            <div class="wall">
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <?php
                foreach($houseTypes as $houseType) :
                ?>
                  <label class="btn btn-secondary">
                    <input name="wall_type" data-wall-id="<?php echo $houseType['id']; ?>" class="wallType" type="radio" data-base-index="<?php echo $houseType['green_index']; ?>" autocomplete="off">
                    <span class="wall-item">
                    <?php echo $houseType['icon'] ? '<img src="data:image/jpeg;base64,' . base64_encode( $houseType['icon'] ) . '"/>' : ''; ?>
                    </span>
                    <?php echo $houseType['name']; ?>
                  </label>
                <?php
                endforeach;
                ?>
              </div> 
            </div>
            <div class="wall">
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <?php
                foreach($heatingTypes as $heatingType) :
                ?>
                  <label class="btn btn-secondary">
                    <input name="heating_type" data-heating-id="<?php echo $heatingType['id']; ?>" class="heatingType" type="radio" data-base-index="<?php echo $heatingType['green_index']; ?>" autocomplete="off">
                    <span class="heating-item">
                    <?php echo $heatingType['icon'] ? '<img src="data:image/jpeg;base64,' . base64_encode( $heatingType['icon'] ) . '"/>' : ''; ?>
                    </span>
                    <?php echo $heatingType['name']; ?>
                  </label>
                <?php
                endforeach;
                ?>
              </div> 
            </div>
        </section>
      </div>
      <footer>    
        <div class="minMaxGreenValue">
          <p class="minValue">-20</p>
          <p class="maxValue">160</p>
        </div>
        <div class="progress">
          <div class="progress-bar" role="progressbar" ></div>
        </div> 
        <div class="buttons">
          <button class="btn btn-lg btn-success" id="saveBtn">Mentés</button>
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