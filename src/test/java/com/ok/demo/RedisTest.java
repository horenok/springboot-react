package com.ok.demo;


import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

@SpringBootTest
public class RedisTest {
    @Autowired
    private RedisTemplate<String ,String> redisTemplate;

    @Test
    public void testStrings() {

        //given
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        String key = "RedisTest";

        //when
        valueOperations.set(key, "redisTest");

        //then
        String value = valueOperations.get(key);
        Assertions.assertThat(value).isEqualTo("redisTest");
    }
}
