<?php

require 'Model.php';

class Controller {

    /**
     * Get available options for drag and drop
     * 
     * @return array
     */
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

    /**
     * Get house types for radio buttons
     * 
     * @return array
     */
    public function getHouseTypes()
    {
        $model = new Model;
        $result = $model->getHouseTypes();
        return $this->toArray($result);
    }

    /**
     * Get cooker types for radio buttons
     * 
     * @return array
     */
    public function getCookerTypes()
    {
        $model = new Model;
        $result = $model->getCookerTypes();
        return $this->toArray($result);
    }

    /**
     * Save user house
     * 
     * @param array POST array
     * @return string
     */
    public function saveHouse($postArray)
    {
        $greenValue = $postArray['totalGreenValue'];
        $selectedOtions = $postArray['options'];
        $houseType = $postArray['wallType'];
        $heatingType = $postArray['heatingType'];
        $cookerType = $postArray['cookerType'];
        $model = new Model;
        $custHouseId = $model->createNewHouse($greenValue, $houseType, $heatingType, $cookerType);
        $model->addSelectedOptions($custHouseId, $selectedOtions);

        return 'Köszönjük, elmentettük...';
    }

    /**
     * Get the heating option for radio buttons
     * 
     * @return array
     */
    public function getHeatingTypes()
    {
        $model = new Model;
        $result = $model->getHeatingTypes();
        return $this->toArray($result);
    }
}