package com.javabank.controller;

import com.javabank.model.Account;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AccountController {

    // in-memory store for demo (replace with DB in production)
    private static Map<String, Account> db = new ConcurrentHashMap<>();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Account a){
        if(db.containsKey(a.getAccNo())) return ResponseEntity.badRequest().body("Account exists");
        db.put(a.getAccNo(), a);
        return ResponseEntity.ok(a);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body){
        String acc = body.get("accNo"); String pin = body.get("pin");
        Account a = db.get(acc);
        if(a!=null && a.getPin().equals(pin)) return ResponseEntity.ok(a);
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/deposit/{accNo}")
    public ResponseEntity<?> deposit(@PathVariable String accNo, @RequestBody Map<String,Object> b){
        Account a = db.get(accNo);
        if(a==null) return ResponseEntity.badRequest().body("Not found");
        double amt = Double.parseDouble(b.get("amount").toString()); a.setBalance(a.getBalance()+amt);
        return ResponseEntity.ok(a);
    }

    @PostMapping("/withdraw/{accNo}")
    public ResponseEntity<?> withdraw(@PathVariable String accNo, @RequestBody Map<String,Object> b){
        Account a = db.get(accNo);
        if(a==null) return ResponseEntity.badRequest().body("Not found");
        double amt = Double.parseDouble(b.get("amount").toString());
        if(a.getBalance() < amt) return ResponseEntity.badRequest().body("Insufficient");
        a.setBalance(a.getBalance()-amt);
        return ResponseEntity.ok(a);
    }

    @GetMapping("/balance/{accNo}")
    public ResponseEntity<?> balance(@PathVariable String accNo){
        Account a = db.get(accNo);
        if(a==null) return ResponseEntity.badRequest().body("Not found");
        return ResponseEntity.ok(Map.of("balance", a.getBalance()));
    }
}
