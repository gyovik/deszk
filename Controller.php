<?php

require 'Model.php';

class Controller {

    public function getHouseOptions()
    {
        $model = new Model;
        $result = $model->getHouseOptions();
        return $this->toArray($result);
    }

    /**
     * Converts an SQL result object to an array
     * 
     * @param $result SQL result
     * 
     * @return array 
     */
    private function toArray($result)
    {
        $rows = [];
        while($row = mysqli_fetch_array($result))
        {
            $rows[] = $row;
        }
        return $rows;
    }

    private function clearInput($input)
    {

    }

    public function getHouseTypes()
    {
        $model = new Model;
        $result = $model->getHouseTypes();
        return $this->toArray($result);
    }

    /**
     *   let data = {
     *      'save': 'true',
     *     'totalGreenValue' : totalGreenValue,
     *       'options' : selectedOptions,
     *       'wallType' : wallType
     *   }
     */

    public function saveHouse($postArray)
    {
        // $postArray = json_decode($postArrayJson);
        $greenValue = $postArray['totalGreenValue'];
        $houseType = $postArray['wallType'];
        $selectedOtions = $postArray['options'];
        $model = new Model;
        $custHouseId = $model->createNewHouse($greenValue, $houseType);
        $model->addSelectedOptions($custHouseId, $selectedOtions);

        return 'All good';
    }
}