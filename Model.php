<?php
require 'Database.php';

class Model
{
    private $connection;

    public function __construct()
    {
        $this->connection = new Database;
        $this->connection->query("SET NAMES 'utf8'");
    }

    public function getHouseOptions()
    {
        $query = 'SELECT * FROM `house_option`';
        $result = $this->connection->query($query);
        $this->connection->close();
        return $result;
    }

    public function getCookerTypes()
    {
        $query = 'SELECT * FROM `cooker_type`';
        $result = $this->connection->query($query);
        $this->connection->close();
        return $result;
    }

    public function getHeatingTypes()
    {
        $query = 'SELECT * FROM `heating_type`';
        $result = $this->connection->query($query);
        $this->connection->close();
        return $result;
    }

    public function getHouseTypes()
    {
        $query = 'SELECT * FROM `house_type`';
        $result = $this->connection->query($query);
        $this->connection->close();
        return $result;
    }

    /**
     * @return int last inserted id
     */
    public function createNewHouse($greenValue, $houseType, $heatingType, $cookerType)
    {
        $query = 'INSERT INTO `customer_house` (`green_value`, `house_type_id`, `heating_type_id`,`cooker_type_id`)
        VALUES ('.$greenValue.','.$houseType.','.$heatingType.','.$cookerType.')';


if ($this->connection->query($query)) {
    return $this->connection->getLastId();
} else {
    return $this->connection->getError();
};
        // $this->connection->query($query);
        // $lastId = $this->connection->getLastId();

        // return $lastId;
    }

    /**
     * Save the selected options to pivot table
     */
    public function addSelectedOptions($custHouseId, $selectedOptions)
    {
        if ($selectedOptions == false) {
            return false;
        }

        foreach ($selectedOptions as $option) {
            $query = 'INSERT INTO `customer_house_option` (`customer_house_id`,`house_option_id`)
            VALUES ('. $custHouseId .','. $option .')';
            if ($this->connection->query($query)) {
                continue;
            } else {
                return $this->connection->getError();
            };
        }
    }
}

