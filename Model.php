<?php
require 'Database.php';

class Model
{
    private $connection;

    public function __construct()
    {
        $this->connection = new Database;
    }

    public function getHouseOptions()
    {
        $query = 'SELECT * FROM `house_option`';
        $result = $this->connection->query($query);
        $this->connection->close();
        return $result;
    }

    public function getHouseTypes()
    {
        $query = 'SELECT * FROM `house_type`';
        $result = $this->connection->query($query);
 
        return $result;
    }

    /**
     * @return int last inserted id
     */
    public function createNewHouse($greenValue, $houseType)
    {
        $query = 'INSERT INTO `customer_house` (`green_value`, `house_type_id`)
        VALUES ('.$greenValue.','.$houseType.')';

        $this->connection->query($query);
        $lastId = $this->connection->getLastId();

        return $lastId;
    }

    /**
     * Save the selected options to pivot table
     */
    public function addSelectedOptions($custHouseId, $selectedOtions)
    {
        foreach ($selectedOtions as $option) {
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

