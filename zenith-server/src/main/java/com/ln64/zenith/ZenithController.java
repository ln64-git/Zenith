package com.ln64.zenith;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ZenithController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, world!";
    }
}
