package com.ok.demo.services;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
public class RedisServiceImpl implements RedisService {
    private final RedisTemplate<String, Object> redisTemplate;

    public RedisServiceImpl(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public Object getObject(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    @Override
    public <T> T get(String key) {
        return (T) redisTemplate.opsForValue().get(key);
    }

    @Override
    public void remove(String key) {
        redisTemplate.delete(key);
    }

    @Override
    public void save(String key, Serializable object) {
        redisTemplate.opsForValue().set(key, object);
    }

    @Override
    public void saveList(String key, List list) {
        redisTemplate.opsForValue().set(key, list);
    }

    @Override
    public void putString(String key, String value) {
        save(key, value);
    }

    @Override
    public String getString(String key) {
        return get(key);
    }

    @Override
    public void putExpired(String key, Serializable object, long timeout, TimeUnit unit) {
        redisTemplate.opsForValue().set(key, object, timeout, unit);
    }

    @Override
    public void putExpired(String key, List list, long timeout, TimeUnit unit) {
        redisTemplate.opsForValue().set(key, list, timeout, unit);
    }

    @Override
    public boolean hasKey(String key) {
        return redisTemplate.hasKey(key);
    }

    @Override
    public Set<String> keys(String keyPattern) {
        return redisTemplate.keys(keyPattern);
    }
}
