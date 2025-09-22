package com.javabank.model;

public class Account {
    private String accNo;
    private String name;
    private String pin;
    private double balance;

    public Account() {}

    public Account(String accNo, String name, String pin, double balance){
        this.accNo = accNo; this.name = name; this.pin = pin; this.balance = balance;
    }
    // getters and setters
    public String getAccNo(){return accNo;} public void setAccNo(String a){this.accNo=a;}
    public String getName(){return name;} public void setName(String n){this.name=n;}
    public String getPin(){return pin;} public void setPin(String p){this.pin=p;}
    public double getBalance(){return balance;} public void setBalance(double b){this.balance=b;}
}
