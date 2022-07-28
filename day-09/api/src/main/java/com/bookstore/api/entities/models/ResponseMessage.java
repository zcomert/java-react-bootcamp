package com.bookstore.api.entities.models;

import java.sql.Timestamp;
import java.util.Date;

public class ResponseMessage {

    public static Timestamp timestamp = new Timestamp(new Date().getTime());
    public static String success = "Operation is OK.";
    public static String fail = "Operation is fail.";
}
