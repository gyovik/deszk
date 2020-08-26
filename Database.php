<?php

class Database {

    private $host, $database, $username, $password, $connection;

    /**
    * Sets the connection credentials to connection to your database
    *
    * @param string $host
    * @param string $username
    * @param string $password
    * @param string $database
    */
    public function __construct($host = "localhost", $username = "root", $password = "", $database = "Deszk") {
        $this->host = $host;
        $this->database = $database;
        $this->username = $username;
        $this->password = $password;
        $this->open();
    }

    /**
    * Open the connection to your database
    */
    private function open() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
    }

    /**
    * Close the connection to your database
    */
    public function close() {
        $this->connection->close();
    }

    /**
    * Execute query
    * @param string $query - your sql query
    * @return result of the executed query 
    */
    public function query($query) {
        return $this->connection->query($query);
    }

    /**
    * Escape your parameter
    * @param string $string - your parameter to escape
    * @return the escaped string
    */
    public function escape($string) {
        return $this->connection->escape_string($query);
    }

    public function getLastId()
    {
        return $this->connection->insert_id;
    }

    public function getError()
    {
        return $this->connection->error;
    }
}