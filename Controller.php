<?php

require 'Model.php';
/**
 * Controller Class
 */
class Controller
{

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
        while ($row = mysqli_fetch_array($result)) {
            $rows[] = $row;
        }
        return $rows;
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
     * Get age groups for modal select
     * 
     * @return array
     */
    public function getAgeGroups()
    {
        $model = new Model;
        $result = $model->getAgeGroups();
        return $this->toArray($result);
    }

    /**
     * Get education levels for modal select
     * 
     * @return array
     */
    public function getEducationLevels()
    {
        $model = new Model;
        $result = $model->getEducationLevels();
        return $this->toArray($result);
    }

    /**
     * Save user house
     * 
     * @param $postArray array POST array
     * 
     * @return string
     */
    public function saveHouse($postArray)
    {
        $greenValue = $postArray['totalGreenValue'];
        $selectedOptions = $postArray['options'];
        $houseType = $postArray['wallType'];
        $heatingType = $postArray['heatingType'];
        $cookerType = $postArray['cookerType'];
        $educationLevel = $postArray['educationLevelId'];
        $ageGroup = $postArray['ageGroupId'];
        $model = new Model;
        $custHouseId = $model->createNewHouse(
            $greenValue,
            $houseType,
            $heatingType,
            $cookerType,
            $educationLevel,
            $ageGroup
        );
        $model->addSelectedOptions($custHouseId, $selectedOptions);

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